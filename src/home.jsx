import { useEffect, useState } from "react";
import { Header } from "./header";
import { Link } from "react-router-dom";

import fab from "../src/image/fab1.jpg";
import shree from "../src/image/shree.jpg";
// ---------------- Home ----------------
export function Home() {

  return (
    <>
      <Header />
      <Corosel />
      <Features />
      <StudentProjectsSlider/>
      <StudentMarket/>
    </>
  );
}

export function Corosel() {
  const [current, setCurrent] = useState(0);

  const slides = [
    <div key={1} className="w-full bg-red-200 flex-shrink-0 h-[400px]">
      <img
        src="/static/b4.jpg"
        alt="Slide 1"
        className="w-full h-full object-cover"
      />
    </div>,
    <div key={2} className="w-full bg-blue-200 flex-shrink-0 h-[400px]">
      <img
        src="/static/b1.jpg"
        alt="Slide 2"
        className="w-full h-full object-cover"
      />
    </div>,
    <div key={3} className="w-full bg-green-200 flex-shrink-0 h-[400px]">
      <img
        src="/static/b7.jpg"
        alt="Slide 3"
        className="w-full h-full object-cover"
      />
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
export function Features() {
  const features = [
    {
      title: "🏠 PG Finder",
      description:
        "Explore verified PGs with food, rent, rooms, and facilities near your college.",
      image: shree,
      link: "/pgs",
    },
    {
      title: "📘 Notes Hub",
      description:
        "Get notes by branch, semester, and subject. Search, download, or share notes easily.",
      image: shree,
      link: "/notes",
    },
    {
      title: "🛍️ Nearby Shops",
      description:
        "Find shops near your college with location, timings, distance, and contact info.",
      image: shree,
      link: "/shops",
    },
    {
      title: "💡 Skill Learning",
      description:
        "Learn top-demand skills with roadmaps, resources, and career guidance.",
      image: shree,
      link: "/skills",
    },
    {
      title: "🚀 Projects & Collaboration",
      description:
        "Showcase your projects or find collaborators for new ideas and innovations.",
      image: shree,
      link: "/projects",
    },
    {
      title: "🎯 College Events",
      description:
        "Stay updated with hackathons, ideathons, workshops, and campus events.",
      image: shree,
      link: "/events",
    },
    {
      title: "🛒 Marketplace",
      description:
        "Buy or sell used items like books, electronics, or notes – all within your campus.",
      image: shree,
      link: "/marketplace",
    },
    {
      title: "📢 Requests & Help",
      description:
        "Request urgent notes, items, or help from other students instantly.",
      image: shree,
      link: "/requests",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
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
      {/* Title attached at top */}
      <div className="absolute top-0 left-0 w-full  p-2 text-left">
        <h2 className="text-xl font-bold text-white drop-shadow-lg">
          {f.title}
        </h2>
      </div>

      {/* Image */}
      <img
        src={f.image}
        alt={f.title}
        className="w-full h-72 bg-red-200 object-cover"
      />

      {/* Glass effect overlay (bottom content) */}
      <div className="absolute bottom-0 left-0 w-full p-6">
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

export function StudentProjectsSlider() {
  const [projects, setProjects] = useState([
    {
      studentName: "Aryan Kumar",
      title: "AI Chatbot",
      description: "A conversational AI chatbot built using NLP and React for real-time interactions.",
      image: fab,
    },
    {
      studentName: "Devyash Jangid",
      title: "Robotics Arm",
      description: "Autonomous robotic arm capable of object sorting and precise movements.",
      image: fab,
    },
    {
      studentName: "Riya Sharma",
      title: "Eco-friendly App",
      description: "Mobile app promoting sustainable habits with gamified challenges.",
      image: fab,
    },
    {
      studentName: "Karan Verma",
      title: "3D Modeling Tool",
      description: "Web-based tool for creating 3D models with intuitive UI and real-time rendering.",
      image: fab,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    studentName: "",
    title: "",
    description: "",
    video: null,
  });

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleVideoChange = (e) => {
    setNewProject({ ...newProject, video: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      studentName: newProject.studentName,
      title: newProject.title,
      description: newProject.description,
      image: fab, // fallback image
    };
    setProjects([...projects, projectData]);
    setShowModal(false);
    setNewProject({ studentName: "", title: "", description: "", video: null });
  };

  const cardWidth = 40; // rem
  const cardHeight = 20; // rem

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        🎓 Student Projects Showcase
      </h2>

      <div className="relative w-full flex justify-center items-center">
        {/* Upload Button */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute bg-blue-300 hover:bg-blue-400 text-white py-3 px-4 rounded-full shadow-lg z-10"
          style={{ left: '640px', top: '25%', transform: 'translateY(-50%)' }}
        > <i className="fas fa-upload"></i> 
        </button>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute text-white bg-black/40 hover:bg-black/60 p-3 rounded-full z-10 shadow-lg"
          style={{ left: '650px', top: '50%', transform: 'translateY(-50%)' }}
        >
          ❮
        </button>

        {/* Slider */}
        <div className="relative w-full max-w-7xl flex justify-end h-[28rem]">
          {projects.map((proj, index) => {
            let offset = index - currentIndex;
            if (offset < -Math.floor(projects.length / 2)) offset += projects.length;
            if (offset > Math.floor(projects.length / 2)) offset -= projects.length;
            const isCenter = offset === 0;
            const scale = isCenter ? 1 : 0.75;
            const translateX = offset * (cardWidth * 0.6);
            const zIndex = isCenter ? 10 : 5;
            const opacity = Math.abs(offset) > 2 ? 0 : 1;

            return (
              <div
                key={index}
                className="absolute top-0 rounded-2xl shadow-2xl cursor-pointer transition-all duration-500 flex flex-col justify-between"
                style={{
                  width: `${cardWidth}rem`,
                  height: `${cardHeight}rem`,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  backgroundImage: `url(${proj.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                  <div>
                    <h3 className="text-2xl top-1 font-bold">{proj.title}</h3>
                    <p className="mt-2 text-sm">{proj.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm">
                      By <span className="font-semibold">{proj.studentName}</span>
                    </p>
                    <button  className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-2xl
                               bg-sky-400/70 text-white font-semibold cursor-pointer
                               transition-all duration-300 hover:bg-sky-400/90 hover:translate-y-[-2px]"
               >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-6 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full z-10 shadow-lg"
        >
          ❯
        </button>
      </div>

{/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl w-96 p-8 relative border border-sky-200">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-sky-500 hover:text-sky-700 text-2xl font-bold transition"
        onClick={() => setShowModal(false)}
      >
        ✖
      </button>

      {/* Modal Title */}
      <h3 className="text-3xl font-extrabold mb-6 text-white text-center">
        Upload Project
      </h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Student Name */}
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={newProject.studentName}
          onChange={handleInputChange}
          required
          className="border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-2xl p-3 outline-none transition w-full bg-white/40 placeholder-white"
        />

        {/* Project Title */}
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={newProject.title}
          onChange={handleInputChange}
          required
          className="border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-2xl p-3 outline-none transition w-full bg-white/40 placeholder-white"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Project Description"
          value={newProject.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-2xl p-3 outline-none transition w-full resize-none bg-white/40 placeholder-white"
        />

        {/* Video Upload */}
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          required
          className="border border-sky-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 rounded-2xl p-3 outline-none transition w-full cursor-pointer bg-white/50 text-white"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-sky-300 hover:bg-sky-500 text-white py-3 px-6 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl w-full"
        >
          Submit
        </button>
      </form>
    </div>
  </div>

      )}
    </section>
  );
}

function StudentMarket() {
  const texts = [
    "Find the best student deals 🎒",
    "Buy or sell items easily 💰",
    "Connect directly with owners 📞",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const itemList = [
    { name: "Laptop", price: "₹30,000 - ₹35,000", quality: "Excellent", yearsUsed: "1 Year", phone: "9876543210", image: fab },
    { name: "Cycle", price: "₹2,500 - ₹3,000", quality: "Good", yearsUsed: "2 Years", phone: "9988776655", image: fab },
    { name: "Guitar", price: "₹4,000 - ₹5,500", quality: "Very Good", yearsUsed: "1.5 Years", phone: "9123456789", image: fab },
    { name: "Books Set", price: "₹600 - ₹800", quality: "Like New", yearsUsed: "6 Months", phone: "9012345678", image: fab },
    { name: "Desk Chair", price: "₹1,000 - ₹1,500", quality: "Good", yearsUsed: "2 Years", phone: "9801234567", image: fab },
    { name: "Printer", price: "₹2,000 - ₹2,500", quality: "Excellent", yearsUsed: "1 Year", phone: "9876501234", image: fab },
    { name: "Monitor", price: "₹7,000 - ₹8,000", quality: "Good", yearsUsed: "1 Year", phone: "9876501235", image: fab },
    { name: "Tablet", price: "₹15,000 - ₹16,000", quality: "Very Good", yearsUsed: "6 Months", phone: "9876501236", image: fab },
    { name: "Headphones", price: "₹1,500 - ₹2,000", quality: "Like New", yearsUsed: "1 Year", phone: "9876501237", image: fab },
  ];

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

  // Filter items
  const filteredItems = itemList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Handlers for prev/next
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="font-sans mt-10 mb-14 px-6">
      {/* Search + Title */}
      <div className="flex flex-col sm:flex-row items-center mb-28 gap-10">
        {/* Search Bar */}
        <div className="w-full sm:w-[45%] max-w-[500px]">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={text || "Search items..."}
          className="pl-[60px] pr-4 focus:outline-none focus:border-sky-100 focus:ring-sky-100 focus:ring-1 
                       w-full border-[2px] h-[45px] rounded-2xl placeholder:italic"     />
            <button className="absolute top-0 right-0 h-full px-5 bg-sky-200 hover:bg-sky-300 text-white rounded-e-2xl transition-all shadow-md">
             
            <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col justify-center items-center ml-[40px]  text-center">
          <h2 className="text-[2rem] font-bold text-gray-700 flex items-center  gap-3">
            🛒 Buy & Sell Items 
          </h2>
          <p className="text-gray-500 mt-1">Discover great deals on student products!</p>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <img src={item.image} alt={item.name} className="w-full h-72 object-cover" />
              <div className="absolute inset-0 text-white p-4 flex flex-col justify-between">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-lg">{item.name}</span>
                  <span className="text-white">{item.price}</span>
                </div>
                <div className="flex justify-between items-end text-sm relative">
                  <div>
                    <p>🧾 {item.quality}</p>
                    <p>⏳ {item.yearsUsed}</p>
                  </div>
                  <button
                    onClick={() => alert(`Call ${item.phone} to contact owner`)}
                    className="absolute bottom-1 right-1 flex items-center gap-2 px-3 py-2 rounded-2xl
                               bg-sky-400/70 text-white font-semibold cursor-pointer
                               transition-all duration-300 hover:bg-sky-400/90 hover:translate-y-[-2px]"
                  >
                    📞 {item.phone}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic col-span-full">No items found!</p>
        )}
      </div>

{/* Modern Professional Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center items-center mt-20 gap-2 flex-wrap">
    {/* Previous Button */}
    <button
      onClick={handlePrev}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-md font-medium border border-gray-300 bg-white text-gray-600
                 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 transition"
    >
      Previous
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`px-4 py-2 rounded-md font-medium border transition
                    ${currentPage === page
                      ? "bg-sky-50 text-sky-600 border-sky-200 shadow-sm"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"}`}
      >
        {page}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={handleNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-md font-medium border border-gray-300 bg-white text-gray-600
                 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 transition"
    >
      Next
    </button>
  </div>
)}
    </div>
  );
}

export default StudentMarket;
