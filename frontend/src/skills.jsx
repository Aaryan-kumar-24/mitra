import { Header } from "./header";
import { Link } from "react-router-dom";
import skillsData from "./data/skill";

function Skills() {
  return (
    <>
      <Header />
      <h1 className="font-bold font-serif text-center mt-10 text-3xl italic text-gray-800">
        🚀 Trending Skills
      </h1>
      <div className="skills w-[1400px] ml-[50px] mb-[200px] flex flex-wrap gap-[60px] px-12 mt-10">
        {skillsData.skills.map((skill, index) => (
          <Link key={index} to={`/skill_details/${skill.name}`}>
            <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <img
                src={skill.image}
                alt={skill.name}
                className="h-[280px] w-[280px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h2 className="text-xl font-semibold drop-shadow-lg">
                  {skill.name}
                </h2>
                <p className="text-sm opacity-90 mt-1">
                  {skill.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export { Skills };
