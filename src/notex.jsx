import { useState } from "react";
import { Header } from "./header";
import notesData from "./data/notes";

function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // category state

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
      <Header />

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
