import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing arrow icons

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://optimixclub-backend.onrender.com/api/picture/");
        const data = await response.json();
        setImages(data.slice(0, 4)); // Limit to first 4 images
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full h-[600px] md:h-[575px] sm:h-[400px] relative overflow-hidden">
      {/* Background Image */}
      <img
        src={`https://optimixclub-backend.onrender.com/uploads/${images[currentImageIndex]?.picture}`}
        alt="Event"
        className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      />

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Centered Text with Animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-6xl md:text-5xl sm:text-4xl font-extrabold uppercase drop-shadow-lg animate-fadeInUp">
          Welcome to Optimix Club!
        </h1>
        <p className="text-3xl md:text-2xl sm:text-xl font-bold mt-3 tracking-wider opacity-90 animate-fadeInUp delay-200">
          Elevate. Evolve. Excel.
        </p>

        {/* Optional Call to Action */}
        <Link to="/events">
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600 text-white font-semibold text-lg rounded-full shadow-md hover:bg-blue-500 transition duration-300 animate-fadeInUp delay-500">
            Join Now
          </button>
        </Link>
      </div>

      {/* Left Arrow Button */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition duration-300"
        onClick={prevImage}
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Right Arrow Button */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition duration-300"
        onClick={nextImage}
      >
        <FaChevronRight size={24} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-500 cursor-pointer ${
              currentImageIndex === index
                ? "bg-blue-500 scale-150 animate-pulse"
                : "bg-gray-400 opacity-75"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
