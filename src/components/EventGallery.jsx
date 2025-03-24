import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from 'axios';

const EventGallery = () => {
  const [images, setImages] = useState([]);
  const galleryRef = useRef(null);

  useEffect(() => {
    axios.get('https://optimixclub-backend.onrender.com/api/picture/')
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching gallery images:', error));
  }, []);

  const scrollLeft = () => galleryRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => galleryRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <div className="relative py-12 bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h3 className="text-4xl font-bold text-blue-700 text-center mb-6">Event Gallery</h3>
      <div ref={galleryRef} className="overflow-x-auto flex gap-6 pb-4 max-w-7xl mx-auto scrollbar-hide">
        {images.map((img, index) => (
          <div key={index} className="min-w-[280px] h-[200px] rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <img src={`https://optimixclub-backend.onrender.com/uploads/${img.picture}`} alt={`Event ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
      </div>
      <button onClick={scrollLeft} className="hidden md:block absolute left-5 top-1/2 bg-blue-600 p-3 rounded-full">
        <FaChevronLeft />
      </button>
      <button onClick={scrollRight} className="hidden md:block absolute right-5 top-1/2 bg-blue-600 p-3 rounded-full">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default EventGallery;
