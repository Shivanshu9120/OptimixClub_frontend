import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';
import { CardSkeleton } from './SkeletonLoader';

const EventBoard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setLoading(false);
      });
  }, []);

  const scrollLeft = () => eventRef.current.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () => eventRef.current.scrollBy({ left: 320, behavior: "smooth" });

  return (
    /* Light: pure white section bg + cream cards. Dark: deep slate with indigo glow */
    <div className="relative overflow-hidden bg-white dark:bg-slate-950 py-20 px-6 border-b border-slate-100/80 dark:border-slate-900 transition-colors duration-300">

      {/* ── Math Decoration Layer ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        {/* Grid lines pattern */}
        <div className="absolute inset-0 math-grid" />
        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="0%" y1="80%" x2="20%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
          <line x1="100%" y1="80%" x2="78%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
          <line x1="50%" y1="0%" x2="100%" y2="70%" stroke="rgba(99,102,241,0.07)" strokeWidth="0.5" />
        </svg>
        {/* Floating math symbols — boosted for light mode visibility */}
        <span className="absolute top-8 left-[4%] text-[120px] font-serif font-bold text-slate-900/[0.065] dark:text-white/[0.038] rotate-12 leading-none">Σ</span>
        <span className="absolute top-[14%] right-[5%] text-[78px] font-serif text-slate-900/[0.055] dark:text-white/[0.028] -rotate-6 leading-none">∞</span>
        <span className="absolute bottom-[22%] left-[10%] text-[58px] font-mono text-slate-900/[0.05] dark:text-white/[0.025] rotate-3 leading-none">π²</span>
        <span className="absolute bottom-[10%] right-[14%] text-[90px] font-serif text-indigo-800/[0.07] dark:text-indigo-300/[0.048] rotate-12 leading-none">∂</span>
        <span className="absolute top-[38%] left-[2%] text-[68px] font-serif text-slate-900/[0.05] dark:text-white/[0.022] -rotate-12 leading-none">∇</span>
        <span className="absolute top-[60%] right-[3%] text-[55px] font-serif text-slate-900/[0.055] dark:text-white/[0.025] rotate-6 leading-none">∫</span>
        <span className="absolute top-[7%] left-[40%] text-[36px] font-mono text-slate-900/[0.045] dark:text-white/[0.018] -rotate-3 leading-none">f(x)=0</span>
      </div>

      {/* ── Glow Blobs (visible in dark mode) ── */}
      <div className="absolute -top-48 -right-48 w-[540px] h-[540px] rounded-full glow-blob-indigo blur-[120px] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute -bottom-48 -left-48 w-[440px] h-[440px] rounded-full glow-blob-violet blur-[100px] pointer-events-none z-0" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10">
        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/35 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse inline-block" />
            Active Calendar
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 text-center tracking-tight mb-3 mt-2">
          📢 Event Board
        </h3>
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-12">
          Discover upcoming events, webinars, and hackathons hosted by Optimix Club.
        </p>

        <div className="relative flex items-center justify-center max-w-6xl mx-auto">
          {/* Left Arrow Button */}
          {(events.length > 0 || loading) && (
            <button
              onClick={scrollLeft}
              className="flex absolute -left-4 top-1/2 -translate-y-1/2 items-center justify-center bg-[#fdf8f0] dark:bg-slate-900 border border-amber-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800/60 w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
              aria-label="Scroll Left"
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          <div
            ref={eventRef}
            className="overflow-x-auto flex gap-6 pb-6 pt-2 w-full scroll-smooth scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {loading ? (
              <CardSkeleton count={4} type="event" />
            ) : events.length > 0 ? (
              events.map((event, index) => (
                <div
                  key={index}
                  className="group bg-[#fdf8f0] dark:bg-slate-900/80 border border-amber-100/90 dark:border-slate-800/80 rounded-2xl p-4 min-w-[290px] w-72 h-[410px] flex flex-col shadow-sm hover:shadow-xl hover:shadow-amber-200/40 dark:hover:shadow-indigo-950/30 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400/0 via-indigo-500/60 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Event Image with hover zoom */}
                  <div className="w-full h-40 overflow-hidden rounded-xl bg-amber-50/60 dark:bg-slate-800 relative flex-shrink-0">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${event.picture}`}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Date Chip */}
                  <p className="text-[11px] font-bold text-indigo-500 dark:text-indigo-400 mt-3.5 tracking-wider uppercase">
                    📅 {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>

                  {/* Title */}
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {event.name}
                  </h4>

                  {/* Scrollable Description with Hidden Scrollbar */}
                  <div className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mt-2 overflow-y-auto max-h-20 pr-1.5 no-scrollbar">
                    {event.description}
                  </div>

                  {/* Register Button at Bottom */}
                  <div className="mt-auto pt-4">
                    <Link to={`/register/${event._id}`} className="w-full block">
                      <button className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-indigo-500/25 hover:shadow-md">
                        Register Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 dark:text-slate-500 py-12 w-full font-medium">No events scheduled at the moment.</p>
            )}
          </div>

          {/* Right Arrow Button */}
          {events.length > 0 && (
            <button
              onClick={scrollRight}
              className="flex absolute -right-4 top-1/2 -translate-y-1/2 items-center justify-center bg-[#fdf8f0] dark:bg-slate-900 border border-amber-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800/60 w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
              aria-label="Scroll Right"
            >
              <FaChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventBoard;
