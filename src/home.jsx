import {AIChatOffcanvas} from "./AIChatOffcanvas";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useEffect, useState, useContext } from "react";

import { Header } from "./header";
import { Link } from "react-router-dom";
import axios from "axios";
// Ensure these image paths are correct
import fab from "../src/image/fab1.jpg";
import shree from "../src/image/shree.jpg";
import f1 from "../src/image/f1.jpg";
import f2 from "../src/image/f2.jpg";
import pg from "../src/image/pg.jpg";
import notes from "../src/image/notes.jpg";
import project from "../src/image/project.jpg";
import sell from "../src/image/sell.jpg";
import shops from "../src/image/shops.jpg";
import skills from "../src/image/skills.jpg";
import chatbot from "../src/image/chatbot.jpg";
import events from "../src/image/collegeevents.avif";

import cartoon from "../src/image/cartoon.png";


// ---------------- 1. Home (Parent Component) ----------------
// Use named export for the main route component
export function Home() {

  // Components in the same file can be used directly after their definition
  return (
    <>
      {/* Header is imported at the top */}
      <Header />
      
      {/* Components defined later in this file */}
      <Corosel />
         <NewsMarquee /> 
      <Features />
      <StudentProjectsSlider />
      <StudentMarket /> 
      <SellItemModal /> 
            <AIChatOffcanvas />


      <Footer /> 
    </>
  );
}

