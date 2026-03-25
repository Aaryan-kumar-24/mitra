const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { OpenAI } = require("openai");

// Import models
const { Note, Project, SellItem, SignupUser, Message } = require("./form.model");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

globalThis.fetch = fetch;

const app = express();
app.use(cors());
// IMPORTANT: We use express.json() for non-file uploads/login, 
// but Multer handles the body parsing for the /signup-user route.
app.use(express.json()); 

// ----------------- Groq/OpenAI (if used) -----------------
const GROQ_API_KEY =  "";
let openai;
if (GROQ_API_KEY) {
  openai = new OpenAI({ apiKey: GROQ_API_KEY, baseURL: "https://api.groq.com/openai/v1" });
}

// ----------------- File upload setup -----------------
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
// Serve uploaded files statically so the frontend can access them
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, filePath) => {
      res.setHeader("Access-Control-Allow-Origin", "*");

      // 🔥 Important: allow preview for PDFs/images
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
      }
    },
  })
);


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ----------------- JWT config (unchanged) -----------------
const JWT_SECRET = process.env.JWT_SECRET || "THIS_IS_YOUR_SECRET_KEY_CHANGE_IT";
const generateToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

function authMiddleware(req, res, next) {
  const header = req.headers["authorization"];
  const token = header && header.startsWith("Bearer ") ? header.split(" ")[1] : header;
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}
// REPLACE your current app.post("/api/chatbot", ...) with this:
app.post("/chatbot",  async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Chatbot failed" });
  }
});




// Remove or rename the basic /api/chatbot if you added it earlier.
// ----------------- AUTH ROUTES -----------------


