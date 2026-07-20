import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from 'axios';
import { CardSkeleton } from './SkeletonLoader';

const EventGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const galleryRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/picture/`)
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching gallery images:', error);
        setLoading(false);
      });
  }, []);

  const scrollLeft = () => galleryRef.current.scrollBy({ left: -320, behavior: "smooth" });
  const scrollRight = () => galleryRef.current.scrollBy({ left: 320, behavior: "smooth" });

  return (
    /* Light: stone-cream. Dark: deep slate with violet glow */
    <div className="relative overflow-hidden py-20 px-6 border-b border-stone-100/80 dark:border-slate-900 transition-colors duration-300"
         style={{ backgroundColor: 'var(--bg-cream-secondary)' }}>

      {/* Dark theme overlay */}
      <div className="absolute inset-0 dark:bg-slate-950 transition-colors duration-300 pointer-events-none" />

      {/* ── Math Decoration Layer ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute inset-0 math-lines" />
        {/* SVG diagonal lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="0%" y1="60%" x2="25%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
          <line x1="100%" y1="60%" x2="72%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
          <line x1="45%" y1="100%" x2="90%" y2="10%" stroke="rgba(99,102,241,0.07)" strokeWidth="0.5" />
        </svg>
        {/* Floating math symbols — boosted for light mode visibility */}
        <span className="absolute top-10 right-[6%] text-[110px] font-serif font-bold text-stone-700/[0.08] dark:text-white/[0.038] -rotate-6 leading-none">∞</span>
        <span className="absolute bottom-[18%] left-[5%] text-[90px] font-serif text-stone-700/[0.065] dark:text-white/[0.03] rotate-12 leading-none">Σ</span>
        <span className="absolute top-[35%] left-[1%] text-[65px] font-mono text-stone-700/[0.06] dark:text-white/[0.025] -rotate-12 leading-none">∇</span>
        <span className="absolute top-[8%] left-[42%] text-[42px] font-mono text-stone-700/[0.055] dark:text-white/[0.02] -rotate-3 leading-none">x²+y²=r²</span>
        <span className="absolute bottom-[8%] right-[12%] text-[75px] font-serif text-indigo-700/[0.07] dark:text-indigo-300/[0.04] rotate-12 leading-none">∂</span>
      </div>

      {/* ── Glow Blobs ── */}
      <div className="absolute -top-36 -left-36 w-[480px] h-[480px] rounded-full glow-blob-violet blur-[110px] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute -bottom-36 -right-36 w-[380px] h-[380px] rounded-full glow-blob-indigo blur-[100px] pointer-events-none z-0" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10">
        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-1.5 bg-stone-100/80 dark:bg-indigo-950/30 text-stone-600 dark:text-indigo-400 border border-stone-200/60 dark:border-indigo-900/35 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest">
            Moments Caught
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 text-center tracking-tight mb-3 mt-2">
          Event Gallery
        </h3>
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-12">
          Take a visual tour through our past events, workshops, and student collaborations.
        </p>

        <div className="relative max-w-7xl mx-auto flex items-center">
          {/* Left Arrow Button */}
          {(images.length > 0 || loading) && (
            <button 
              onClick={scrollLeft} 
              className="flex absolute -left-4 top-1/2 -translate-y-1/2 items-center justify-center bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-800 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
              aria-label="Scroll Left"
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          <div 
            ref={galleryRef} 
            className="overflow-x-auto flex gap-6 pb-6 w-full scroll-smooth scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {loading ? (
              <CardSkeleton count={4} type="gallery" />
            ) : images.length > 0 ? (
              images.map((img, index) => (
                <div 
                  key={index} 
                  className="min-w-[300px] h-[220px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 relative group shadow-sm hover:shadow-lg hover:shadow-stone-200/50 dark:hover:shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-1"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <img 
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${img.picture}`} 
                    alt={`Event Moment ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold tracking-wider uppercase">
                      Optimix Capture #{index + 1}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 dark:text-slate-500 py-12 w-full font-medium">No moments captured yet.</p>
            )}
          </div>

          {/* Right Arrow Button */}
          {images.length > 0 && (
            <button 
              onClick={scrollRight} 
              className="flex absolute -right-4 top-1/2 -translate-y-1/2 items-center justify-center bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 border border-stone-200 dark:border-slate-800 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
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

export default EventGallery;
