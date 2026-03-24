import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { useParams } from "react-router-dom";
import skillsData from "./data/skill";
import RoadmapGraph from "./RoadmapGraph";

function Skill_Details() {
  const { skillName } = useParams();

  const decodedSkill = decodeURIComponent(skillName);

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Try to find skill locally (optional)
  const skill = skillsData.skills.find(
    (s) => s.name.toLowerCase() === decodedSkill.toLowerCase()
  );

  // 🔥 ALWAYS call backend
  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:8001/generate_roadmap?skill=${decodedSkill}`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        setRoadmap(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Roadmap error:", err);
        setLoading(false);
      });
  }, [decodedSkill]);

  return (
    <>
      <Header />

      {/* 🔥 HERO (fallback if skill not found) */}
      <div className="bg-white py-20 text-center animate-fade-in">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          {skill ? skill.name : decodedSkill}
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          {skill
            ? skill.description
            : "AI-generated roadmap for this skill"}
        </p>
      </div>

      {/* 🔥 INFO (ONLY IF SKILL EXISTS) */}
      {skill && (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-16 items-center">

          {/* IMAGE */}
          <div className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-500">
            <img
              src={skill.image}
              className="w-full h-[400px] object-cover hover:scale-105 transition duration-700"
            />
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-2 gap-6">
            {[
              ["🚀 Why", skill.why],
              ["📚 Prereq", skill.prerequisites],
              ["💼 Roles", skill.roles],
              ["💰 Salary", skill.salary],
              ["🛠 Tools", skill.tools],
              ["📈 Demand", skill.demand],
            ].map(([t, d], i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <h3 className="font-semibold text-indigo-600 mb-1">
                  {t}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 ROADMAP (ALWAYS SHOW) */}
      <div className="bg-white py-16 border-t">
        <h2 className="text-center text-3xl font-bold mb-10 text-gray-900">
          📊 Interactive Roadmap
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Generating roadmap...
          </p>
        ) : roadmap ? (
          <RoadmapGraph data={roadmap} />
        ) : (
          <p className="text-center text-red-500">
            Failed to load roadmap
          </p>
        )}
      </div>

      {/* 🔥 YOUTUBE (ONLY IF SKILL EXISTS) */}
      {skill && (
        <div className="py-20 px-6 bg-white">
          <h2 className="text-center text-3xl font-bold mb-12 text-gray-900">
            🎥 Best Tutorials
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

            {skill.resources.map((v, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 group"
              >
                <iframe
                  src={v.link}
                  className="w-full h-48 group-hover:scale-105 transition duration-500"
                  allowFullScreen
                ></iframe>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-500">{v.duration}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* 🔥 NOTES (ONLY IF SKILL EXISTS) */}
      {skill && (
        <div className="bg-white py-20 px-6 border-t">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            📄 Study Notes & Resources
          </h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

            {skill.notes.map((note, i) => (
              <a
                key={i}
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition">
                  📘
                </div>

                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                  {note.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Well-structured notes for quick learning
                </p>

                <div className="mt-4 text-sm font-medium text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Open PDF →
                </div>

                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-indigo-400 transition"></div>
              </a>
            ))}

          </div>
        </div>
      )}
    </>
  );
}

export { Skill_Details };