app.get("/test-groq", async (req, res) => {
  try {
    const r = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Say hello" }],
    });
    res.json({ reply: r.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



/**
 * Signup
 * Now uses Multer to handle file upload before the route logic runs.
 * Field name: 'profileFile' must match the key used in the frontend FormData.
 */
app.post("/signup-user", upload.single('profileFile'), async (req, res) => {
  try {
    // Data now comes from req.body after Multer processes the file
    const { name, phone, email, password, college, branch, year } = req.body;
    
    // The file information is in req.file
    const profilePath = req.file ? `/uploads/${req.file.filename}` : "";

    if (!name || !phone || !email || !password || !profilePath) 
      return res.status(400).json({ message: "All fields required (including profile photo)." });

    const existsEmail = await SignupUser.findOne({ email });
    if (existsEmail) return res.status(400).json({ message: "Email exists" });

    const existsPhone = await SignupUser.findOne({ phone });
    if (existsPhone) return res.status(400).json({ message: "Phone exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new SignupUser({
      name,
      phone,
      email,
      password: hashed,
      college,
      branch,
      year,
      avatar: profilePath // save local file path
    });

    await user.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Login
 * profileUrl now returns the local file path
 */
app.post("/login-user", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await SignupUser.findOne({ phone });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        college: user.college,
        branch: user.branch,
        year: user.year,
        // The frontend will now access this URL from the server at http://localhost:8000/uploads/...
        profileUrl: user.avatar || "" 
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user (authenticated)
app.get("/user-data", authMiddleware, async (req, res) => {
  try {
    const user = await SignupUser.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------- Data / upload endpoints (unchanged) -----------------
app.post("/add-note", upload.single("file"), async (req, res) => {
  try {
    const { title, Description, uploaded_by } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const note = new Note({ title, Description, uploaded_by, fileUrl });
    await note.save();
    res.json({ message: "Note uploaded", note });
  } catch (err) {
    console.error("Add note error:", err);
    res.status(500).json({ message: "Upload error" });
  }
});
app.get("/get-notes", async (req, res) => res.json(await Note.find()));

app.post("/add-project", authMiddleware, upload.single("video"), async (req, res) => {
  try {
    const { studentName, title, description } = req.body;

    // 🔥 get logged-in user
    const user = await SignupUser.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const project = new Project({
      studentName,
      title,
      description,
      phone: user.phone,   // 👈 AUTO STORE PHONE
      videoUrl: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await project.save();
    res.json({ message: "Project uploaded", project });
  } catch (err) {
    console.error("Add project error:", err);
    res.status(500).json({ message: "Error uploading project" });
  }
});

app.get("/get-projects", async (req, res) => res.json(await Project.find()));

app.post("/add-sell-item", upload.single("image"), async (req, res) => {
  try {
    const { name, price, yearUsed, quality, phone } = req.body;
    const item = new SellItem({
      name,
      price,
      yearUsed,
      quality,
      phone,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ""
    });
    await item.save();
    res.json({ message: "Item listed", item });
  } catch (err) {
    console.error("Add sell item error:", err);
    res.status(500).json({ message: "Upload error" });
  }
});
app.get("/get-sell-items", async (req, res) => res.json(await SellItem.find()));

// ----------------- Messages & chat endpoints (unchanged) -----------------
app.get("/search-user/:phone", authMiddleware, async (req, res) => {
  try {
    const user = await SignupUser.findOne({ phone: req.params.phone }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/messages/:user1/:user2", authMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const sortOrder = req.query.sort === "desc" ? -1 : 1;

  const messages = await Message.find({
    $or: [
      { senderId: req.params.user1, receiverId: req.params.user2 },
      { senderId: req.params.user2, receiverId: req.params.user1 }
    ]
  })
    .sort({ timestamp: sortOrder })
    .limit(limit);

  res.json(messages);
});

app.put("/mark-read/:user1/:user2", authMiddleware, async (req, res) => {
  try {
    await Message.updateMany(
      { senderId: req.params.user2, receiverId: req.params.user1, read: false },
      { $set: { read: true } }
    );
    res.json({ message: "Messages marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/send-message", authMiddleware, async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
const msg = new Message({
  senderId,
  receiverId,
  message,
  timestamp: Date.now(),
  read: false
});
    await msg.save();
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/chat-users-fast/:userId", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    // 🔥 Step 1: get all messages where user is involved
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({ timestamp: -1 });

    // 🔥 Step 2: extract unique user IDs (chat partners)
    const userIdsSet = new Set();

    messages.forEach((msg) => {
      if (msg.senderId !== userId) userIdsSet.add(msg.senderId);
      if (msg.receiverId !== userId) userIdsSet.add(msg.receiverId);
    });

    const chatUserIds = Array.from(userIdsSet);

    // ❗ If no chats yet
    if (chatUserIds.length === 0) {
      return res.json([]);
    }

    // 🔥 Step 3: fetch only those users
    const users = await SignupUser.find({
      _id: { $in: chatUserIds }
    }).select("-password");

    // 🔥 Step 4: attach last message + unread
    const result = users.map((u) => {
      const lastMsg = messages.find(
        (m) =>
          (m.senderId.toString() === userId &&
            m.receiverId.toString() === u._id.toString()) ||
          (m.receiverId.toString() === userId &&
            m.senderId.toString() === u._id.toString())
      );

      return {
        ...u._doc,
        lastMessageTime: lastMsg?.timestamp || 0,
        hasUnread:
          lastMsg &&
          lastMsg.senderId.toString() !== userId &&
          !lastMsg.read,
      };
    });

    result.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching chat users" });
  }
});



app.get("/preview/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const ext = path.extname(filePath).toLowerCase();

  const mimeTypes = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".txt": "text/plain"
  };

  const contentType = mimeTypes[ext];

  // ❌ Unsupported preview types (docx, zip, etc.)
  if (!contentType) {
    return res.status(415).send("Preview not supported for this file type");
  }

  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", "inline"); // 🔥 THIS enables preview
  res.sendFile(filePath);
});

app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath);
});
app.get("/video/:filename", (req, res) => {
  const videoPath = path.join(__dirname, "uploads", req.params.filename);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send("Video not found");
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(videoPath).pipe(res);
  }
});
app.get("/search-user/:phone", authMiddleware, async (req, res) => {
  const user = await SignupUser.findOne({ phone: req.params.phone }).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});



// 🔥 AI ROADMAP ROUTE
app.get("/api/roadmap/:skill", async (req, res) => {
  try {
    const skill = req.params.skill;

    const response = await fetch(
      `http://localhost:8001/generate_roadmap?skill=${encodeURIComponent(skill)}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Roadmap error:", err);
    res.status(500).json({ message: "Failed to fetch roadmap" });
  }
});

app.get("/api/topic/:topic", async (req, res) => {
  try {
    const topic = req.params.topic;

    const response = await fetch(
      `http://localhost:8001/generate_topic?topic=${encodeURIComponent(topic)}`
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Topic error:", err);
    res.status(500).json({ message: "Failed to fetch topic" });
  }
});


// ----------------- DB + Socket.io start (unchanged) -----------------
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://amankumarjanuary_db_user:24012004@cluster0.v5mq8wb.mongodb.net/";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("addUser", (userId) => {
    if (!onlineUsers.some((u) => u.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    console.log("🟢 Online users:", onlineUsers);
  });

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id);
    console.log("❌ Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8000;
http.listen(PORT, () => console.log(`🚀 Server + Socket.io running on ${PORT}`));