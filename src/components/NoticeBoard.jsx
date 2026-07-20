import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NoticeSkeleton } from './SkeletonLoader';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notices`)
      .then(response => {
        setNotices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
        setLoading(false);
      });
  }, []);

  const displayNotices = [...notices, ...notices];

  return (
    /* Light: warm sand cream. Dark: deep slate with indigo glow */
    <div className="relative overflow-hidden py-24 px-6 border-b border-amber-100/50 dark:border-slate-900/60 transition-colors duration-300"
         style={{ backgroundColor: 'var(--bg-cream-warm)' }}>

      {/* Dark theme overlay */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 transition-colors duration-300 pointer-events-none" />

      {/* ── Math Decoration Layer ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute inset-0 math-lines" />
        {/* SVG diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="0%" y1="70%" x2="18%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.9" />
          <line x1="100%" y1="70%" x2="80%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.9" />
          <line x1="35%" y1="100%" x2="88%" y2="8%" stroke="rgba(99,102,241,0.07)" strokeWidth="0.5" />
        </svg>
        {/* Floating math symbols — boosted for light mode visibility */}
        <span className="absolute top-8 left-[4%] text-[125px] font-serif font-bold text-amber-900/[0.08] dark:text-white/[0.04] rotate-12 leading-none">π</span>
        <span className="absolute top-[14%] right-[6%] text-[82px] font-serif text-amber-800/[0.07] dark:text-white/[0.032] -rotate-6 leading-none">∞</span>
        <span className="absolute bottom-[22%] left-[7%] text-[60px] font-mono text-amber-800/[0.065] dark:text-white/[0.028] rotate-3 leading-none">Σx</span>
        <span className="absolute bottom-[10%] right-[10%] text-[95px] font-serif text-indigo-700/[0.07] dark:text-indigo-300/[0.048] rotate-12 leading-none">∂</span>
        <span className="absolute top-[38%] right-[2%] text-[68px] font-serif text-amber-700/[0.06] dark:text-white/[0.025] -rotate-6 leading-none">∇</span>
        <span className="absolute top-[60%] left-[2%] text-[55px] font-serif text-amber-700/[0.055] dark:text-white/[0.022] rotate-6 leading-none">∫</span>
        <span className="absolute top-[7%] left-[38%] text-[38px] font-mono text-amber-800/[0.05] dark:text-white/[0.018] -rotate-3 leading-none">ΔE=hν</span>
      </div>

      {/* ── Glow Blobs ── */}
      <div className="absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full glow-blob-indigo blur-[110px] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute -bottom-36 -left-36 w-[400px] h-[400px] rounded-full glow-blob-amber blur-[95px] pointer-events-none z-0" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-amber-100/70 dark:bg-indigo-950/40 text-amber-700 dark:text-indigo-400 border border-amber-200/60 dark:border-indigo-900/30 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest">
            Bulletins
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight mt-3">
            📌 Official Bulletin Board
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
            Hover over the board to pause vertical scrolling and read notifications.
          </p>
        </div>

        {/* Cork Noticeboard Frame */}
        <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-[12px] border-[#8b5a2b] dark:border-[#5c3a21] bg-[#d2a679] dark:bg-[#3d2716] p-6 relative">
          {/* Subtle texture highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent)] pointer-events-none" />

          {/* Viewport for scrolling notices */}
          <div className="relative h-[420px] overflow-y-auto rounded-xl bg-black/5 dark:bg-black/15 p-4 shadow-inner no-scrollbar">
            {loading ? (
              <NoticeSkeleton count={2} />
            ) : notices.length > 0 ? (
              <div className="vertical-marquee-content">
                {displayNotices.map((notice, index) => (
                  <div 
                    key={index} 
                    className="w-full bg-[var(--bg-card)] text-[var(--text-primary)] p-6 rounded-2xl shadow-md border border-[var(--border-color)] dark:border-slate-800/80 relative mb-6 group transition duration-300 hover:shadow-lg origin-top"
                    style={{
                      transform: index % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)"
                    }}
                  >
                    {/* Push Pin */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full border border-white shadow-sm flex items-center justify-center">
                      <div className="w-1 h-1 bg-white/70 rounded-full absolute top-0.5 left-0.5" />
                    </div>

                    {/* Header / Meta */}
                    <div className="flex justify-between items-start border-b border-dashed border-slate-200 dark:border-slate-800/80 pb-2 mb-3">
                      <h4 className="text-base font-black text-slate-900 dark:text-slate-100 leading-snug pr-4">
                        {notice.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-450 whitespace-nowrap bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                        📅 {new Date(notice.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    {/* Content Body */}
                    <p className="text-sm text-slate-600 dark:text-slate-200 leading-relaxed font-medium">
                      {notice.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-700 dark:text-slate-400">
                <span className="text-4xl mb-2">📌</span>
                <p className="font-bold text-base">Bulletin Board is Empty</p>
                <p className="text-sm mt-1">No active announcements at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;
