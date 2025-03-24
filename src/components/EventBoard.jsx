import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';

const EventBoard = () => {
  const [events, setEvents] = useState([]);
  const eventRef = useRef(null);

  useEffect(() => {
    axios.get('https://optimixclub-backend.onrender.com/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const scrollLeft = () => eventRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => eventRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <h3 className="text-3xl font-bold text-blue-700 text-center mb-6">📢 Event Board</h3>
      <div className="flex items-center justify-center gap-4 max-w-6xl mx-auto">
        
        <button onClick={scrollLeft} className="hidden md:block bg-white p-3 rounded-full shadow-md hover:bg-blue-200">
          <FaChevronLeft />
        </button>

        <div ref={eventRef} className="overflow-x-auto flex gap-5 pb-4 w-full scrollbar-hide">
          {events.map((event, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-md p-4 min-w-[280px] w-72 h-[400px] flex flex-col hover:shadow-xl transition-all duration-300">
              <img
                src={`https://optimixclub-backend.onrender.com/uploads/${event.picture}`}
                alt={event.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="text-xs text-gray-500 mt-2">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
              <h4 className="text-lg font-semibold">{event.name}</h4>

              {/* Scrollable Description with Hidden Scrollbar */}
              <div className="text-sm text-gray-600 overflow-y-auto max-h-20 pr-2 mt-2 no-scrollbar">
                {event.description}
              </div>

              {/* Register Button at Bottom */}
              <div className="mt-auto pt-4">
                <Link to={`/register/${event._id}`} className="inline-block">
                  <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollRight} className="hidden md:block bg-white p-3 rounded-full shadow-md hover:bg-blue-200">
          <FaChevronRight />
        </button>

      </div>
    </div>
  );
};

export default EventBoard;
