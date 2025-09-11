import { useParams } from "react-router-dom";
import { pgList } from "./data/pg_data";
import aryan from "./image/aryan.jpg";
import fab_location from "./image/fab_location.jpg";

function Pg_card_details() {
  const { id } = useParams();
  const pg = pgList.find((p) => p.id === parseInt(id));

  if (!pg) return <h1 className="text-center mt-10">PG Not Found</h1>;

  return (
    <>
      <div className="flex mt-4">
        <h1 className="font-medium font-sans ml-[30px] text-[1.8rem] italic">
          {pg.name}
        </h1>
        <button className="h-[30px] text-slate-600 bg-slate-200 rounded-xl pl-[8px] mt-[10px] ml-[20px] pr-[8px] mr-[10px] text-[0.8rem]">
          <i className="fas fa-location text-slate-500"></i> {pg.overview.distance}
        </button>
      </div>

      {/* Images */}
      <div className="images flex gap-2 m-[25px] ">
        <img
          src={pg.images.main}
          className="column1 bg-slate-400 h-[500px] w-[700px] ml-[20px]  rounded-xl"
          alt="Main"
        />
        <div className="column2 w-[350px] h-[498px] ">
          <img src={pg.images.img1} className="row1 w-[350px] mb-[10px] bg-slate-400 h-[245px] rounded-xl" alt="" />
          <img src={pg.images.img2} className="row2 w-[350px] bg-slate-400 h-[245px] rounded-xl" alt="" />
        </div>
        <div className="column3 w-[350px] h-[498px] ">
          <img src={pg.images.img3} className="row1 w-[350px] mb-[10px] bg-slate-400 h-[245px] rounded-xl" alt="" />
          <img src={pg.images.img4} className="row2 w-[350px] bg-slate-400 h-[245px] rounded-xl" alt="" />
        </div>
      </div>

      <div className="details flex gap-3 ml-[20px] mb-[200px] ">
        {/* Left Column */}
        <div className="c1 w-[950px]">
          {/* Overview */}
          <div className="overview w-[950px] bg-sky-100 text-slate-400 p-[20px] text-[1.1rem] font-mono mb-[20px] rounded-xl">
            <h2 className="text-[1.4rem] font-semibold text-sky-500 mb-[30px]">Overview</h2>
            <ul className="list-disc ml-6 leading-7">
              <div className="flex">
                <div className="me-[200px] mb-[10px] text-sky-500 font-bold">Food Type</div> {pg.overview.foodType}
              </div>
              <div className="flex">
                <div className="me-[250px] mb-[10px] text-sky-500 font-bold">Rent</div> {pg.overview.rent}
              </div>
              <div className="flex">
                <div className="me-[210px] mb-[10px] text-sky-500 font-bold">Distance</div> {pg.overview.distance}
              </div>
              <div className="flex">
                <div className="me-[140px] mb-[10px] text-sky-500 font-bold">Sharing Options</div> {pg.overview.sharing}
              </div>
            </ul>
          </div>

          {/* Weekly Menu */}
          <div className="menu w-[950px] bg-sky-100 text-sky-500 p-[20px] text-[1.1rem] font-mono mb-[20px] rounded-xl overflow-y-auto h-[465px]">
            <h2 className="text-[1.4rem] font-semibold mb-[30px]">Weekly Menu</h2>
            <table className="w-full border-collapse border border-sky-400 text-center">
              <thead>
                <tr className="bg-sky-200">
                  <th className="border border-sky-400 p-2">Day</th>
                  <th className="border border-sky-400 p-2">Breakfast</th>
                  <th className="border border-sky-400 p-2">Lunch</th>
                  <th className="border border-sky-400 p-2">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(pg.weeklyMenu).map(([day, meals]) => (
                  <tr key={day}>
                    <td className="border border-sky-400 p-2">{day}</td>
                    <td className="border text-slate-400 border-sky-400 p-2">{meals.breakfast}</td>
                    <td className="border text-slate-400 border-sky-400 p-2">{meals.lunch}</td>
                    <td className="border text-slate-400 border-sky-400 p-2">{meals.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amenities */}
          <div className="amenities w-[950px] bg-sky-100 text-sky-500 p-[20px] text-[1.1rem] font-mono mb-[20px] rounded-xl">
            <h2 className="text-[1.4rem] font-semibold mb-[30px]">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {pg.amenities.map((amenity, idx) => (
                <button key={idx} className="h-[35px] text-sky-600 bg-sky-50 rounded-xl px-3 text-[0.9rem] flex items-center gap-2 shadow-sm hover:bg-sky-200">
                  <i className="fas fa-check-circle"></i> {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="room w-[950px] bg-sky-100 text-sky-500 p-[20px] text-[1.1rem] font-mono mb-[10px] rounded-xl">
            <h2 className="text-[1.4rem] font-semibold mb-[30px]">Room Types</h2>
            <ul className="list-disc ml-6 leading-7">
              {pg.roomTypes.map((room, idx) => (
                <div key={idx} className="flex font-bold mb-[10px]">
                  {room.type} ->{" "}
                  <div className="ml-[20px] text-slate-400">{room.desc}</div>
                </div>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="c1 w-[480px] ml-[10px] text-sky-500 h-[1000px]">
          {/* Contact */}
          <div className="c1 w-[480px] bg-sky-100 p-[16px] text-[1.6rem] font-mono mb-[20px] h-[180px] rounded-xl">
            <h1 className="mb-[16px]">Contact</h1>
            <button className="bg-green-500 text-white p-[6px] rounded-xl w-[350px]">
              <i className="fa-solid fa-phone-volume text-white text-xl mr-2"></i> {pg.contact.phone}
            </button>
            <h1 className="mt-[10px] text-slate-400">Owner : {pg.contact.owner}</h1>
          </div>

          {/* Current Students */}
          <div className="c1 w-[480px] bg-sky-100 p-[20px] text-[1.6rem] font-mono mb-[20px] h-[450px] rounded-xl">
            <h1 className="mb-[16px]">Current Students</h1>
            {pg.students.map((s, idx) => (
              <div key={idx} className="student flex h-[100px] w-[420px] ml-[10px] mb-[20px] rounded-lg bg-sky-50">
                <img src={aryan} className="student_image h-[80px] w-[80px] rounded-full m-[10px]" alt="student" />
                <div className="student_details w-[300px] mt-[5px]">
                  <div className="student_name w-[280px] h-[30px] m-[5px] text-slate-700">{s.name}</div>
                  <div className="student_name w-[300px] h-[30px] flex m-[5px] mt-[10px] text-slate-700">
                    <button className="bg-green-500 text-white p-[4px] rounded-xl text-[1rem] w-[180px]">
                      <i className="fa-solid fa-phone-volume text-white text-[1rem] mr-1"></i> {s.phone}
                    </button>
                    <div className="student_name h-[30px] w-[100px] m-[5px] text-slate-700 text-[1rem]">{s.semester}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="c1 w-[480px] bg-sky-100 p-[20px] text-[1.2rem] font-mono mb-[10px] h-[500px] rounded-xl">
            <h1 className="mb-[16px] text-[1.6rem]">
              <i className="fas fa-location text-sky-500"></i> Location
            </h1>
            <img src={fab_location} className="ml-[35px] w-[380px] h-[380px] bg-slate-400" alt="map" />
          </div>
        </div>
      </div>
    </>
  );
}

export { Pg_card_details };
