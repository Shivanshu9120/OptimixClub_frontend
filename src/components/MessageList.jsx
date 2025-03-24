import { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Messages = () => {
  const [message, setMessage] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("https://optimixclub-backend.onrender.com/api/contact/messages")
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 320; // Matches card width + gap

      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto my-16 px-6 sm:px-10 lg:px-14">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-600">
        Messages
      </h2>

      {/* Left Scroll Button */}
      <button
        className="hidden md:flex absolute left-0 -translate-y-1/2 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-10 top-1/2"
        onClick={() => scroll("left")}
        style={{ transform: "translate(-50%, -50%)" }} // Ensures proper placement outside cards
      >
        <ChevronLeftIcon className="h-7 w-7 text-white" />
      </button>

      {/* Scrollable Testimonials Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth py-6 space-x-6 px-4 md:px-12 lg:px-16"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {message.length > 0 ? (
          message.map((m) => (
            <div
              key={m._id}
              className="flex-shrink-0 p-6 border-2 border-violet-500 rounded-xl 
                         shadow-gray-700/50 shadow-inner 
                        transition-all duration-300 hover:scale-105 
                        bg-white text-black h-[350px] flex flex-col justify-between"
              style={{
                width: "270px",
                scrollSnapAlign: "start",
              }}
            >
              <p className="text-lg font-medium italic text-center">
                "{m.message}"
              </p>

              {/* Name & Profile Picture */}
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={`https://optimixclub-backend.onrender.com/uploads/${m.user.photo}`}
                  alt={m.user.name}
                  className="w-16 h-16 rounded-full border-2 border-violet-500 shadow-lg shadow-violet-400/50"
                />
                <span className="text-violet-600 font-bold mt-2">{m.user.name}</span>
              </div>
            </div>

          ))
        ) : (
          <p className="text-center text-white w-full">No testimonials available</p>
        )}
      </div>

      {/* Right Scroll Button */}
      <button
        className="hidden md:flex absolute right-0 -translate-y-1/2 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-10 top-1/2"
        onClick={() => scroll("right")}
        style={{ transform: "translate(50%, -50%)" }} // Ensures proper placement outside cards
      >
        <ChevronRightIcon className="h-7 w-7 text-white" />
      </button>
    </div>
  );
};

export default Messages;
