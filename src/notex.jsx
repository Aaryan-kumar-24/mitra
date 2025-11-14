
import notesData from "./data/notes";

import axios from "axios";
import logo from "./image/logo.jpg";
import { Link, useLocation } from "react-router-dom";

import  { useState, useEffect } from "react";
function Notes() {
  const [notesData, setNotesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // ✅ Upload form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedBy, setUploadedBy] = useState(""); // 👈 user input for uploader name

  // ✅ Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8000/get-notes");
        setNotesData(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  // ✅ Handle Upload Submit
  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedBy.trim()) {
      alert("Please enter your name in 'Uploaded By' field.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Description", description);
    formData.append("file", file);
    formData.append("uploaded_by", uploadedBy); // 👈 send uploader name

    try {
      const response = await axios.post("http://localhost:8000/add-note", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Note uploaded successfully!");
      setNotesData([...notesData, response.data.note]);
      setTitle("");
      setDescription("");
      setFile(null);
      setUploadedBy("");
      setShowUploadModal(false);
    } catch (error) {
      alert("❌ Upload failed!");
      console.error(error);
    }
  };

  // ✅ Filtering
  const filteredNotes = notesData.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.Description.toLowerCase().includes(searchTerm.toLowerCase());
const matchesCategory =
  selectedCategory === "" ||
  note.about?.some((a) =>
    a.label.toLowerCase().includes(selectedCategory.toLowerCase())
  );

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { label: "Handwritten", icon: "fas fa-pen" },
    { label: "E-Book Notes", icon: "fas fa-tablet-alt" },
    { label: "VTU Notes", icon: "fas fa-book" },
    { label: "Sample / Model Papers", icon: "fas fa-copy" },
    { label: "PYQ (Previous Year Questions)", icon: "fas fa-question-circle" },
    { label: "YouTube E-Notes", icon: "fab fa-youtube" },
  ];

  return (
    <>
      <Headerfornotes />

      {/* Sidebar */}
      <div className="fixed top-[63px] left-0 h-[calc(100vh-62px)] w-[300px] bg-white shadow-lg border-r border-slate-300 flex flex-col">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-slate-700 font-semibold mb-3 text-lg">Categories</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory("")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                  selectedCategory === ""
                    ? "bg-sky-500 text-white"
                    : "text-slate-600 hover:bg-sky-100"
                }`}
              >
                <i className="fas fa-layer-group"></i> All Notes
              </button>
            </li>
            {categories.map((cat, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
                    selectedCategory === cat.label
                      ? "bg-sky-500 text-white"
                      : "text-slate-600 hover:bg-sky-100"
                  }`}
                >
                  <i className={cat.icon}></i> {cat.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-40 text-center">
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all"
            >
              📤 Upload Your Notes
            </button>
          </div>
        </div>
      </div>

      {/* Main Notes Display */}
      <div className="ml-[320px] mt-[40px]">
        <h1 className="font-serif font-bold text-[2rem] text-center text-black">
          View All Notes
        </h1>

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div
              key={index}
              className="w-[1150px] flex h-[160px] mx-auto my-[40px] bg-slate-100 rounded-2xl hover:shadow-xl transition"
            >
              <div className="w-[900px] p-[20px]">
                <h2 className="font-serif font-medium text-[1.4rem]">{note.title}</h2>
                <p className="text-sm text-gray-700 mt-2">{note.Description}</p>
{note.about && note.about.length > 0 && (
  <div className="flex flex-wrap gap-3 mt-3">
    {note.about.map((item, index) => (
      <button
        key={index}
        className="text-sky-600 hover:bg-sky-400 hover:text-white bg-sky-100 rounded-xl px-[8px] text-[0.7rem] flex items-center gap-3 h-[30px]"
      >
        <i className={item.icon}></i> {item.label}
      </button>
    ))}
  </div>
)}

              </div>

              <div className="flex flex-col justify-center items-center w-[250px]">
                <div className="text-[0.8rem] bg-yellow-200 px-3 py-1 rounded-lg font-medium mb-3">
                  <i className="fas fa-upload"></i> {note.uploaded_by}
                </div>

                <a
                  href={`http://localhost:8000${note.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-300 hover:bg-sky-400 text-white px-4 py-2 rounded-xl mb-2 flex items-center gap-2 w-[138px] transition"
                >
                  <i className="fas fa-eye"></i> Preview
                </a>

                <a
                  href={`http://localhost:8000/download/${note.fileUrl.split("/").pop()}`}
                  className="bg-sky-300 hover:bg-sky-400 text-white px-4 py-2 rounded-xl flex items-center w-[138px] gap-2 transition"
                >
                   <i className="fas fa-download"></i> Download
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 mt-10 text-lg">
            No notes found for "{searchTerm || selectedCategory}"
          </p>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl w-96 p-8 relative border border-sky-200">
            <button
              className="absolute top-4 right-4 text-sky-500 hover:text-sky-700 text-2xl font-bold transition"
              onClick={() => setShowUploadModal(false)}
            >
              ✖
            </button>

            <h3 className="text-3xl font-extrabold mb-6 text-white text-center">
              Upload Your Notes
            </h3>

            <form onSubmit={handleUploadSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Title or Subject Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/40 placeholder-white"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/40 placeholder-white"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/40 text-white"
              />

              {/* ✅ Uploaded By Field */}
              <input
                type="text"
                placeholder="Uploaded By (Your Name)"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/40 placeholder-white"
              />

              <button
                type="submit"
                className="bg-sky-300 hover:bg-sky-500 text-white py-3 rounded-2xl font-semibold transition shadow-lg"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


export { Notes };


export function Headerfornotes() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // current route

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        document.querySelectorAll(".profile-card").forEach((card, i) => {
          card.classList.add("visible");
          card.style.animationDelay = `${0.2 + i * 0.2}s`;
        });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.querySelectorAll(".profile-card").forEach((card) => {
        card.classList.remove("visible");
      });
    }
  }, [open]);

  // Function to highlight active button
  const getButtonClasses = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
      location.pathname === path
        ? "text-white bg-sky-500 shadow-lg"
        : "text-sky-800 hover:text-white hover:bg-sky-500 hover:shadow-lg"
    }`;

  return (
    <>
      {/* Fixed Header */}
    <div className={`fixed top-0 left-0 w-full shadow flex items-center justify-evenly flex-wrap gap-4 p-1 ${
  open ? "backdrop-blur-md bg-white/70 z-40" : "bg-white z-50"
}`}>
      <div className="logo-container flex items-center gap-1">
          <img src={logo} className="Logo w-10 h-10" alt="Logo" />
          <div className="logo-title text-xl font-bold text-sky-700">Aryavarta Mitra</div>
        </div>

        <Link to={"/"}>
          <button className={getButtonClasses("/")}>
            <i className="fas fa-home"></i> Home
          </button>
        </Link>

        <Link to={"/pg"}>
          <button className={getButtonClasses("/pg")}>
            <i className="fas fa-building"></i> PG Nearby
          </button>
        </Link>

        <Link to={"/shops"}>
          <button className={getButtonClasses("/shops")}>
            <i className="fas fa-store"></i> Shops Nearby
          </button>
        </Link>

        <Link to={"/Skills"}>
          <button className={getButtonClasses("/Skills")}>
            <i className="fas fa-lightbulb"></i> Skills
          </button>
        </Link>

        <Link to={"/Notes"}>
          <button className={getButtonClasses("/Notes")}>
            <i className="fas fa-book"></i> Notes
          </button>
        </Link>

        <button
          onClick={() => setOpen(true)}
          className={getButtonClasses("/account")}
        >
          <i className="fas fa-user"></i> Account
        </button>
      </div>

      {/* Push content below fixed header */}
      <div className="mt-20"></div>

      {/* Profile Offcanvas */}
      <div>
        {open && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 right-0 h-full w-[370px] bg-white/70 backdrop-blur-lg text-green-900 border-l-4 shadow-xl rounded-l-xl z-50 transform transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-lg font-semibold flex ml-[120px] items-center gap-2">
              <i className="bi bi-person-badge-fill"></i> Your Profile
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-gray-900 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto h-full">
            {/* Profile Cards */}
            <div className="profile-card">
              <i className="bi bi-person-fill icon-green"></i>
              <div className="info-text">
                <div className="info-label">Username</div>
                <div className="info-value">Aryan Kumar</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-envelope-fill icon-blue"></i>
              <div className="info-text">
                <div className="info-label">Email</div>
                <div className="info-value">aryan@example.com</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-telephone-fill icon-orange"></i>
              <div className="info-text">
                <div className="info-label">Phone</div>
                <div className="info-value">+91 9876543210</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-person-vcard-fill icon-purple"></i>
              <div className="info-text">
                <div className="info-label">Role</div>
                <div className="info-value">Student</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-shield-lock-fill icon-red"></i>
              <div className="info-text">
                <div className="info-label">Access Level</div>
                <div className="info-value">Student</div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="text-center mt-6">
              <Link to={"/Login_signup"}>
                <button className="logout-btn flex items-center justify-center gap-2">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Extra CSS */}
      <style>{`
        .profile-card {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 12px;
          margin-bottom: 15px;
          padding: 1rem;
          box-shadow: 0 4px 12px rgba(188, 188, 188, 0.78);
          transform: translateY(20px);
          opacity: 0;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .profile-card.visible {
          animation: fadeSlideIn 0.6s ease forwards;
          background-color: rgba(244, 238, 238, 0.32);
        }
        .profile-card:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        @keyframes fadeSlideIn {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .profile-card i {
          font-size: 1.7rem;
          margin-right: 15px;
          padding: 10px;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          text-align: center;
          line-height: 25px;
          color: white;
        }
        .icon-green { background: linear-gradient(45deg, #66bb6a, #388e3c); }
        .icon-blue { background: linear-gradient(45deg, #42a5f5, #1e88e5); }
        .icon-orange { background: linear-gradient(45deg, #ffa726, #fb8c00); }
        .icon-purple { background: linear-gradient(45deg, #ab47bc, #8e24aa); }
        .icon-red { background: linear-gradient(45deg, #ef5350, #c62828); }
        .info-text { flex: 1; }
        .info-label { font-weight: bold; font-size: 0.9rem; color: #444; }
        .info-value { font-size: 1rem; color: #2e7d32; }
        .logout-btn {
          display: inline-block;
          padding: 10px 18px;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #ff1744, #d50000);
          border: none;
          border-radius: 50px;
          transition: all 0.4s ease;
          opacity: 0;
          animation: fadeIn 1.6s ease forwards;
          animation-delay: 1.4s;
        }
        .logout-btn:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, #ff5252, #b71c1c);
          box-shadow: 0 4px 10px rgba(255, 0, 0, 0.3);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}
