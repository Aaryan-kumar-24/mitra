import { Header } from "./header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import skillsData from "./data/skill";

function Skills() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/skill_details/${search}`);
  };

  return (
    <>
      {/* ✅ HEADER */}
      <Header />

      {/* 🔥 TITLE + SEARCH */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            🚀 Explore Skills
          </h1>

          <div className="w-full md:w-[380px] relative">
            <input
              type="text"
              value={search}
              placeholder="Search skills..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-4 pr-14 w-full h-[48px] rounded-2xl
                         bg-white border border-gray-200
                         text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-sky-200
                         shadow-sm transition"
            />

            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 h-full px-5 bg-sky-300 text-white rounded-e-2xl hover:bg-sky-400 transition"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-10 mb-10">
        {[
          ["🔥", "12+", "Skills"],
          ["📈", "High", "Demand"],
          ["🎯", "Career", "Focused"],
          ["💼", "Top", "Industries"],
        ].map(([icon, value, label], i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-6 text-center hover:shadow-lg transition duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <h2 className="text-xl font-bold text-gray-800">{value}</h2>
            <p className="text-gray-500 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* 🔥 SECTION TITLE */}
      <h1 className="text-center text-3xl font-bold text-gray-900 mt-6">
        🚀 Top Engineering Skills
      </h1>

      {/* 🔥 SKILLS GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 mt-12 mb-20">

        {skillsData.skills.map((skill, index) => (
          <Link key={index} to={`/skill_details/${skill.name}`}>

            {/* ✅ CARD ZOOM HERE */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg 
                            transition duration-500 
                            hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group">

              {/* IMAGE (NO ZOOM NOW) */}
              <img
                src={skill.image}
                className="h-[300px] w-full object-cover"
              />

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>

              {/* CONTENT */}
              <div className="absolute inset-0 flex flex-col justify-between p-5 text-white">

                <h2 className="text-xl font-bold tracking-wide group-hover:text-sky-300 transition">
                  {skill.name}
                </h2>

                <div className="flex justify-between text-xs">

                  <span className="px-3 py-1 rounded-full transition">
                    ⏱ {skill.time}
                  </span>

                  <span className="text-white px-3 py-1 rounded-full">
                    🎯 {skill.level}
                  </span>

                </div>

              </div>

            </div>

          </Link>
        ))}

      </div>
    </>
  );
}

export { Skills };