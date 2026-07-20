import React, { useEffect, useState } from "react";
import axios from "axios";

const NoticeStrip = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/notices`)
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Error fetching notices:", error));
  }, []);

  return (
    <div className="relative w-full bg-slate-950 text-slate-200 text-sm h-[44px] flex items-center overflow-hidden border-y border-slate-900 shadow-sm">
      {/* Fixed Important Notices Label with live pulsing badge */}
      <div className="absolute left-0 top-0 bottom-0 bg-slate-950 px-4 flex items-center z-10 shadow-[8px_0_16px_rgba(2,6,23,0.95)]">
        <div className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
          </span>
          Updates
        </div>
      </div>

      {/* Scrolling Notice Marquee */}
      <div className="w-full pl-32 marquee group">
        <div className="marquee-content flex space-x-12 group-hover:pause">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <span key={index} className="whitespace-nowrap flex items-center gap-2 text-slate-300 font-medium">
                <span className="text-indigo-400 font-bold">•</span>
                <span className="text-slate-100 font-semibold">{notice.title}:</span>
                <span>{notice.description}</span>
              </span>
            ))
          ) : (
            <span className="whitespace-nowrap flex items-center gap-2 text-slate-400 font-medium">
              <span className="text-indigo-400 font-bold">•</span>
              <span>Welcome to Optimix Club! Check back later for important announcements.</span>
            </span>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          .marquee {
            overflow: hidden;
            white-space: nowrap;
            position: relative;
          }

          .marquee-content {
            display: flex;
            animation: marquee 25s linear infinite;
          }

          .group:hover .marquee-content {
            animation-play-state: paused;
          }

          @keyframes marquee {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default NoticeStrip;
