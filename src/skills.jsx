import { Header } from "./header";

function Skills() {
  const skillsData = [
    {
      name: "Web Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      description: "Build responsive websites using HTML, CSS, JS, and frameworks.",
    },
    {
      name: "Artificial Intelligence",
      image:
        "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
      description: "Explore ML, deep learning, and modern AI tools.",
    },
    {
      name: "Cloud Computing",
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80",
      description: "Deploy and scale applications on AWS, Azure, and GCP.",
    },
    {
      name: "Database Management",
      image:
        "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
      description: "Design schemas, optimize queries, and ensure data integrity.",
    },    {
      name: "Web Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      description: "Build responsive websites using HTML, CSS, JS, and frameworks.",
    },
    {
      name: "Artificial Intelligence",
      image:
        "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
      description: "Explore ML, deep learning, and modern AI tools.",
    },
    {
      name: "Cloud Computing",
      image:
        "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80",
      description: "Deploy and scale applications on AWS, Azure, and GCP.",
    },
    {
      name: "Database Management",
      image:
        "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
      description: "Design schemas, optimize queries, and ensure data integrity.",
    },
  ];

  return (
    <>
      <Header />

      <h1 className="font-bold font-serif text-center mt-10 text-3xl italic text-gray-800">
        🚀 Trending Skills
      </h1>

      <div className="skills w-[1400px] ml-[50px] flex flex-wrap gap-[60px] px-12 mt-10">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Background Image */}
            <img
              src={skill.image}
              alt={skill.name}
              className="h-[280px] w-[280px]  object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

            {/* Text Content */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h2 className="text-xl font-semibold drop-shadow-lg">{skill.name}</h2>
              <p className="text-sm opacity-90 mt-1">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export { Skills };
