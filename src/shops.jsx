import './App.css';
import { shopsList } from "./data/shop_data";
import { useEffect, useState } from "react";

import {Header} from "./header";
import fab_location from "./image/fab_location.jpg";

function Shops() {
  const texts = [
    "Find the best Shops near you ",
    "Compare price , Distance , Items 💰",
    "Find Best Timing ,  price , Distance ",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((index + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts]);

  const filteredList = shopsList.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.distance.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    
        <Header/>
      {/* Search Box */}
      <div className="flex w-[600px] p-[40px]">
        <div className="flex w-full max-w-md md:max-w-lg lg:max-w-2xl items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={text || "Search Shops..."}
            className="pl-[60px] pr-4 focus:outline-none focus:border-sky-100 focus:ring-sky-100 focus:ring-1 
                       w-full border-[2px] h-[45px] rounded-2xl placeholder:italic"
          />
          <button className="flex absolute ml-[470px] items-center gap-2 px-4 h-[45px] bg-sky-200 hover:bg-sky-400 
                       text-white font-medium rounded-e-2xl  transition-all duration-300">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <h1 className="font-medium font-serif ml-[45px] text-[1.52rem] italic">Nearby Shops</h1>

      {filteredList.length > 0 ? (
        filteredList.map((shop, i) => <ShopsCard key={i} data={shop} />)
      ) : (
        <p className="ml-[50px] text-gray-500">No shops found...</p>
      )}
    </>
  );
}

function ShopsCard({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Main Card */}
      <div className="inline-block bg-base-100 w-[300px] shadow-lg rounded-2xl ml-[50px] m-[20px] gap-[20px] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <div className="head">
          <img className="rounded-xl h-[300px] w-[300px] bg-cover p-1" src={data.image} alt={data.name} />
        </div>
        <div className="body">
          <div className="row1 w-[290px] mt-[5px] h-[40px] flex">
            <div className="pg_name w-[200px] font-serif text-[1.5rem] text-gray-700 font-semibold pl-[10px]">
              {data.name}
            </div>
            <div className="pg_distance pl-[30px] font-sans font-[320] w-[90px] mt-[5px]">
              <div className="text-gray-400 font-semibold text-[0.85rem] pl-[10px]">{data.distance}</div>
              <div className="text-[0.56rem] font-serif text-gray-400 font-semibold">from college</div>
            </div>
          </div>

          <div className="row2 font-[320] text-[0.9rem] w-[300px] h-[25px] pb-[5px] flex place-content-evenly mt-[6px] items-center">
            <div className="shop_timing flex items-center gap-1">
              <i className="fas fa-clock text-emerald-500"></i>
              {data.timing}
            </div>
            <div className="shop_items flex items-center gap-1">
              <i className="fas fa-shopping-basket text-sky-500"></i>
              {data.category}
            </div>
            <div className="shop_rating flex items-center gap-1">
              {data.rating} <i className="fas fa-star text-amber-400"></i>
            </div>
          </div>

          <div className="row3 flex gap-[10px] p-[5px] h-[60px] ml-[5px]">
            <button className="text-sky-600 bg-sky-100 p-[6px] rounded-xl h-[40px] text-[1rem] w-[140px]">
              <i className="fa-solid fa-phone-volume text-sky-700 mr-1"></i> {data.phone}
            </button>
            <button onClick={() => setOpen(true)} className="text-sky-600 bg-sky-100 p-[6px] rounded-xl h-[40px] text-[1rem] w-[130px]">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setOpen(false)}>
          <div className="bg-white w-[700px] shadow-2xl rounded-2xl p-4 relative flex gap-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-black">✕</button>
            <div className="flex-shrink-0">
              <img className="rounded-xl h-[300px] w-[250px] object-cover" src={fab_location} alt={data.name} />
              <div className="mt-[10px]">
                <div className="font-bold">Location</div>
                <div className="text-sky-600">{data.location}</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[400px] pr-2">
              <div className="mb-[12px]">
                <div className="font-bold">About</div>
                <div className="text-slate-600">{data.about}</div>
              </div>
              <div className="mb-[12px]">
                <div className="font-bold">Notes</div>
                <div className="text-slate-600">{data.notes}</div>
              </div>
              <div>
                <div className="font-bold mb-[6px]">Popular for Students</div>
                <div className="flex flex-wrap gap-[8px]">
                  {data.popular.map((item, i) => (
                    <button key={i} className="h-[32px] text-sky-600 bg-sky-50 rounded-xl px-[10px] text-[0.8rem] flex items-center gap-2">
                      <i className={`fa-solid ${item.icon}`}></i> {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Shops };
