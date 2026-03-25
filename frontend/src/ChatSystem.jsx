import { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import { Header } from "./header";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import EmojiPicker from "emoji-picker-react";
import { useLocation } from "react-router-dom";


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


export default function ChatSystem() {
  const { user } = useContext(AuthContext);
  
  const fileInputRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sendMsg, setSendMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const chatRef = useRef();
  let typingTimeout = useRef(null);
  let searchTimeout = useRef(null);
// Get token from AuthContext
const { token } = useContext(AuthContext);

// Create room ID based on two users
const room = selectedUser
  ? [user?._id, selectedUser?._id].sort().join("_")
  : null;
const location = useLocation();
const passedPhone = location.state?.phone;

const socketRef = useRef();

useEffect(() => {
  if (!token) return;

  socketRef.current = io("http://localhost:8000", {
    auth: { token },
  });

  return () => {
    socketRef.current.disconnect();
  };
}, [token]);

const autoOpenChatByPhone = async (phone) => {
  try {
    const res = await axios.get(
      `http://localhost:8000/search-user/${phone}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const foundUser = res.data;

    // Add user to chat list if not exists
    setChatUsers((prev) => {
      const exists = prev.find((u) => u._id === foundUser._id);
      if (!exists) return [...prev, { ...foundUser, hasUnread: false }];
      return prev;
    });

    // Select user and load messages
    selectUserFromList(foundUser);
  } catch (err) {
    console.error("Auto chat user not found", err);
  }
};
useEffect(() => {
  if (passedPhone && user && token) {
    autoOpenChatByPhone(passedPhone);
  }
}, [passedPhone, user, token]);


  // --- LOGIC FUNCTIONS (Unchanged for stability) ---
useEffect(() => {
  if (!user?._id || !token) return;

  loadChatUsers();
}, [user, token]);

const loadChatUsers = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8000/chat-users-fast/${user._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setChatUsers(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  if (!user?._id || !socketRef.current) return;

  socketRef.current?.emit("addUser", user._id);

    socketRef.current.on("receiveMessage", (msg) => {
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

    socketRef.current.on("typing", (data) => {
      if (selectedUser?._id === data.senderId) setTyping(data.typing);
    });

    return () => {
      socketRef.current.off("receiveMessage");
      socketRef.current.off("typing");
    };
}, [selectedUser, user, token]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const handleSearch = async (phone) => {
    if (!phone) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/search-user/${phone}`,
        { headers: { Authorization: `Bearer ${token}` } }
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
    }, 300);
  };

const loadMessages = async (receiverId) => {
  console.log("Loading messages for:", receiverId);
  try {
    const res = await axios.get(
      `http://localhost:8000/messages/${user._id}/${receiverId}?limit=50&sort=desc`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessages(res.data.reverse());
  } catch (err) {
    console.error(err);
  }
};

  const selectUserFromList = async (u) => {
    setSelectedUser(u);
    await loadMessages(u._id);

    const room = [user._id, u._id].sort().join("_");
    socketRef.current?.emit("joinRoom", room);

    setChatUsers((prev) =>
      prev.map((userItem) =>
        userItem._id === u._id ? { ...userItem, hasUnread: false } : userItem
      )
    );

axios.put(
  `http://localhost:8000/mark-read/${user._id}/${u._id}`,
  {},
  { headers: { Authorization: `Bearer ${token}` } }
);
  };

const sendMessage = async () => {
  if (!sendMsg.trim() || !selectedUser) return;

  const msg = {
    room,
    senderId: user._id,
    receiverId: selectedUser._id,
    message: sendMsg,
    timestamp: Date.now(),
    read: false,
  };

  // 🔥 instant UI update
  setMessages((prev) => [...prev, msg]);

  socketRef.current?.emit("sendMessage", msg);

  setSendMsg("");

  try {
    await axios.post("http://localhost:8000/send-message", msg, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.error(err);
  }
};

  const handleTyping = (e) => {
    setSendMsg(e.target.value);
    socketRef.current?.emit("typing", {
      senderId: user._id,
      receiverId: selectedUser?._id,
      typing: true,
    });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socketRef.current?.emit("typing", {
        senderId: user._id,
        receiverId: selectedUser?._id,
        typing: false,
      });
    }, 1000);
  };

  // --- RENDER ---
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("senderId", user._id);
  formData.append("receiverId", selectedUser._id);

  try {
    const res = await axios.post(
      "http://localhost:8000/send-media",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    socketRef.current?.emit("sendMessage", {
      room,
      ...res.data,
    });

    setMessages((prev) => [...prev, res.data]);
  } catch (err) {
    console.error("File upload error:", err);
  }
};

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
{chatUsers.length === 0 ? (
  <p style={{ textAlign: "center", color: "#999" }}>
    No users found
  </p>
) : (
  chatUsers.map((u) => (
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
{(u.avatar || u.profileUrl) ? (
  <img 
    src={getProfileImageUrl(u.avatar || u.profileUrl)} 
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
            )))}
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
{(selectedUser.avatar || selectedUser.profileUrl) ? (
  <img
    src={getProfileImageUrl(selectedUser.avatar || selectedUser.profileUrl)}
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
              padding: 1,
              overflowY: "auto",
              background: "transparent",
              borderRadius: 20,
              marginBottom: 20,
            }}
          >
  
<div style={{ height: "100%", overflowY: "auto", padding: "10px" }}>
  {Array.isArray(messages) &&
    messages.map((msg, index) => {
      const mine = msg.senderId === user._id;

      return (
        <div
          key={msg.timestamp + index}
          style={{
            display: "flex",
            justifyContent: mine ? "flex-end" : "flex-start",
            marginBottom: 15,
            flexDirection: "column",
            alignItems: mine ? "flex-end" : "flex-start",
          }}
        >
          {/* Text Message */}
          {msg.message && (
            <div
              style={{
                background: mine ? "#1ca3ec" : "#f0f8ff",
                color: mine ? "#fff" : "#333",
                borderRadius: mine ? "25px 25px 5px 25px" : "25px 25px 25px 5px",
                maxWidth: "65%",
                fontSize: 16,
                lineHeight: "22px",
                padding: "14px 20px",
                boxShadow: mine
                  ? "0 6px 8px rgba(0,176,255,0.1)"
                  : "0 6px 8px rgba(0,0,0,0.04)",
                wordBreak: "break-word",
                transition: "all 0.3s ease",
              }}
            >
              {msg.message}
            </div>
          )}

          {/* Image */}
          {msg?.mediaUrl && msg?.mediaType === "image" && (
            <a
              href={`http://localhost:8000${msg.mediaUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`http://localhost:8000${msg.mediaUrl}`}
                alt=""
                style={{
                  marginTop: 6,
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: 12,
                  objectFit: "cover",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              />
            </a>
          )}

          {/* Video */}
          {msg?.mediaUrl && msg?.mediaType === "video" && (
            <video
              controls
              style={{
                marginTop: 6,
                maxWidth: "240px",
                maxHeight: "280px",
                borderRadius: 12,
                objectFit: "cover",
              }}
            >
              <source src={`http://localhost:8000${msg.mediaUrl}`} />
            </video>
          )}

          {/* File (PDF, DOCX, etc.) */}
{msg?.mediaUrl && msg?.mediaType === "file" && (
  <a
  target="_blank"
    href={`http://localhost:8000${msg.mediaUrl}`}
    download
    style={{
      marginTop: 6,
      padding: "10px 15px",
      borderRadius: 12,
      background: mine ? "#1ca3ec" : "#f0f8ff",
      color: mine ? "#fff" : "#333",
      textDecoration: "none",
      boxShadow: mine
        ? "0 6px 8px rgba(0,176,255,0.1)"
        : "0 6px 8px rgba(0,0,0,0.04)",
      display: "inline-block",
    }}
  >
    📄 {msg.fileName || "Download File"}
  </a>
)}

        </div>
      );
    })}
</div>


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

{selectedUser ? 

<div
  style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: "white",
    borderTop: "2px solid #e8f6ff",
  }}
>

  {/* Hidden File Input */}
<input
  type="file"
  accept="image/*,video/*,application/pdf,.doc,.docx,.txt"
  ref={fileInputRef}
  style={{ display: "none" }}
  onChange={handleFileUpload}
/>


  {/* Input Box Container */}
  <div
    style={{
      flex: 1,
      position: "relative",
      display: "flex",
      alignItems: "center",
      background: "#f8fcff",
      border: "2px solid #bde6ff",
      borderRadius: 30,
      padding: "10px 16px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
      transition: "0.25s",
    }}
  >

    {/* Paperclip inside */}
    <span
      onClick={() => fileInputRef.current.click()}
      style={{
        fontSize: 22,
        marginRight: 12,
        cursor: "pointer",
        color: "#7dc9ff",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
    >
      📎
    </span>

    {/* Emoji Icon inside */}
    <span
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      style={{
        fontSize: 22,
        marginRight: 12,
        cursor: "pointer",
        color: "#7dc9ff",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.transform = "scale(1.2)")}
      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
    >
      😀
    </span>

    {/* Actual Input */}
    <input
      value={sendMsg}
      onChange={handleTyping}
      placeholder="Type a message..."
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        fontSize: 16,
        background: "transparent",
        color: "#333",
      }}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
  </div>

  {/* Send Button */}
  <button
    onClick={sendMessage}
    style={{
      marginLeft: 12,
      background: "#7dc9ff",
      border: "none",
      padding: "14px 20px",
      borderRadius: 50,
      color: "white",
      fontSize: 16,
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
      transition: "0.25s",
    }}
    onMouseEnter={(e) => (e.target.style.transform = "scale(1.10)")}
    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
  >
   <i class="fa-solid fa-paper-plane"></i>  Send
  </button>

  {/* Emoji Picker Popup */}
  {showEmojiPicker && (
    <div
      style={{
        position: "absolute",
        bottom: "60px",
        left: "20px",
        background: "#ffffff",
        padding: "12px",
        borderRadius: 16,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        zIndex: 2000,
        animation: "slideIn 0.2s ease-out",
      }}
    >
      <EmojiPicker
        onEmojiClick={(emojiData) => {
          setSendMsg((prev) => prev + emojiData.emoji);
          setShowEmojiPicker(false);
        }}
        theme="light"
      />
    </div>
  )}

  {/* Animation */}
  <style>
    {`
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
  </style>
</div>

    : ""}

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