// ---------------- 2. Corosel ----------------
export function Corosel() {
  const [current, setCurrent] = useState(0);

  const slides = [
    <div key={1} className="w-full bg-red-200 flex-shrink-0 h-[400px]">
      <img src="/static/b4.jpg" alt="Slide 1" className="w-full h-full object-cover" />
    </div>,
    <div key={2} className="w-full bg-blue-200 flex-shrink-0 h-[400px]">
      <img src="/static/b1.jpg" alt="Slide 2" className="w-full h-full object-cover" />
    </div>,
    <div key={3} className="w-full bg-green-200 flex-shrink-0 h-[400px]">
      <img src="/static/b7.jpg" alt="Slide 3" className="w-full h-full object-cover" />
    </div>,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
}


export default function NewsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  // 🔹 Editable news anytime
  const newsItems = [
    "🎓 College Fest from March 5",
    "🚀 New internships available",
    "📘 Notes uploaded",
    "🛒 Marketplace sale under ₹100",
    "💬 Chat feature live for students",
    "🎯 Hackathon registrations open",
  ];

  // 🔁 Duplicate for seamless infinite scroll
  const seamlessNews = [...newsItems, ...newsItems];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        width: "100%",
        height: "32px",
        marginTop: "8px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
        fontFamily: "Poppins, sans-serif",

        /* 🌤 Glass sky-blue professional background */
        background:
          "linear-gradient(90deg, rgba(224,247,255,0.9), rgba(179,236,255,0.9))",
        backdropFilter: "blur(6px)",
        borderTop: "1px solid rgba(0,119,182,0.2)",
        borderBottom: "1px solid rgba(0,119,182,0.2)",
        boxShadow: "0 4px 12px rgba(0,119,182,0.15)",
        cursor: "pointer",
      }}
    >
      {/* 🔁 Moving ticker */}
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div
          style={{
            display: "inline-flex",
            whiteSpace: "nowrap",
            gap: "80px",
            paddingLeft: "40px",
            animation: "scrollLeft 28s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {seamlessNews.map((item, index) => (
            <span
              key={index}
              style={{
                color: "#005f8f",
                fontSize: "14px",
                letterSpacing: "0.3px",
                textShadow: "0 1px 2px rgba(0,0,0,0.08)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* 🔥 Inline animation */}
      <style>
        {`
          @keyframes scrollLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}




// ---------------- 3. Features ----------------
export function Features() {
const features = [
  { 
    title: "🏠 PG Finder", 
    description: "Explore verified PGs with food, rent, rooms, and facilities near your college.", 
    image: pg, 
    link: "/pg" 
  },
  { 
    title: "📘 Notes Hub", 
    description: "Get notes by branch, semester, and subject. Search, download, or share notes easily.", 
    image: notes, 
    link: "/Notes" 
  },
  { 
    title: "🛍️ Nearby Shops", 
    description: "Find shops near your college with location, timings, distance, and contact info.", 
    image: shops, 
    link: "/shops" 
  },
  { 
    title: "💡 Skill Learning", 
    description: "Learn top-demand skills with roadmaps, resources, and career guidance.", 
    image: skills, 
    link: "/Skills" 
  },
  { 
    title: "🚀 Projects Showcase", 
    description: "Showcase your projects or find collaborators for new ideas and innovations.", 
    image: project, 
    link: "/projects" 
  },
  { 
    title: "🎯 College Events", 
    description: "Stay updated with hackathons, ideathons, workshops, and campus events.", 
    image: events, 
    link: "/events" 
  },
  { 
    title: "🛒 Marketplace", 
    description: "Buy or sell used items like books, electronics, or notes – all within your campus.", 
    image: sell, 
    link: "/marketplace" 
  },
  { 
    title: "🤖 Chatbot & Help", 
    description: "Ask doubts, request help, or get quick answers powered by smart AI assistance.", 
    image: chatbot, 
    link: "/chatbot" 
  }
];


  return (
<section className="py-12 bg-white">
  <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
    <i className="fas fa-users mr-10"></i> Features We Provide
  </h1>

  <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12">
    {features.map((f, i) => (
      <Link
        to={f.link}
        key={i}
        className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition duration-300"
      >
        {/* Title at top */}
        <div className="absolute top-0 left-0 w-full p-2 text-left z-20">
          <h2 className="text-xl font-bold text-white drop-shadow-lg">
            {f.title}
          </h2>
        </div>

        {/* Image */}
        <img
          src={f.image}
          alt={f.title}
          className="w-full h-72 object-cover"
        />

        {/* 🔥 Dark overlay added here */}
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>

        {/* Bottom description */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20">
          <p className="text-sm md:text-base text-white drop-shadow-md">
            {f.description}
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>

  );
}

// ---------------- 4. StudentProjectsSlider ----------------
export function StudentProjectsSlider() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [newProject, setNewProject] = useState({
    studentName: "",
    title: "",
    description: "",
    video: null,
  });

  const navigate = useNavigate();

  // 📡 Fetch projects
  useEffect(() => {
    axios
      .get("http://localhost:8000/get-projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("❌ Error fetching projects:", err));
  }, []);

  // ⬅️➡️ slider controls
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);

  // 🔎 filter titles
  const filteredTitles =
    search.trim() === ""
      ? projects
      : projects.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );

  const openProject = (index) => {
    setCurrentIndex(index);
    setShowResults(false);
    setSearch("");
  };

  // 📤 form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleVideoChange = (e) => {
    setNewProject({ ...newProject, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("studentName", newProject.studentName);
      formData.append("title", newProject.title);
      formData.append("description", newProject.description);
      formData.append("video", newProject.video);

      const response = await axios.post(
        "http://localhost:8000/add-project",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Project uploaded successfully!");
      setProjects([...projects, response.data.project]);
      setShowModal(false);
      setNewProject({ studentName: "", title: "", description: "", video: null });

    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Error uploading project");
    }
  };

  const cardWidth = 40;
  const cardHeight = 20;

  return (
    <section className="py-16 bg-white relative">

      {/* 🔍 SEARCH BAR */}
{/* 🔍 SEARCH BAR */}
<div className="absolute top-22 left-10 w-[420px] z-20">
  <div className="relative">
    <input
      type="text"
      value={search}
      placeholder="Search project title..."
      onChange={(e) => setSearch(e.target.value)}
      onFocus={() => setShowResults(true)}
      onBlur={() => setTimeout(() => setShowResults(false), 150)}
      className="pl-[60px] pr-4 w-full border-[2px] h-[45px] rounded-2xl
                 bg-white backdrop-blur-md text-gray-700 placeholder-gray-400
                 focus:outline-none focus:ring-1 focus:ring-sky-200"
    />

    <button className="absolute top-0 right-0 h-full px-5
                       bg-sky-200
                       text-white rounded-e-2xl backdrop-blur-md transition">
      <i className="fas fa-search"></i>
    </button>
  </div>

  {/* 🌫 Glass Dropdown */}
  {showResults && (
    <div className="mt-2 rounded-2xl shadow-2xl max-h-56 overflow-y-auto
                    bg-white/70 backdrop-blur-xl border border-gray-200">

      {filteredTitles.length > 0 ? (
        filteredTitles.map((p, i) => {
          const realIndex = projects.findIndex(
            (proj) => proj.title === p.title
          );

          return (
            <div
              key={i}
              onClick={() => openProject(realIndex)}
              className="px-5 py-3 cursor-pointer text-gray-700
                         hover:bg-gray-100/70 transition"
            >
              {p.title}
            </div>
          );
        })
      ) : (
        <div className="px-5 py-3 text-gray-400 text-sm">
          No project found
        </div>
      )}
    </div>
  )}
</div>


      {/* 🖼 Cartoon with MORE left margin */}
      <img
        src={cartoon}
        alt="cartoon"
        className="absolute top-[140px] left-[70px] w-[390px] h-[390px]"
      />

      {/* 🎓 Title */}
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        🎓 Student Projects Showcase
      </h2>

      {/* ➕ Upload Button */}
      <button
        onClick={() => setShowModal(true)}
        className="absolute left-[650px] top-[200px] bg-blue-300 hover:bg-blue-400
                   text-white py-3 px-4 rounded-full shadow-lg z-20"
      >
        <i className="fas fa-upload"></i>
      </button>

      {/* 🎞 Slider */}
      <div className="relative w-full flex justify-center items-center">

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-[650px] top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full z-10"
        >
          ❮
        </button>

        {/* Cards */}
        <div className="relative w-full max-w-7xl flex justify-end h-[28rem]">
          {projects.map((proj, index) => {
            let offset = index - currentIndex;
            if (offset < -Math.floor(projects.length / 2)) offset += projects.length;
            if (offset > Math.floor(projects.length / 2)) offset -= projects.length;

            const scale = offset === 0 ? 1 : 0.75;
            const translateX = offset * (cardWidth * 0.6);
            const zIndex = offset === 0 ? 10 : 5;

            const videoUrl = `http://localhost:8000/video/${proj.videoUrl.split("/").pop()}`;

            return (
              <div
                key={index}
                className="absolute top-0 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  width: `${cardWidth}rem`,
                  height: `${cardHeight}rem`,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  backgroundColor: "#000",
                }}
              >
                <video
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{proj.title}</h3>
                    <p className="mt-2 text-sm">{proj.description}</p>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/chat", { state: { phone: proj.phone } })
                    }
                    className="self-end bg-sky-400/80 px-3 py-2 rounded-xl"
                  >
                    Connect
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-6 bg-black/40 text-white p-3 rounded-full"
        >
          ❯
        </button>
      </div>

      {/* 🪟 Upload Modal (same UI) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl w-96 p-8 relative border border-sky-200">

            <button
              className="absolute top-4 right-4 text-sky-400 hover:text-sky-600 text-2xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3 className="text-3xl font-extrabold mb-6 text-white text-center">
              Upload Project 🎓
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={newProject.studentName}
                onChange={handleInputChange}
                required
                className="border border-sky-300 rounded-2xl p-3 bg-white/30 text-white placeholder-white/70"
              />

              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={newProject.title}
                onChange={handleInputChange}
                required
                className="border border-sky-300 rounded-2xl p-3 bg-white/30 text-white placeholder-white/70"
              />

              <textarea
                name="description"
                placeholder="Project Description"
                value={newProject.description}
                onChange={handleInputChange}
                rows={4}
                required
                className="border border-sky-300 rounded-2xl p-3 bg-white/30 text-white placeholder-white/70 resize-none"
              />

              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                required
                className="border border-sky-300 rounded-2xl p-3 bg-white/30 text-white"
              />

              <button
                type="submit"
                className="bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 text-white py-3 rounded-2xl font-semibold shadow-lg"
              >
                Upload Project
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}



// ---------------- 5. StudentMarket ----------------
export function StudentMarket() {
  const texts = [
    "Find the best student deals 🎒",
    "Buy or sell items easily 💰",
    "Connect directly with owners 📞",
  ];

  const navigate = useNavigate();

  // 🔑 get logged-in user
  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [itemList, setItemList] = useState([]);

  // Fetch items from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/get-sell-items")
      .then((res) => setItemList(res.data))
      .catch((err) => console.error("Error fetching sell items:", err));
  }, []);

  // Typing animation
  useEffect(() => {
    const currentText = texts[index];
    const typingSpeed = isDeleting ? 50 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((index + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts]);

  // Filter and pagination
  const filteredItems = itemList.filter((item) => {
    const search = searchTerm.toLowerCase();
    const matchesName = item.name && item.name.toLowerCase().includes(search);
    const matchesPrice = item.price && String(item.price).includes(search);
    const matchesYear =
      item.yearUsed && String(item.yearUsed).toLowerCase().includes(search);
    const matchesQuality =
      item.quality && String(item.quality).toLowerCase().includes(search);

    return matchesName || matchesPrice || matchesYear || matchesQuality;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="font-sans mt-10 mb-14 px-6 bg-white">
      {/* 🔍 Search + Title */}
      <div className="flex flex-col sm:flex-row items-center mb-28 gap-10">
        <div className="w-full sm:w-[45%] max-w-[500px]">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={text || "Search items..."}
              className="pl-[60px] pr-4 focus:outline-none focus:border-sky-100 focus:ring-sky-100 focus:ring-1 
                         w-full border-[2px] h-[45px] rounded-2xl placeholder:italic"
            />
            <button className="absolute top-0 right-0 h-full px-5 bg-sky-200 hover:bg-sky-300 text-white rounded-e-2xl transition-all shadow-md">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center ml-[40px] text-center">
          <h2 className="text-[2rem] font-bold text-gray-700 flex items-center gap-3">
            🛒 Buy & Sell Items
          </h2>
          <p className="text-gray-500 mt-1">
            Discover great deals on student products!
          </p>
        </div>
      </div>

      {/* 🖼️ Display Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={`http://localhost:8000${item.imageUrl}`}
                alt={item.name}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 text-white p-4 flex flex-col justify-between bg-black/30">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-lg">{item.name}</span>
                  <span>₹ {item.price} 💰 </span>
                </div>

                <div className="flex justify-between items-end text-sm relative">
                  <div>
                    <p>🧾 {item.quality}</p>
                    <p>⏳ {item.yearUsed} Year</p>
                  </div>

                  {/* 📞 Chat button — uses item phone OR logged-in user phone */}
                  <button
                    onClick={() =>
                      navigate("/chat", {
                        state: { phone: item.phone || user?.phone },
                      })
                    }
                    className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-2xl
                               bg-sky-400/70 text-white font-semibold cursor-pointer
                               transition-all duration-300 hover:bg-sky-400/90 hover:translate-y-[-2px]"
                  >
                    📞 Chat
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-full">No items found!</p>
        )}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center mt-20 gap-2 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md font-medium border border-gray-300 bg-white text-gray-600
                     hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 transition"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-md font-medium border transition
              ${
                currentPage === page
                  ? "bg-sky-50 text-sky-600 border-sky-200 shadow-sm"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md font-medium border border-gray-300 bg-white text-gray-600
                     hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}


// ---------------- 6. Footer ----------------
export const Footer = () => { // Changed from 'const' to 'export const'
  return (
    <footer style={{ width: "100%", backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={f1}
          alt="Image 1"
          style={{ width: "50%", height: "auto", objectFit: "cover" }}
        />
        <img
          src={f2}
          alt="Image 2"
          style={{ width: "50%", height: "auto", objectFit: "cover" }}
        />
      </div>
    </footer>
  );
};

// ---------------- 7. SellItemModal ----------------
export function SellItemModal() {
  const [showModal, setShowModal] = useState(false);

  // 🔑 Get logged-in user
  const { user } = useContext(AuthContext);

  // Input States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [yearUsed, setYearUsed] = useState("");
  const [quality, setQuality] = useState("");
  const [image, setImage] = useState(null);
  const [phone, setPhone] = useState("");

  // ✅ AUTO-SET PHONE FROM LOGGED-IN USER
  useEffect(() => {
    if (user?.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("yearUsed", yearUsed);
    formData.append("quality", quality);
    formData.append("image", image);

    // ✅ always send logged-in user phone
    formData.append("phone", user?.phone || "");

    try {
      const res = await fetch("http://localhost:8000/add-sell-item", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("✅ Item uploaded successfully!");

        // Clear form
        setName("");
        setPrice("");
        setYearUsed("");
        setQuality("");
        setImage(null);
        setShowModal(false);
      } else {
        alert("❌ Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading item:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <>
      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-sky-400 to-cyan-500 text-white rounded-full shadow-2xl w-16 h-16 flex items-center justify-center text-3xl hover:scale-110 transition-all duration-300 animate-pulse"
      >
        ➕
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl w-96 p-8 relative border border-sky-200">

            {/* Close */}
            <button
              className="absolute top-4 right-4 text-sky-400 hover:text-sky-600 text-2xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h3 className="text-3xl font-extrabold mb-6 text-white text-center">
              Sell Your Item 🛍️
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <input
                type="text"
                placeholder="Name of the Item"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/30 text-white placeholder-white/70"
              />

              <input
                type="number"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/30 text-white placeholder-white/70"
              />

              <input
                type="text"
                placeholder="Year Used (e.g., 2 Years)"
                value={yearUsed}
                onChange={(e) => setYearUsed(e.target.value)}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/30 text-white placeholder-white/70"
              />

              <input
                type="text"
                placeholder="Quality (Excellent, Good, Average)"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/30 text-white placeholder-white/70"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="border border-sky-300 rounded-2xl p-3 outline-none bg-white/30 text-white"
              />

              {/* 🚫 PHONE FIELD REMOVED FROM FORM UI */}
              {/* Phone automatically sent from logged-in user */}

              <button
                type="submit"
                className="bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 text-white py-3 rounded-2xl font-semibold transition shadow-lg"
              >
                Upload Item
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


// REMOVE THIS LINE: export default StudentMarket;