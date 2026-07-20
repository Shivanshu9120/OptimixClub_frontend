import { useState, useEffect } from "react";
import logo from "../assets/images/logo.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import director from "../assets/images/director.png";
import hod from "../assets/images/HOD.jpg";
import president from "../assets/images/president.jpg";
import { Link } from "react-router-dom";

export default function AboutClub() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const adminUsers = Array.isArray(data)
            ? data.filter((user) => user.role === "admin" || user.role === "superadmin")
            : data.role === "admin"
            ? [data]
            : [];
          setAdmins(adminUsers);
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 py-16 px-6 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-24 -left-36 w-96 h-96 rounded-full glow-blob-indigo blur-[120px] pointer-events-none z-0 opacity-30" />
        <div className="absolute bottom-48 -right-36 w-96 h-96 rounded-full glow-blob-amber blur-[120px] pointer-events-none z-0 opacity-20" />

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-20">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            About Our Club
          </h1>
          <p className="text-base md:text-lg text-slate-650 dark:text-slate-350 mt-4 leading-relaxed max-w-2xl mx-auto">
            Our club is a vibrant community dedicated to fostering innovation,
            teamwork, and skill development. We provide a platform where
            like-minded individuals come together to learn, grow, and contribute
            towards technological advancements.
          </p>
        </div>

        {/* Messages Section */}
        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          {/* Director Message */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col items-center flex-shrink-0">
              <img
                src={director}
                alt="Director"
                className="w-40 h-40 object-cover border-4 border-indigo-100 dark:border-slate-800 rounded-2xl shadow-sm"
              />
              <h3 className="text-base font-extrabold mt-3 text-slate-800 dark:text-slate-100 leading-tight text-center">Dr. B.K. Tripathi</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Director</p>
            </div>
            <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full">
              <span className="text-3xl text-indigo-400 dark:text-indigo-600 font-serif leading-none block mb-1">“</span>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed">
                Our club serves as a beacon of excellence, fostering creativity and leadership among students. Let's continue to innovate and inspire!
              </p>
              <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-4">Message from Director</h2>
            </div>
          </div>

          {/* HOD Message */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row-reverse items-center md:items-start gap-6 md:gap-8 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col items-center flex-shrink-0">
              <img
                src={hod}
                alt="HOD"
                className="w-40 h-40 object-cover border-4 border-indigo-100 dark:border-slate-800 rounded-2xl shadow-sm"
              />
              <h3 className="text-base font-extrabold mt-3 text-slate-800 dark:text-slate-100 leading-tight text-center">Dr. Tauseef Ahmed</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Head of Dept, IT</p>
            </div>
            <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full">
              <span className="text-3xl text-indigo-400 dark:text-indigo-600 font-serif leading-none block mb-1">“</span>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed">
                As the Head of the Department, I take pride in seeing our students actively engage in learning and collaborative growth through this club.
              </p>
              <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-4">Message from HOD</h2>
            </div>
          </div>

          {/* President Message */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 shadow-sm hover:shadow-md transition duration-300">
            <div className="flex flex-col items-center flex-shrink-0">
              <img
                src={president}
                alt="Club President"
                className="w-40 h-40 object-cover border-4 border-indigo-100 dark:border-slate-800 rounded-2xl shadow-sm"
              />
              <h3 className="text-base font-extrabold mt-3 text-slate-800 dark:text-slate-100 leading-tight text-center">Mo. Aqib</h3>
              <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider mt-0.5">Club President</p>
            </div>
            <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full">
              <span className="text-3xl text-indigo-400 dark:text-indigo-600 font-serif leading-none block mb-1">“</span>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed">
                This club is a family of learners, builders, and dreamers. Together, we strive to create an environment that fosters personal and professional growth.
              </p>
              <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-4">Message from Club President</h2>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="max-w-5xl mx-auto mt-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Math decorations on background */}
          <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-15">
            <span className="absolute top-4 left-6 text-[80px]">Σ</span>
            <span className="absolute bottom-2 right-12 text-[70px]">π</span>
          </div>

          <div className="flex-shrink-0 relative z-10">
            <img
              src={logo}
              alt="Club Logo"
              className="w-36 h-36 rounded-full border-4 border-white/20 shadow-lg object-cover"
            />
          </div>
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">🎯 Aim & Objectives</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-white/95 text-left">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                Provide a platform for members to learn and master technical skills.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                Encourage collaboration and teamwork in building projects.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                Organize tech hackathons, coding contests, and workshops.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                Contribute to technological and societal improvements.
              </li>
            </ul>
          </div>
        </div>

        {/* Club Committee Section */}
        {admins.length > 0 && (
          <div className="mt-24 max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                Team
              </span>
              <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                Club Committee
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Meet our amazing club administrators and moderators!
              </p>
            </div>

            {/* Admin Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {admins.map((admin) => (
                <div
                  key={admin._id || admin.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center hover:border-indigo-500 hover:shadow-md transition-all duration-300 group"
                >
                  <img
                    src={admin.photo && admin.photo !== "null" && admin.photo !== "undefined" ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${admin.photo}` : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>"}
                    alt={admin.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-indigo-400 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="mt-4 font-bold text-slate-800 dark:text-slate-100 text-center leading-tight">
                    {admin.name}
                  </h3>
                  <p className="text-xs text-slate-450 dark:text-slate-500 text-center truncate w-full mt-1">
                    {admin.email}
                  </p>
                  <span className="mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-950">
                    {admin.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="max-w-4xl mx-auto mt-28 text-center relative z-10">
          <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Join Our Community
          </h2>
          <p className="text-base text-slate-650 dark:text-slate-350 mt-4 leading-relaxed max-w-xl mx-auto">
            Ready to be part of something amazing? Join us today and start your journey towards innovation and growth.
          </p>
          <Link to="/contact">
            <button className="mt-8 px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500 text-white font-bold text-sm rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-indigo-500/25">
              Contact Us to Join
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}