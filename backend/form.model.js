const mongoose = require("mongoose");

/* ------------------- Note Schema ------------------- */
const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  Description: { type: String, required: true }, // kept as-is to match your current code
  fileUrl: { type: String, required: true },

  // Who uploaded this note
  uploaded_by: { type: String, required: true },

  // Array of matched labels and icons
  about: [
    {
      label: { type: String },
      icon: { type: String },
    },
  ],
});

// Pre-save hook to analyze full description and assign multiple tags
NoteSchema.pre("save", function () {
  const desc = (this.Description || "").toLowerCase();
  const aboutList = [];

  if (desc.includes("handwritten"))
    aboutList.push({ label: "Handwritten", icon: "fas fa-pen" });

  if (desc.includes("ebook") || desc.includes("e-book"))
    aboutList.push({ label: "E-Book Notes", icon: "fas fa-tablet-alt" });

  if (desc.includes("vtu"))
    aboutList.push({ label: "VTU Notes", icon: "fas fa-book" });

  if (desc.includes("model") || desc.includes("sample"))
    aboutList.push({ label: "Sample / Model Papers", icon: "fas fa-copy" });

  if (desc.includes("pyq") || desc.includes("previous"))
    aboutList.push({ label: "PYQ (Previous Year Questions)", icon: "fas fa-question-circle" });

  if (desc.includes("youtube"))
    aboutList.push({ label: "YouTube E-Notes", icon: "fab fa-youtube" });

  if (aboutList.length === 0)
    aboutList.push({ label: "General Notes", icon: "fas fa-file-alt" });

  this.about = aboutList;
});

/* ------------------- Project Schema ------------------- */
const ProjectSchema = new mongoose.Schema({
  studentName: String,
  title: String,
  description: String,
  videoUrl: String,
  phone: String 
});


/* ------------------- Login User Schema ------------------- */
const loginuserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

/* ------------------- Signup User Schema -------------------
    NOTE: field name is `avatar` (string). Backend sets avatar: profileUrl.
*/
// ... (omitted Note/Project schemas)

/* ------------------- Signup User Schema -------------------
    NOTE: avatar will now store the local path, e.g., /uploads/1700000000-profile.jpg
*/
const signupuserSchema = new mongoose.Schema({
  avatar: { type: String, required: true }, // stores local file path
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  college: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ... (omitted other schemas and exports)

/* ------------------- Sell Item Schema ------------------- */
const SellItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  yearUsed: { type: String, required: true },
  quality: { type: String, required: true },
  imageUrl: { type: String, required: true },
  phone: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

/* ------------------- Message Schema ------------------- */

const MessageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,
  mediaUrl: String,
  mediaType: String,
  fileName: String,
  timestamp: { type: Number, default: Date.now },
  read: { type: Boolean, default: false },
});

/* ------------------- Models ------------------- */
const Note = mongoose.model("Note", NoteSchema);
const Project = mongoose.model("Project", ProjectSchema);
const LoginUser = mongoose.model("LoginUser", loginuserSchema);
const SignupUser = mongoose.model("SignupUser", signupuserSchema);
const SellItem = mongoose.model("SellItem", SellItemSchema);
const Message = mongoose.model("Message", MessageSchema);

/* 🔥 ADD THIS RIGHT HERE */
Message.collection.createIndex({ senderId: 1, receiverId: 1 });
Message.collection.createIndex({ timestamp: -1 });

/* Export */
module.exports = {
  Note,
  Project,
  LoginUser,
  SignupUser,
  SellItem,
  Message,
};

/* Export */
module.exports = {
  Note,
  Project,
  LoginUser,
  SignupUser,
  SellItem,
  Message,
};