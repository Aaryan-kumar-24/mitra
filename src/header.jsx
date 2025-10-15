import logo from "./image/logo.jpg";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get current path

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        document.querySelectorAll(".profile-card").forEach((card, i) => {
          card.classList.add("visible");
          card.style.animationDelay = `${0.2 + i * 0.2}s`;
        });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.querySelectorAll(".profile-card").forEach((card) => {
        card.classList.remove("visible");
      });
    }
  }, [open]);

  const getButtonClasses = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
      location.pathname === path
        ? "text-white bg-sky-500 shadow-lg"
        : "text-sky-800 hover:text-white hover:bg-sky-500 hover:shadow-lg"
    }`;

  return (
    <>
      <div className="flex items-center justify-evenly flex-wrap gap-4 bg-white p-1 shadow">
        <div className="logo-container flex items-center gap-2">
          <img src={logo} className="Logo w-12 h-12 rounded-full" />
          <div className="logo-title text-sky-700">Aryavarta Mitra</div>
        </div>

        <Link to={"/"}>
          <button className={getButtonClasses("/")}>
            <i className="fas fa-home"></i> Home
          </button>
        </Link>

        <Link to={"/pg"}>
          <button className={getButtonClasses("/pg")}>
            <i className="fas fa-building"></i> PG Nearby
          </button>
        </Link>

        <Link to={"/shops"}>
          <button className={getButtonClasses("/shops")}>
            <i className="fas fa-store"></i> Shops Nearby
          </button>
        </Link>

        <Link to={"/Skills"}>
          <button className={getButtonClasses("/Skills")}>
            <i className="fas fa-lightbulb"></i> Skills
          </button>
        </Link>

        <Link to={"/Notes"}>
          <button className={getButtonClasses("/Notes")}>
            <i className="fas fa-book"></i> Notes
          </button>
        </Link>

        <button
          onClick={() => setOpen(true)}
          className={getButtonClasses("/account")}
        >
          <i className="fas fa-user"></i> Account
        </button>
      </div>

      <div>
        {/* Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Offcanvas Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-[370px] bg-white/70 backdrop-blur-lg text-green-900 border-l-4 shadow-xl rounded-l-xl z-50 transform transition-transform duration-500 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-lg font-semibold flex ml-[120px] items-center gap-2">
              <i className="bi bi-person-badge-fill"></i> Your Profile
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-gray-900 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 overflow-y-auto h-full">
            {/* Profile Cards */}
            <div className="profile-card">
              <i className="bi bi-person-fill icon-green"></i>
              <div className="info-text">
                <div className="info-label">Username</div>
                <div className="info-value">Aryan Kumar</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-envelope-fill icon-blue"></i>
              <div className="info-text">
                <div className="info-label">Email</div>
                <div className="info-value">aryan@example.com</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-telephone-fill icon-orange"></i>
              <div className="info-text">
                <div className="info-label">Phone</div>
                <div className="info-value">+91 9876543210</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-person-vcard-fill icon-purple"></i>
              <div className="info-text">
                <div className="info-label">Role</div>
                <div className="info-value">Student</div>
              </div>
            </div>

            <div className="profile-card">
              <i className="bi bi-shield-lock-fill icon-red"></i>
              <div className="info-text">
                <div className="info-label">Access Level</div>
                <div className="info-value">Student</div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="text-center mt-6">
              <Link to={"/Login_signup"}>
                <button className="logout-btn flex items-center justify-center gap-2">
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Extra CSS for animations */}
      <style>{`
        .profile-card { display: flex; align-items: center; background: white; border-radius: 12px; margin-bottom: 15px; padding: 1rem; box-shadow: 0 4px 12px rgba(188, 188, 188, 0.78); transform: translateY(20px); opacity: 0; transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .profile-card.visible { animation: fadeSlideIn 0.6s ease forwards; background-color: rgba(244, 238, 238, 0.32); }
        .profile-card:hover { transform: scale(1.03); box-shadow: 0 6px 16px rgba(0,0,0,0.12); }
        @keyframes fadeSlideIn { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .profile-card i { font-size: 1.7rem; margin-right: 15px; padding: 10px; border-radius: 50%; width: 45px; height: 45px; text-align: center; line-height: 25px; color: white; }
        .icon-green { background: linear-gradient(45deg, #66bb6a, #388e3c); }
        .icon-blue { background: linear-gradient(45deg, #42a5f5, #1e88e5); }
        .icon-orange { background: linear-gradient(45deg, #ffa726, #fb8c00); }
        .icon-purple { background: linear-gradient(45deg, #ab47bc, #8e24aa); }
        .icon-red { background: linear-gradient(45deg, #ef5350, #c62828); }
        .info-text { flex: 1; }
        .info-label { font-weight: bold; font-size: 0.9rem; color: #444; }
        .info-value { font-size: 1rem; color: #2e7d32; }
        .logout-btn { display: inline-block; padding: 10px 18px; font-size: 0.9rem; font-weight: 600; color: white; background: linear-gradient(135deg, #ff1744, #d50000); border: none; border-radius: 50px; transition: all 0.4s ease; opacity: 0; animation: fadeIn 1.6s ease forwards; animation-delay: 1.4s; }
        .logout-btn:hover { transform: scale(1.05); background: linear-gradient(135deg, #ff5252, #b71c1c); box-shadow: 0 4px 10px rgba(255, 0, 0, 0.3); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}

export { Header };
