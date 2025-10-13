import { useEffect, useState } from "react";
import { Header } from "./header";
import { Link } from "react-router-dom";

// ---------------- Home ----------------
export function Home() {

  return (
    <>
      <Header />
      <Corosel />
      <Features />
      <StudentProjectsSlider/>
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
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      link: "/pgs",
    },
    {
      title: "📘 Notes Hub",
      description:
        "Get notes by branch, semester, and subject. Search, download, or share notes easily.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      link: "/notes",
    },
    {
      title: "🛍️ Nearby Shops",
      description:
        "Find shops near your college with location, timings, distance, and contact info.",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      link: "/shops",
    },
    {
      title: "💡 Skill Learning",
      description:
        "Learn top-demand skills with roadmaps, resources, and career guidance.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      link: "/skills",
    },
    {
      title: "🚀 Projects & Collaboration",
      description:
        "Showcase your projects or find collaborators for new ideas and innovations.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      link: "/projects",
    },
    {
      title: "🎯 College Events",
      description:
        "Stay updated with hackathons, ideathons, workshops, and campus events.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      link: "/events",
    },
    {
      title: "🛒 Marketplace",
      description:
        "Buy or sell used items like books, electronics, or notes – all within your campus.",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657",
      link: "/marketplace",
    },
    {
      title: "📢 Requests & Help",
      description:
        "Request urgent notes, items, or help from other students instantly.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      link: "/requests",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
         Features We Provide
      </h1>
      <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {features.map((f, i) => (
          <Link
            to={f.link}
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition duration-300"
          >
            {/* Image */}
            <img
              src={f.image}
              alt={f.title}
              className="w-full h-72 bg-red-200 object-cover" // increased height
            />

            {/* Glass effect overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6">
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                {f.title}
              </h2>
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

// ---------------- Student Projects Slider ----------------
export function StudentProjectsSlider() {
  const projects = [
    {
      studentName: "Aryan Kumar",
      title: "AI Chatbot",
      description:
        "A conversational AI chatbot built using NLP and React for real-time interactions.",
       image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
    {
      studentName: "Devyash Jangid",
      title: "Robotics Arm",
      description:
        "Autonomous robotic arm capable of object sorting and precise movements.",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
    {
      studentName: "Riya Sharma",
      title: "Eco-friendly App",
      description:
        "Mobile app promoting sustainable habits with gamified challenges.",
         image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      studentName: "Karan Verma",
      title: "3D Modeling Tool",
      description:
        "Web-based tool for creating 3D models with intuitive UI and real-time rendering.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev === 0 ? projects.length - 1 : prev - 1)
    );
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);

  const cardWidth = 40; // rem
  const cardHeight = 20; // rem

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        🎓 Student Projects Showcase
      </h2>

      <div className="relative w-full flex justify-center items-center">
{/* Left Arrow */}
<button
  onClick={prevSlide}
  style={{ left: '650px' }} 
  className="absolute text-white bg-black/40 hover:bg-black/60 p-3 rounded-full z-10 shadow-lg"
>
  ❮
</button>


        {/* Slider Container */}
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
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

                {/* Text Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
                  <div>
                    <h3 className="text-2xl font-bold">{proj.title}</h3>
                    <p className="mt-2 text-sm">{proj.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm">
                      By <span className="font-semibold">{proj.studentName}</span>
                    </p>
                    <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">
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
    </section>
  );
}
