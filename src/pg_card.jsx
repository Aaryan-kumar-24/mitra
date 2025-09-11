import './App.css';
import { pgList } from './data/pg_data';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Pg() {
  const texts = [
    "Find the best PG near you 🏠",
    "Compare rent & facilities 💰",
    "Discover student-friendly options 🎓",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // NEW: search state
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

  // Filter PG list based on search term
  const filteredList = pgList.filter((pg) =>
    pg.name.toLowerCase().includes(searchTerm.toLowerCase())||pg.price.toLowerCase().includes(searchTerm.toLowerCase())||pg.distance.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex w-[600px] p-[40px]">
        <div className="flex w-full max-w-md md:max-w-lg lg:max-w-2xl items-center gap-2">
          {/* Controlled Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={text || "Search PG..."}
            className="pl-[60px] pr-4 focus:outline-none focus:border-sky-100 focus:ring-sky-100 focus:ring-1 
                       w-full border-[2px] h-[45px] rounded-2xl placeholder:italic"
          />
          {/* Search Button (optional, not required since live search works) */}
          <button
            className="flex absolute ml-[470px] items-center gap-2 px-4 h-[45px] bg-sky-200 hover:bg-sky-400 
                       text-white font-medium rounded-e-2xl  transition-all duration-300"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <h1 className="font-medium font-serif ml-[45px] text-[1.52rem] italic">Nearby PG</h1>

      {filteredList.length > 0 ? (
        filteredList.map((data, i) => <Pgcard key={i} data={data} />)
      ) : (
        <p className="ml-[50px] text-gray-500">Radhe Radhe Sab bhagwan pee chor doo</p>
      )}
    </>
  );
}

function Pgcard({ data }) {
  let [state, change] = useState(false);

  return (
    <div
      onMouseOver={() => change(true)}
      onMouseLeave={() => change(false)}
      className="inline-block bg-base-100 w-[300px] shadow-lg rounded-2xl ml-[50px] m-[20px] gap-[20px] hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      {state && (
        
        <button
          className="flex items-center view pl-[8px] pe-[8px] ml-[8px] mt-[6px] gap-2 text-[0.85rem] h-[30px] px-3 text-sky-600 bg-sky-50 rounded-lg"
        >
          <i className="fas fa-eye"></i>
          
<Link to={`/${data.id}`}>
  More
</Link>

        </button>
      )}
      <div className="head">
        <img
          className="rounded-xl h-[300px] w-[300px] bg-cover p-1"
          src={data.image}
        />
      </div>
      <div className="body">
        <div className="row1 w-[290px] mt-[5px] h-[40px] flex">
          <div className="pg_name w-[200px] font-serif text-[1.5rem] text-gray-700 font-semibold pl-[10px]">
            {data.name}
          </div>
          <div className="pg_distance pl-[30px] font-sans font-[320] w-[90px] mt-[5px]">
            <div className="pg_distance h-[15px] text-gray-400 font-semibold text-[0.85rem] pl-[10px]">
              {data.distance}
            </div>
            <div className="pg_distance h-[10px] text-[0.56rem] font-serif w-[90px] text-gray-400 font-semibold">
              from college
            </div>
          </div>
        </div>
        <div className="row2 font-[320] text-[0.94rem] w-[300px] h-[25px] pb-[5px] flex place-content-evenly mt-[6px] items-center">
          {/* Rent / Price */}
          <div className="pg_price h-[10px] flex items-center gap-1">
            <i className="fa-solid fa-indian-rupee-sign text-emerald-500"></i>{" "}
            {data.price}
          </div>

          {/* Room Sharing */}
          <div className="pg_sharing h-[10px] flex items-center gap-1">
            <i className="fas fa-bed text-indigo-500"></i>
            {data.sharing}
          </div>

          {/* Ratings */}
          <div className="pg_rating h-[10px] flex items-center gap-1">
            <i className="fas fa-star text-amber-400"></i>
            {data.rating}
          </div>
        </div>

        <div className="row3 w-[300px] flex-wrap ml-[10px] p-[5px] h-[90px] gap-[10px] flex">
          <button className="h-[30px] text-sky-600 bg-sky-50 rounded-xl pl-[8px] pr-[8px] mr-[10px] text-[0.8rem]">
            <i className="fas fa-video"></i> {data.amenities[0]}
          </button>
          <button className="h-[30px] text-sky-600 bg-sky-50 rounded-xl pl-[8px] pr-[8px] mr-[10px] text-[0.8rem]">
            <i className="fas fa-wifi"></i> {data.amenities[1]}
          </button>
          <button className="h-[30px] text-sky-600 bg-sky-50 rounded-xl pl-[8px] pr-[8px] mr-[10px] text-[0.8rem]">
            <i className="fas fa-tshirt"></i> {data.amenities[2]}
          </button>
          <button className="h-[30px] text-sky-600 bg-sky-50 rounded-xl pl-[8px] pr-[8px] mr-[10px] text-[0.8rem]">
            <i className="fas fa-leaf"></i> {data.amenities[3]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pg;
