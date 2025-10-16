
import notesData from "./data/notes";

import logo from "./image/logo.jpg";
import { Link, useLocation } from "react-router-dom";

import  { useState, useEffect } from "react";

function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // category state
  const [showUploadModal, setShowUploadModal] = useState(false);


  // Filter notes by search + category (from description)
  const filteredNotes = notesData.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      note.description.toLowerCase().includes(selectedCategory.toLowerCase());

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
        {/* Search Bar */}
        <div className="p-4  border-slate-200">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-slate-700 font-semibold mb-3 text-lg">
            Categories
          </h2>
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
          {/* Upload Notes Button + Modal */}
<div className="mt-40 text-center">
  <button
    onClick={() => setShowUploadModal(true)}
    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-xl shadow-md transition-all"
  >
    📤 Upload Your Notes
  </button>
</div>

{showUploadModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl w-96 p-8 relative border border-sky-200">
      
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-sky-500 hover:text-sky-700 text-2xl font-bold transition"
        onClick={() => setShowUploadModal(false)}
      >
        ✖
      </button>

      {/* Modal Title */}
      <h3 className="text-3xl font-extrabold mb-6 text-white text-center">
        Upload Your Notes
      </h3>

      {/* Form */}
      <form className="flex flex-col gap-5">
        {/* Title/Subject Name */}
        <input
          type="text"
          placeholder="Title or Subject Name"
          className="border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-2xl p-3 outline-none transition w-full bg-white/40 placeholder-white"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          rows={3}
          className="border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-2xl p-3 outline-none transition w-full resize-none bg-white/40 placeholder-white"
          required
        />

        {/* File Upload */}
        <input
          type="file"
          className="border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-2xl p-3 outline-none transition w-full cursor-pointer bg-white/50 text-white"
          required
        />

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setShowUploadModal(false)}
            className="flex-1 bg-slate-300 hover:bg-slate-200 text-white py-3 rounded-2xl font-semibold transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-sky-300 hover:bg-sky-500 text-white py-3 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
          >
            Upload
          </button>
        </div>
      </form>
    </div>    
  </div>
)}

        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[320px]">
        <h1 className="mt-[40px] font-serif font-bold text-[2rem] text-center text-black">
          View all Notes
        </h1>

        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div
              key={index}
              className="notes_card w-[1150px] flex h-[160px] mx-auto m-[40px] bg-slate-100 rounded-2xl hover:shadow-xl"
            >
              {/* Left Content */}
              <div className="notes w-[900px] h-[160px] pl-[20px] pt-[7px]">
                <div className="title m-[5px] h-[30px] font-medium font-serif text-[1.4rem]">
                  {note.title}
                </div>

                <div className="description m-[5px] font-extralight h-[60px]">
                  {note.description}
                </div>

                {/* About Section with Icons */}
                <div className="about m-[5px] flex h-[60px] flex-wrap">
                  {note.about.map((item, i) => (
                    <button
                      key={i}
                      className="h-[40px] text-sky-600 hover:bg-sky-400 hover:text-white bg-sky-100 rounded-xl px-[10px] mr-[15px] text-[0.9rem] flex items-center gap-2"
                    >
                      <i className={item.icon}></i> {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <div className="download w-[220px] flex-wrap">
                <div className="uploaded_by w-[100px] p-[6px] ml-[150px] bg-yellow-200 rounded-s-lg font-medium font-serif text-[0.68rem] flex items-center gap-2">
                  <i className="fas fa-upload"></i> {note.uploaded_by}
                </div>

                {/* Preview Button */}
                <a
                  href={note.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-[35px] bg-sky-200 w-[150px] m-[20px] mt-[20px] text-[1rem] rounded-xl ml-[40px] hover:bg-sky-400 transition"
                >
                  <i className="fas fa-eye"></i> Preview
                </a>

                {/* Download Button */}
                <a
                  href={note.file}
                  download={`${note.title.replace(/\s+/g, "_")}_Notes.pdf`}
                  className="flex items-center justify-center gap-2 h-[35px] bg-sky-200 w-[150px] m-[20px] text-[1rem] rounded-xl ml-[40px] hover:bg-sky-400 transition"
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
    <div className={`fixed top-0 left-0 w-full shadow-md flex items-center justify-evenly flex-wrap gap-4 p-1 ${
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
