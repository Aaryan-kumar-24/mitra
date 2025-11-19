import { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import { Header } from "./header";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const socket = io("http://localhost:8000", { autoConnect: true });

export default function ChatSystem() {
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sendMsg, setSendMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef();
  let typingTimeout = useRef(null);
  let searchTimeout = useRef(null);

  // ----------------------- LOAD CHAT USERS -----------------------
  useEffect(() => {
    if (user) loadChatUsers();
  }, [user]);

  const loadChatUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/chat-users/${user._id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const users = res.data;

      const usersWithLastMessage = await Promise.all(
        users.map(async (u) => {
          const messagesRes = await axios.get(
            `http://localhost:8000/messages/${user._id}/${u._id}?limit=1&sort=desc`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
          const lastMsg = messagesRes.data[0];

          const hasUnread =
            lastMsg && lastMsg.senderId !== user._id && !lastMsg.read;

          return {
            ...u,
            lastMessageTime: lastMsg?.timestamp || 0,
            hasUnread,
          };
        })
      );

      usersWithLastMessage.sort(
        (a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0)
      );

      setChatUsers(usersWithLastMessage);
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------- SOCKET EVENTS -----------------------
  useEffect(() => {
    if (!user) return;

    socket.emit("addUser", user._id);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => {
        const exists = prev.some(
          (m) =>
            m.timestamp === msg.timestamp &&
            m.senderId === msg.senderId &&
            m.message === msg.message
        );
        return exists ? prev : [...prev, msg];
      });

      setChatUsers((prev) =>
        prev
          .map((u) => {
            if (u._id === msg.senderId) {
              const unread = selectedUser?._id !== u._id;
              return { ...u, lastMessageTime: msg.timestamp, hasUnread: unread };
            }
            return u;
          })
          .sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0))
      );
    });

    socket.on("typing", (data) => {
      if (selectedUser?._id === data.senderId) setTyping(data.typing);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
    };
  }, [selectedUser, user]);

  // ----------------------- AUTO SCROLL -----------------------
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  // ----------------------- SEARCH USER -----------------------
  const handleSearch = async (phone) => {
    if (!phone) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/search-user/${phone}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const foundUser = res.data;

      setChatUsers((prev) => {
        const exists = prev.find((p) => p._id === foundUser._id);
        if (!exists) return [...prev, { ...foundUser, hasUnread: false }];
        return prev;
      });

      selectUserFromList(foundUser);
    } catch {
      // optional: remove alert for smoother UX
      console.log("User not found");
    }
  };

  // Debounce search for typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      if (value) handleSearch(value);
    }, 500); // wait 500ms after typing stops
  };

  // ----------------------- LOAD MESSAGES -----------------------
  const loadMessages = async (receiverId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/messages/${user._id}/${receiverId}?sort=asc`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------- SELECT USER -----------------------
  const selectUserFromList = async (u) => {
    setSelectedUser(u);
    await loadMessages(u._id);

    const room = [user._id, u._id].sort().join("_");
    socket.emit("joinRoom", room);

    setChatUsers((prev) =>
      prev.map((userItem) =>
        userItem._id === u._id ? { ...userItem, hasUnread: false } : userItem
      )
    );

    axios.put(
      `http://localhost:8000/mark-read/${user._id}/${u._id}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  };

  // ----------------------- SEND MESSAGE -----------------------
  const sendMessage = async () => {
    if (!sendMsg.trim() || !selectedUser) return;

    const msg = {
      room: [user._id, selectedUser._id].sort().join("_"),
      senderId: user._id,
      receiverId: selectedUser._id,
      message: sendMsg,
      timestamp: Date.now(),
      read: false,
    };

    socket.emit("sendMessage", msg);

    await axios.post("http://localhost:8000/send-message", msg, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    setSendMsg("");
  };

  // ----------------------- TYPING -----------------------
  const handleTyping = (e) => {
    setSendMsg(e.target.value);
    socket.emit("typing", {
      senderId: user._id,
      receiverId: selectedUser?._id,
      typing: true,
    });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("typing", {
        senderId: user._id,
        receiverId: selectedUser?._id,
        typing: false,
      });
    }, 1000);
  };

  // ----------------------- RENDER -----------------------
  if (!user)
    return (
      <div style={{ padding: 24 }}>
        <h3>Please login to use chat</h3>
        <a href="/Login_signup">Go to Login</a>
      </div>
    );

  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: 1150,
          margin: "30px auto",
          display: "grid",
          gridTemplateColumns: "0.9fr 2fr",
          gap: 20,
          fontFamily: "Poppins",
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 14,
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            height: "85vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ marginBottom: 12, fontWeight: 600 }}>Messages</h2>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={search}
              onChange={handleSearchChange} // <-- live search
              placeholder="Search by phone..."
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 12,
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div style={{ marginTop: 20, overflowY: "auto" }}>
            {chatUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => selectUserFromList(u)}
                style={{
                  padding: 12,
                  marginBottom: 12,
                  background:
                    selectedUser?._id === u._id ? "#e8f0ff" : "#f7faff",
                  borderRadius: 12,
                  cursor: "pointer",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {u.hasUnread && (
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        background: "green",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                  )}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <strong>{u.name}</strong>
                    <span style={{ fontSize: 12, color: "#555" }}>{u.phone}</span>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: "#999" }}>
                  {u.lastMessageTime
                    ? new Date(u.lastMessageTime).toLocaleTimeString()
                    : "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            background: "#fff",
            padding: 16,
            borderRadius: 14,
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            height: "85vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontWeight: 600,
              borderBottom: "1px solid #eee",
              paddingBottom: 8,
            }}
          >
            {selectedUser ? selectedUser.name : "Select a user"}
          </h2>

          <div
            ref={chatRef}
            style={{
              flex: 1,
              padding: 15,
              overflowY: "auto",
              background: "#f4f7fb",
              borderRadius: 12,
              marginTop: 10,
            }}
          >
            {messages.map((msg) => {
              const mine = msg.senderId === user._id;
              return (
                <div
                  key={msg.timestamp}
                  style={{
                    display: "flex",
                    justifyContent: mine ? "flex-end" : "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      background: mine ? "#d1e8ff" : "#d9ffd9",
                      padding: "10px 14px",
                      borderRadius: mine
                        ? "14px 14px 4px 14px"
                        : "14px 14px 14px 4px",
                      maxWidth: "65%",
                      fontSize: 15,
                      lineHeight: "20px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      position: "relative",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {msg.message}
                    <div style={{ fontSize: 11, marginTop: 4, color: "#555" }}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              );
            })}
            {typing && <div style={{ color: "#555", fontSize: 13 }}>Typing...</div>}
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input
              value={sendMsg}
              onChange={handleTyping}
              placeholder="Type message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: "1px solid #ddd",
                fontSize: 15,
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "12px 16px",
                background: "#0077ff",
                color: "white",
                borderRadius: 12,
                border: "none",
                fontWeight: 600,
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
