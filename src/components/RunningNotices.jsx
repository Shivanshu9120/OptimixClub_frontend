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
    <div className="relative w-full bg-red-600 text-white text-lg h-[40px] flex items-center overflow-hidden shadow-[inset_0_0_10px_rgba(255,255,255,0.3)]">
      {/* Fixed Important Notices Label with contrasting background */}
      <div className="absolute left-0 top-0 bottom-0 bg-yellow-400 z-10 text-black font-bold text-sm px-2 flex items-center">
        ⚠ Important Notices:
      </div>

      {/* Scrolling Notice Marquee */}
      <div className="w-full pl-36 marquee group">
        <div className="marquee-content flex space-x-8 group-hover:pause">
          {notices.map((notice, index) => (
            <span key={index} className="whitespace-nowrap">
              <strong>🆕 {notice.title}:</strong> {notice.description} &nbsp;|&nbsp;
            </span>
          ))}
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
            animation: marquee 20s linear infinite;
            text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);
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
