import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from 'axios';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const noticeRef = useRef(null);

  useEffect(() => {
    axios.get('https://optimixclub-backend.onrender.com/api/notices')
      .then(response => setNotices(response.data))
      .catch(error => console.error('Error fetching notices:', error));
  }, []);

  const scrollLeft = () => noticeRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => noticeRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <h3 className="text-3xl font-semibold text-center mb-4">📢 Notice Board</h3>
      <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">

        <button onClick={scrollLeft} className="hidden md:block bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition">
          <FaChevronLeft />
        </button>

        <div ref={noticeRef} className="overflow-x-auto flex gap-4 pb-4 w-full scrollbar-hide">
          {notices.map((notice, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-md shadow-md min-w-[280px] w-72 h-[200px] flex flex-col hover:shadow-lg transition-all duration-300">
              <p className="text-xs text-gray-400">📅 Date: {new Date(notice.date).toLocaleDateString()}</p>
              <h4 className="text-lg font-semibold mt-1">{notice.title}</h4>

              {/* Scrollable Description with Hidden Scrollbar */}
              <div className="text-sm text-gray-300 overflow-y-auto max-h-18 pr-2 mt-2 no-scrollbar">
                {notice.description}
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className="hidden md:block bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition">
          <FaChevronRight />
        </button>

      </div>
    </div>
  );
};

export default NoticeBoard;
