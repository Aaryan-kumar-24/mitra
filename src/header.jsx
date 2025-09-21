import logo from "./image/logo.jpg";

import { Link } from 'react-router-dom';
function Header() {
  return (
    <> 
     <div className="flex items-center justify-evenly flex-wrap gap-4 bg-white p-1 shadow ">

        <div class="logo-container">
      <img src={logo} className="Logo"></img>

      <div class="logo-title">Aryavarta Mitra</div>
    </div>
     <Link to={"/"}>
  <button className="flex items-center gap-2 px-4 py-2 rounded-lg  text-sky-800 font-semibold  transition-all duration-300 hover:text-white hover:bg-sky-500 hover:shadow-lg">
    <i className="fas fa-home"></i>
  
Home
  </button>
  </Link>
  <Link to={"/pg"}> 
  <button className="flex items-center gap-2 px-4 py-2 rounded-lg  text-sky-800 font-semibold  transition-all duration-300 hover:text-white hover:bg-sky-500 hover:shadow-lg">
   <i className="fas fa-building"></i>PG Nearby
  </button>
  </Link>
<Link to={"/shops"}> 
  <button className="flex items-center gap-2 px-4 py-2 rounded-lg  text-sky-800 font-semibold  transition-all duration-300 hover:text-white hover:bg-sky-500 hover:shadow-lg">
   <i className="fas fa-store"></i>Shops Nearby
  </button>
   </Link>
  <Link to={"/Skills"}>
  <button className="flex items-center gap-2 px-4 py-2 rounded-lg  text-sky-800 font-semibold  transition-all duration-300 hover:text-white hover:bg-sky-500 hover:shadow-lg">
  <i className="fas fa-lightbulb"></i> Skills
  </button>
  </Link>
  <Link to={"/Notes"}>
  <button className="flex items-center gap-2 px-4 py-2 rounded-lg  text-sky-800 font-semibold  transition-all duration-300 hover:text-white hover:bg-sky-500 hover:shadow-lg">
   <i className="fas fa-book"></i> Notes
  </button>
   </Link>
   <Link to={"/Accounts"}>
  <button className="flex items-center gap-2 px-4 py-2 rounded-lg  text-sky-800 font-semibold  transition-all duration-300 hover:text-white hover:bg-sky-500 hover:shadow-lg">
   <i className="fas fa-user"></i> account
  </button>
   </Link>


</div>
</>

  );
}

export { Header };
