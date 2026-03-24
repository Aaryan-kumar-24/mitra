// src/Footer.jsx

import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="mt-20 relative">

        {/* 🌊 TOP GRADIENT LINE */}
        <div className="h-[4px] bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-400"></div>

        {/* 💎 MAIN GLASS FOOTER */}
        <div className="bg-white/70 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">

          <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* 🧠 ABOUT */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Aryavarta Mitra
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                A smart student platform to find PGs, shops, skills, projects,
                and campus tools — all in one place.
              </p>
            </div>

            {/* 🔗 QUICK LINKS */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Links
              </h3>

              <div className="flex flex-col gap-2 text-gray-600 text-sm">
                <Link to="/" className="hover:text-sky-500 transition">Home</Link>
                <Link to="/pg" className="hover:text-sky-500 transition">PG Nearby</Link>
                <Link to="/shops" className="hover:text-sky-500 transition">Shops</Link>
                <Link to="/Skills" className="hover:text-sky-500 transition">Skills</Link>
                <Link to="/Notes" className="hover:text-sky-500 transition">Notes</Link>
              </div>
            </div>

            {/* 📞 CONTACT */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Contact
              </h3>

              <div className="text-gray-600 text-sm space-y-2">
                <p>📍 India</p>
                <p>📞 +91 XXXXXXXX</p>
                <p>✉️ support@aryavarta.com</p>
              </div>
            </div>

            {/* 🚀 SOCIAL + CTA */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Stay Connected
              </h3>

              <div className="flex gap-4 mb-4">

                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-100 hover:bg-sky-400 hover:text-white transition">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a href="https://www.instagram.com/_aaryan__24/" className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-500 hover:text-white transition">
                  <i className="fab fa-instagram"></i>
                </a>

                <a href="https://youtube.com/@aryavarta_twinbro" className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-500 hover:text-white transition">
                  <i className="fab fa-youtube"></i>
                </a>

              </div>

              {/* CTA */}
              <button className="mt-2 bg-gradient-to-r from-sky-400 to-cyan-500 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition">
                Join Community 🚀
              </button>
            </div>

          </div>

          {/* 🔽 BOTTOM */}
          <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
            © 2026 Aryavarta Mitra · Made with ❤️ for Students
          </div>

        </div>
      </footer>
    </>
  );
}

export { Footer };