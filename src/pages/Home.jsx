import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Testimonials from '../components/TestimonialList';
import HeroSection from '../components/HeroSection';
import EventBoard from '../components/EventBoard';
import EventGallery from '../components/EventGallery';
import NoticeBoard from '../components/NoticeBoard';
import NoticeStrip from '../components/RunningNotices';
import CollegeBanner from '../components/Banner';
import director from "../assets/images/director.png"
import hod from "../assets/images/HOD.jpg"


const Home = () => {
  return (
    <>
      <CollegeBanner/>
      <Navbar />
      <HeroSection/>
      <NoticeStrip/>
      {/* <div className="text-center py-12 bg-gray-100">
        <h1 className="text-5xl font-bold text-blue-700">Welcome to Optimix Club</h1>
        <p className="text-lg text-gray-600 mt-3">Join events, participate, and connect with fellow students.</p>
      </div> */}
      <div className="max-w-6xl  mx-auto mt-16 mb-4 space-y-16 px-6">
  {/* Message by Director */}
  <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-8">
    {/* Director's Message */}
    <div className="md:col-span-3 text-center md:text-left">
      <h2 className="text-4xl font-bold text-blue-700">Message from Director</h2>
      <p className="mt-5 text-lg leading-relaxed text-gray-700 italic">
        "Our club serves as a beacon of excellence, fostering creativity and leadership among students.  
        Let’s continue to innovate and inspire!"
      </p>
    </div>

    {/* Director Image (Aligned Right on Large Screens) */}
    <div className="md:col-span-2 flex flex-col items-center md:items-end">
      <img
        src={director}
        alt="Director"
        className="w-60 h-60 object-cover border-[6px] border-blue-600 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <h3 className="text-2xl font-semibold mt-4 text-gray-900">Dr. B.K. Tripathi</h3>
      <p className="text-lg text-gray-600">Director</p>
    </div>
  </div>

  {/* Message by HOD */}
  <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-8">
    {/* HOD Image (Aligned Left on Large Screens) */}
    <div className="md:col-span-2 flex flex-col items-center md:items-start">
      <img
        src={hod}
        alt="HOD"
        className="w-60 h-60 object-cover border-[6px] border-blue-600 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
      />
      <h3 className="text-2xl font-semibold mt-4 text-gray-900">Dr. Tauseef Ahmed</h3>
      <p className="text-lg text-gray-600">Head of Department IT'D</p>
    </div>

    {/* HOD's Message */}
    <div className="md:col-span-3 text-center md:text-left">
      <h2 className="text-4xl font-bold text-blue-700">Message from HOD</h2>
      <p className="mt-5 text-lg leading-relaxed text-gray-700 italic">
        "As the Head of the Department, I take pride in seeing our students  
        actively engage in learning and collaborative growth through this club."
      </p>
    </div>
  </div>
</div>


      <EventBoard/>
      <EventGallery/>
      <Testimonials />
      <NoticeBoard/>
      <Footer />
    </>
  );
};

export default Home;