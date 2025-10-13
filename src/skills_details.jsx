import React from "react";
import { Header } from "./header";
import { useParams } from "react-router-dom";
import skillsData from "./data/skill";

function Skill_Details() {
  const { skillName } = useParams();
  const skill = skillsData.skills.find((s) => s.name === skillName);

  if (!skill) return <div>Skill not found</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/2 flex justify-center">
            <img
              src={skill.image}
              alt={skill.name}
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "What is this skill?", content: skill.description },
              { title: "Why learn it?", content: "High demand, career growth, and impactful projects." },
              { title: "Prerequisites", content: "Basic computer knowledge and curiosity." },
              { title: "Learning Time", content: "3–6 months of consistent practice." }
            ].map((card, i) => (
              <div key={i} className="bg-white shadow-lg rounded-lg p-4 m-2 flex flex-col justify-between h-50">
                <h2 className="text-lg font-bold mb-6 text-center">{card.title}</h2>
                <p className="text-sm">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">📈 Learning Roadmap</h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
          {skill.roadmap.map((item, index) => (
            <div key={index} className={`mb-12 flex items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}>
              <div className="w-1/2 px-6">
                <div className={`p-6 rounded-xl shadow-lg ${item.color} text-white`}>
                  <h3 className="text-xl font-bold">{item.step}: {item.title}</h3>
                  <p className="mt-2 text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border-4 border-indigo-500 z-10"></div>
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="px-6 py-12 bg-white">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">📚 Resources to Learn {skill.name}</h2>
        <div className="grid grid-cols-4 gap-6">
          {skill.resources.map((res, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition p-3 flex flex-col">
              <img src={res.thumbnail} alt={res.title} className="rounded-lg w-full h-36 object-cover mb-3" />
              <h4 className="text-md font-bold mb-1">{res.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{res.description}</p>
              <p className="text-xs text-gray-500 mb-2">{res.type} • {res.duration}</p>
              <a href={res.link} target="_blank" rel="noopener noreferrer" className="mt-auto px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-center text-sm">Watch / Learn</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { Skill_Details };

