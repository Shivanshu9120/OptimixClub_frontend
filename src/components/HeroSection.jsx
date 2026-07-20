import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing arrow icons

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/picture/`);
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

  const currentImage = images[currentImageIndex]?.picture;

  return (
    <div className="w-full h-[580px] md:h-[520px] sm:h-[420px] relative overflow-hidden bg-slate-950">
      {/* Background Image / Fallback Gradient */}
      {currentImage ? (
        <img
          key={currentImageIndex} // Key ensures transition re-triggers properly
          src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${currentImage}`}
          alt="Event"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out scale-105 animate-scaleIn"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900"></div>
      )}

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/20"></div>

      {/* Mesh/Grid Pattern Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_center,_white,_transparent)]"></div>

      {/* Centered Text with Animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight drop-shadow-xl animate-fadeInUp">
          Welcome to <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 text-transparent bg-clip-text">Optimix Club</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-bold mt-4 tracking-widest text-slate-200 opacity-90 animate-fadeInUp delay-200">
          ELEVATE • EVOLVE • EXCEL
        </p>

        {/* Action Button */}
        <div className="animate-fadeInUp delay-500">
          <Link to="/events">
            <button className="mt-8 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm rounded-full shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all duration-300">
              Explore Events
            </button>
          </Link>
        </div>
      </div>

      {/* Left Arrow Button */}
      {images.length > 1 && (
        <button
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3.5 rounded-full text-white hover:scale-110 active:scale-95 transition-all duration-300 z-10"
          onClick={prevImage}
        >
          <FaChevronLeft size={18} />
        </button>
      )}

      {/* Right Arrow Button */}
      {images.length > 1 && (
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3.5 rounded-full text-white hover:scale-110 active:scale-95 transition-all duration-300 z-10"
          onClick={nextImage}
        >
          <FaChevronRight size={18} />
        </button>
      )}

      {/* Navigation Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 cursor-pointer focus:outline-none ${
                currentImageIndex === index
                  ? "bg-indigo-500 w-8 h-2.5 rounded-full"
                  : "bg-white/40 hover:bg-white/60 w-2.5 h-2.5 rounded-full"
              }`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
