import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

/* ─── helper: smooth scroll or navigate to home + anchor ─── */
const useScrollLink = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (anchor) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const el = document.getElementById(anchor.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/${anchor}`);
    }
  };
};

/* ─── Navigation links (anchor based) ─── */
const NAV_LINKS = [
  { label: "Home",        anchor: "#hero" },
  { label: "Events",      anchor: "#events" },
  { label: "Gallery",     anchor: "#gallery" },
  { label: "Notice Board",anchor: "#noticeboard" },
  { label: "FAQ",         anchor: "#faq" },
  { label: "Contact",     anchor: "#contact" },
];

const DASHBOARD_TITLES = {
  "/admin-dashboard": { title: "Overview", desc: "Welcome back! Manage your club settings from here." },
  "/admin-dashboard/events": { title: "Manage Events", desc: "Create and manage your club events." },
  "/admin-dashboard/notices": { title: "Manage Notices", desc: "Create and manage your official notice updates." },
  "/admin-dashboard/gallery": { title: "Event Gallery", desc: "Upload and manage event images in the gallery." },
  "/admin-dashboard/testimonials": { title: "Testimonials Management", desc: "Review and approve testimonials submitted by club members." },
  "/admin-dashboard/users": { title: "Users List", desc: "View and manage all registered users in the platform." },
  "/admin-dashboard/registrations": { title: "All Registrations", desc: "Approve, reject, and manage student event registrations." },
  "/admin-dashboard/event-registrations": { title: "Event Registrations", desc: "Browse approved registrations grouped by event card view." },
  "/admin-dashboard/messages": { title: "Contact Messages", desc: "Read feedback, messages, and queries sent by students and visitors." },
  "/user-dashboard": { title: "My Profile", desc: "View and manage your account details and club activity." },
  "/user-dashboard/events": { title: "Upcoming Events", desc: "Browse scheduled club events and register to join." },
  "/user-dashboard/registrations": { title: "My Registrations", desc: "Track the approval status of your event registrations." },
  "/user-dashboard/testimonial": { title: "Submit Testimonial", desc: "Share your experience in the club." }
};

const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const role   = localStorage.getItem("role");
  const photo  = localStorage.getItem("photo");
  const userName = localStorage.getItem("name");
  const token  = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const handleScroll = useScrollLink();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("photo");
    localStorage.removeItem("name");
    navigate("/login");
  };

  /* ── Common link classes ── */
  const navLinkClass =
    "text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm tracking-wide transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/40 cursor-pointer";

  const isDashboard = location.pathname.includes("dashboard") || location.pathname.includes("form") || location.pathname.includes("list") || location.pathname.includes("users");

  /* ──────────────────────────────────────────────────────────
     1. COMPACT NAVBAR: Rendered on dashboard/admin pages for logged in users
   ────────────────────────────────────────────────────────── */
  if (token && isDashboard) {
    const matchedPath = Object.keys(DASHBOARD_TITLES).find(path => location.pathname === path);
    const pageTitle = matchedPath ? DASHBOARD_TITLES[matchedPath].title : "OPTIMIX CLUB";
    const pageDesc = matchedPath ? DASHBOARD_TITLES[matchedPath].desc : "";

    return (
      <nav className="sticky top-0 z-40 shadow-sm px-6 py-3.5 border-b border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md bg-white/80 dark:bg-slate-950/70 transition-colors duration-300">
        <div className="max-w-full mx-auto flex justify-between items-center">
          {/* Header titles */}
          <div className="flex flex-col ml-12 md:ml-0">
            <h1 className="text-slate-900 dark:text-white text-base md:text-lg font-black tracking-tight leading-tight flex items-center">
              {pageTitle}
            </h1>
            {pageDesc && (
              <p className="text-[10px] md:text-xs text-slate-450 dark:text-slate-500 font-medium hidden sm:block mt-0.5">
                {pageDesc}
              </p>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition duration-200"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 px-3.5 py-1.5 rounded-full font-semibold text-xs transition-all duration-200"
            >
              Logout
            </button>

            {userName && (
              <img
                src={photo && photo !== "null" && photo !== "undefined" ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${photo}` : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>"}
                alt="Profile"
                className="h-8 w-8 rounded-full border-2 border-indigo-500 hover:scale-105 shadow-sm transition-transform cursor-pointer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>";
                }}
                onClick={() =>
                  navigate(
                    role === "admin" || role === "superadmin"
                      ? "/admin-dashboard"
                      : "/user-dashboard"
                  )
                }
              />
            )}
          </div>
        </div>
      </nav>
    );
  }

  /* ──────────────────────────────────────────────────────────
     2. FULL NAVBAR: Rendered on public pages (Home, About, Contact, etc.)
  ────────────────────────────────────────────────────────── */
  return (
    <nav className="sticky top-0 z-50 shadow-md px-6 py-3.5 border-b border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md bg-white/70 dark:bg-slate-950/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="#hero"
          onClick={handleScroll("#hero")}
          className="flex items-center space-x-2.5 transition hover:opacity-90 duration-200"
        >
          <img
            src={logo}
            alt="logo"
            className="h-9 w-9 rounded-full border border-indigo-100 dark:border-slate-800/70 shadow-sm"
          />
          <span className="text-slate-900 dark:text-white text-xl font-black tracking-tight">
            OPTIMIX CLUB
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {NAV_LINKS.map(({ label, anchor }) => (
            <a
              key={anchor}
              href={anchor}
              onClick={handleScroll(anchor)}
              className={navLinkClass}
            >
              {label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 ml-2 text-slate-500 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition duration-200 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Logged in vs Logged out action buttons */}
          {token ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <Link
                to={role === "admin" || role === "superadmin" ? "/admin-dashboard" : "/user-dashboard"}
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 px-3.5 py-2 rounded-full font-semibold text-xs transition-all duration-200"
              >
                Logout
              </button>
              {token && (
                <img
                  src={photo && photo !== "null" && photo !== "undefined" ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${photo}` : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full border-2 border-indigo-500 hover:scale-105 shadow-sm transition-transform cursor-pointer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>";
                  }}
                  onClick={() =>
                    navigate(
                      role === "admin" || role === "superadmin"
                        ? "/admin-dashboard"
                        : "/user-dashboard"
                    )
                  }
                />
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-2 bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 px-5 py-2 rounded-full font-semibold text-xs tracking-wide transition-all shadow-sm hover:shadow-indigo-500/20 hover:shadow-md"
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white focus:outline-none p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute left-4 right-4 top-16 bg-white/95 dark:bg-slate-900/90 backdrop-blur-lg border border-slate-200/80 dark:border-slate-800/80 shadow-2xl rounded-2xl flex flex-col p-5 space-y-2.5 z-50 md:hidden animate-scaleIn">
          {NAV_LINKS.map(({ label, anchor }) => (
            <a
              key={anchor}
              href={anchor}
              onClick={(e) => { handleScroll(anchor)(e); setIsOpen(false); }}
              className="text-slate-700 dark:text-slate-200 font-semibold text-sm tracking-wide hover:bg-slate-50 dark:hover:bg-slate-800/40 py-2 px-3.5 rounded-xl transition-all"
            >
              {label}
            </a>
          ))}

          <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition duration-200"
            >
              {darkMode ? "🌙 Night" : "☀️ Day"}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {token ? (
              <div className="flex flex-col gap-2">
                <Link
                  to={role === "admin" || role === "superadmin" ? "/admin-dashboard" : "/user-dashboard"}
                  className="block w-full text-center bg-indigo-600 text-white hover:bg-indigo-700 py-2.5 rounded-xl font-semibold text-sm tracking-wide shadow-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="block w-full text-center text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full text-center bg-indigo-600 text-white hover:bg-indigo-700 py-2.5 rounded-xl font-semibold text-sm tracking-wide shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
