import React, { useState, useEffect } from "react";

const SECTIONS = [
  { id: "hero",          label: "Home" },
  { id: "events",        label: "Events" },
  { id: "gallery",       label: "Gallery" },
  { id: "testimonials",  label: "Testimonials" },
  { id: "noticeboard",   label: "Notice Board" },
  { id: "faq",           label: "FAQ" },
  { id: "contact",       label: "Contact" }
];

const SideScrollNav = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-full shadow-lg transition-all duration-300">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            onClick={scrollTo(sec.id)}
            className="group relative flex items-center justify-center w-3.5 h-3.5"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Tooltip */}
            <span className="absolute right-7 px-2.5 py-1 bg-slate-900/90 dark:bg-slate-800/90 text-white dark:text-slate-100 text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 shadow-md whitespace-nowrap">
              {sec.label}
            </span>

            {/* Indicator Dot */}
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "w-3.5 h-3.5 bg-indigo-600 dark:bg-indigo-400 scale-110 shadow-md shadow-indigo-500/30"
                  : "w-2 h-2 bg-slate-400 dark:bg-slate-600 hover:bg-slate-600 dark:hover:bg-slate-400 group-hover:scale-125"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SideScrollNav;
