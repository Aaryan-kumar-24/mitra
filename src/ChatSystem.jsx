import { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import { Header } from "./header";
import axios from "axios";
import { AuthContext } from "./AuthContext";

// Color Palette & Design Constants
const PRIMARY_COLOR = "#00bcd4"; // Main vibrant Sky Blue
const PRIMARY_ACCENT = "#26c6da"; // Slightly darker/brighter accent
const BACKGROUND_GRADIENT = "linear-gradient(to right bottom, #e0f7fa, #b2ebf2)"; // Soft, dynamic background
const CARD_BG = "rgba(255, 255, 255, 0.98)";
const CHAT_BUBBLE_MINE = PRIMARY_COLOR;
const CHAT_BUBBLE_THEM = "#f0f7f9"; // Very light blue-gray for clean contrast
const SHADOW_ELEGANT = "0 20px 50px rgba(0, 188, 212, 0.35), 0 5px 15px rgba(0, 0, 0, 0.1)";
// New Divider Gradient
const DIVIDER_GRADIENT = `linear-gradient(to bottom, ${PRIMARY_ACCENT}30, ${PRIMARY_COLOR}80, ${PRIMARY_ACCENT}30)`;

// Helper function to correctly format the profile image URL
const getProfileImageUrl = (relativePath) => {
    if (!relativePath) return null;
    return `http://localhost:8000${relativePath}`;
};

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

  // --- LOGIC FUNCTIONS (Unchanged for stability) ---

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

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

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
      console.log("User not found");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      if (value) handleSearch(value);
    }, 500);
  };

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

  // --- RENDER ---

  if (!user)
    return (
      <div style={{ padding: 50, textAlign: "center", background: BACKGROUND_GRADIENT, minHeight: "100vh" }}>
        <h3 style={{ color: PRIMARY_COLOR }}>Please login to use chat</h3>
        <a href="/Login_signup" style={{ color: PRIMARY_COLOR, textDecoration: "underline" }}>
          Go to Login
        </a>
      </div>
    );

  return (
    <div
      style={{
        background: BACKGROUND_GRADIENT,
        minHeight: "100vh",
        padding: "0px 0 100px 0",
        fontFamily: "Poppins, sans-serif",
        position: "relative",
      }}
    >
      <Header />
      {/* Animated Floating Background Elements */}
      <div className="sky-elements-container">
          <div className="sky-element" style={{ top: '10%', left: '10%', width: 50, height: 50, opacity: 0.3 }}></div>
          <div className="sky-element" style={{ top: '50%', right: '5%', width: 80, height: 80, opacity: 0.2 }}></div>
          <div className="sky-element" style={{ bottom: '20%', left: '25%', width: 60, height: 60, opacity: 0.4 }}></div>
      </div>

      {/* Main Chat Container (Floating Card) */}
      <div
        style={{
          maxWidth: 1300,
          height: "85vh",
          margin: "20px auto",
          borderRadius: 30,
          boxShadow: SHADOW_ELEGANT,
          overflow: "hidden",
          display: "flex",
          position: "relative",
          zIndex: 10,
          background: CARD_BG,
          animation: "scaleIn 0.5s ease-out",
        }}
      >
        {/* LEFT PANEL: User Sidebar */}
        <div
          style={{
            width: "350px", // Fixed width for a more controlled sidebar
            background: CARD_BG,
            padding: 25,
            display: "flex",
            flexDirection: "column",
            position: 'relative',
          }}
        >
          {/* *** Vertical Gradient Divider *** */}
          <div 
              style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '3px', // Thickness of the divider
                  height: '100%',
                  background: DIVIDER_GRADIENT, // The beautiful gradient
                  boxShadow: `1px 0 8px ${PRIMARY_COLOR}30`, // Subtle shadow for depth
                  zIndex: 1,
              }}
          ></div>
          {/* *** End Divider *** */}
          
          <h2 style={{ marginBottom: 25, fontWeight: 700, color: PRIMARY_COLOR, fontSize: 28 }}>
            <span role="img" aria-label="chat">💬</span> Inbox
          </h2>

          {/* Search Input */}
          <input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by phone..."
            style={{
              padding: 12,
              borderRadius: 25,
              border: `2px solid ${PRIMARY_COLOR}40`,
              marginBottom: 20,
              fontSize: 15,
              transition: "border 0.3s ease, box-shadow 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.boxShadow = `0 0 0 4px ${PRIMARY_COLOR}30`)}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />

          {/* User List Scrollable Area */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {chatUsers.map((u) => (
              <div
                key={u._id}
                onClick={() => selectUserFromList(u)}
                className="user-list-item"
                style={{
                  padding: "18px 15px",
                  marginBottom: 10,
                  background: selectedUser?._id === u._id ? PRIMARY_ACCENT + "15" : CARD_BG,
                  borderRadius: 15,
                  cursor: "pointer",
                  borderLeft: selectedUser?._id === u._id ? `4px solid ${PRIMARY_COLOR}` : '4px solid transparent',
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  boxShadow: selectedUser?._id === u._id ? "0 4px 15px rgba(0, 188, 212, 0.1)" : "0 1px 5px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  
                  {/* 👇️ 1. USER LIST AVATAR LOGIC */}
                  {u.avatar ? (
                    <img 
                      src={getProfileImageUrl(u.avatar)} 
                      alt={u.name[0]} 
                      style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          objectFit: 'cover',
                          border: `2px solid ${PRIMARY_ACCENT}80`,
                          flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: PRIMARY_ACCENT,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {u.name[0].toUpperCase()}
                    </div>
                  )}
                  {/* 👆️ END USER LIST AVATAR LOGIC */}
                  
                  <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <strong style={{ color: selectedUser?._id === u._id ? PRIMARY_COLOR : "#333", fontSize: 16 }}>
                      {u.name}
                    </strong>
                    <span style={{ fontSize: 12, color: "#777", opacity: 0.8 }}>{u.phone}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                    {u.hasUnread && (
                    <span
                      className="unread-indicator"
                      style={{
                        width: 10, height: 10,
                        background: "#FF5722", // Orange for attention
                        borderRadius: "50%",
                        display: "block",
                        animation: "flash 1.5s infinite",
                      }}
                    ></span>
                    )}
                    <div style={{ fontSize: 11, color: "#999" }}>
                      {u.lastMessageTime
                        ? new Date(u.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : "-"}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Chat Window */}
        <div
          style={{
            flex: 1,
            padding: 25,
            display: "flex",
            flexDirection: "column",
            background: CHAT_BUBBLE_THEM + "30", // Light textured background for the chat area
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              paddingBottom: 15,
              borderBottom: `1px solid ${PRIMARY_COLOR}30`,
              marginBottom: 15,
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            {selectedUser ? (
                <>
                    {/* 👇️ 2. CHAT HEADER AVATAR LOGIC */}
                    {selectedUser.avatar ? (
                      <img
                        src={getProfileImageUrl(selectedUser.avatar)}
                        alt={selectedUser.name[0]}
                        style={{
                          width: 55, height: 55,
                          borderRadius: "50%",
                          objectFit: 'cover',
                          border: `3px solid ${PRIMARY_ACCENT}80`,
                          boxShadow: "0 4px 12px rgba(0, 188, 212, 0.4)",
                          animation: "floatUp 1s ease-in-out infinite alternate"
                        }}
                      />
                    ) : (
                      <div
                        style={{
                            width: 55, height: 55,
                            borderRadius: "50%",
                            background: PRIMARY_COLOR,
                            color: "white",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 600, fontSize: 24,
                            boxShadow: "0 4px 12px rgba(0, 188, 212, 0.4)",
                            animation: "floatUp 1s ease-in-out infinite alternate"
                        }}
                      >
                        {selectedUser.name[0].toUpperCase()}
                      </div>
                    )}
                    {/* 👆️ END CHAT HEADER AVATAR LOGIC */}

                    <h2 style={{ fontWeight: 700, color: PRIMARY_COLOR, fontSize: 26 }}>
                        {selectedUser.name}
                    </h2>
                </>
            ) : (
                <h2 style={{ fontWeight: 500, color: "#666", fontSize: 24 }}>
                    <span role="img" aria-label="wave">👋</span> Select a User to Begin Conversation
                </h2>
            )}
          </div>

          {/* Messages Container */}
          <div
            ref={chatRef}
            style={{
              flex: 1,
              padding: 20,
              overflowY: "auto",
              background: "transparent",
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
            {messages.map((msg, index) => {
              const mine = msg.senderId === user._id;
              return (
                <div
                  key={msg.timestamp + index}
                  style={{
                    display: "flex",
                    justifyContent: mine ? "flex-end" : "flex-start",
                    marginBottom: 15,
                    animation: `messageSlideIn 0.3s ease-out`,
                  }}
                >
                  <div
                    style={{
                      background: mine ? CHAT_BUBBLE_MINE : CHAT_BUBBLE_THEM,
                      color: mine ? "white" : "#333",
                      padding: "14px 20px",
                      borderRadius: mine
                        ? "25px 25px 5px 25px" // Curvy corners
                        : "25px 25px 25px 5px",
                      maxWidth: "65%",
                      fontSize: 16,
                      lineHeight: "24px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                      position: "relative",
                      transformOrigin: mine ? 'right bottom' : 'left bottom',
                      animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    {msg.message}
                    <div
                      style={{
                        fontSize: 11,
                        marginTop: 8,
                        color: mine ? "rgba(255, 255, 255, 0.7)" : "#888",
                        textAlign: mine ? "right" : "left",
                      }}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
            {typing && (
              <div
                style={{
                  color: PRIMARY_COLOR,
                  fontSize: 15,
                  fontWeight: 500,
                  animation: "fadePulse 1.5s infinite",
                  paddingLeft: 10,
                }}
              >
                <span className="typing-bubble">
                  {selectedUser.name} is typing<span className="dot-flashing">.</span>
                </span>
              </div>
            )}
          </div>

          {/* Message Input Area */}
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={sendMsg}
              onChange={handleTyping}
              placeholder={selectedUser ? "Type your message..." : "Select a user first"}
              disabled={!selectedUser}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: 1,
                padding: 18,
                borderRadius: 30,
                border: `2px solid ${PRIMARY_COLOR}40`,
                fontSize: 17,
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.boxShadow = `0 0 0 4px ${PRIMARY_COLOR}30`)}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <button
              onClick={sendMessage}
              disabled={!selectedUser || !sendMsg.trim()}
              style={{
                padding: "10px 30px",
                background: PRIMARY_COLOR,
                color: "white",
                borderRadius: 30,
                border: "none",
                fontWeight: 700,
                fontSize: 18,
                cursor: selectedUser && sendMsg.trim() ? "pointer" : "not-allowed",
                opacity: selectedUser && sendMsg.trim() ? 1 : 0.4,
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(0, 188, 212, 0.4)",
              }}
              onMouseOver={(e) => {
                if (selectedUser && sendMsg.trim()) e.currentTarget.style.backgroundColor = PRIMARY_ACCENT;
              }}
              onMouseOut={(e) => {
                if (selectedUser && sendMsg.trim()) e.currentTarget.style.backgroundColor = PRIMARY_COLOR;
              }}
            >
              <span role="img" aria-label="send">
                <i class="fa-solid fa-paper-plane"></i>
              </span>{" "}
              Send
            </button>
          </div>
        </div>
      </div>
      
      {/* Keyframes and Global Styles */}
      <style>
        {`
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            80% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
          @keyframes flash {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          @keyframes floatUp {
              0% { transform: translateY(0px); box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4); }
              100% { transform: translateY(-5px); box-shadow: 0 8px 18px rgba(0, 188, 212, 0.6); }
          }
          @keyframes moveCloud {
              0% { transform: translate(0, 0); }
              100% { transform: translate(100px, 50px); }
          }
          .sky-elements-container {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              pointer-events: none;
          }
          .sky-element {
              position: absolute;
              background: rgba(255, 255, 255, 0.7);
              border-radius: 50%;
              filter: blur(20px);
              animation: moveCloud 20s infinite alternate;
          }
          .user-list-item:hover {
              transform: translateX(5px);
              background: ${PRIMARY_COLOR}05 !important;
          }
          .typing-bubble {
            display: inline-flex;
            align-items: center;
            padding: 8px 15px;
            background: #e0f7fa;
            border-radius: 15px;
            font-style: italic;
          }
          .dot-flashing {
            position: relative;
            width: 4px;
            height: 4px;
            border-radius: 5px;
            background-color: ${PRIMARY_COLOR};
            color: ${PRIMARY_COLOR};
            display: inline-block;
            margin-left: 5px;
            animation: dotFlashing 1s infinite alternate;
            animation-delay: 0s;
          }
          .dot-flashing::before, .dot-flashing::after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 0;
            width: 4px;
            height: 4px;
            border-radius: 5px;
            background-color: ${PRIMARY_COLOR};
            color: ${PRIMARY_COLOR};
          }
          .dot-flashing::before {
            left: -6px;
            animation: dotFlashing 1s infinite alternate;
            animation-delay: 0.2s;
          }
          .dot-flashing::after {
            left: 6px;
            animation: dotFlashing 1s infinite alternate;
            animation-delay: 0.4s;
          }
          @keyframes dotFlashing {
            0% { background-color: ${PRIMARY_COLOR}; }
            50%, 100% { background-color: ${PRIMARY_COLOR}50; }
          }
        `}
      </style>
    </div>
  );
}