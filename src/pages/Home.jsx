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
import FAQSection from '../components/FAQSection';
import SideScrollNav from '../components/SideScrollNav';
import director from "../assets/images/director.png"
import hod from "../assets/images/HOD.jpg"


const Home = () => {
  return (
    <>
      <SideScrollNav />
      <CollegeBanner/>
      <Navbar />

      {/* ── Hero Section ── */}
      <section id="hero">
        <HeroSection/>
      </section>

      <NoticeStrip/>

      {/* ── Leadership Spotlight Section ── */}
      {/* Light: warm cream bg. Dark: deep slate with glow */}
      <div className="relative overflow-hidden bg-[var(--bg-cream)] dark:bg-slate-950 border-b border-amber-100/60 dark:border-slate-900 transition-colors duration-300">

        {/* Math Decoration Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <div className="absolute inset-0 math-lines" />
          {/* Floating math symbols — boosted for light mode visibility */}
          <span className="absolute top-10 left-[3%] text-[120px] font-serif font-bold text-amber-900/[0.08] dark:text-white/[0.04] rotate-12 leading-none">Σ</span>
          <span className="absolute top-[15%] right-[5%] text-[80px] font-serif text-amber-700/[0.065] dark:text-white/[0.03] -rotate-6 leading-none">∞</span>
          <span className="absolute bottom-[20%] left-[8%] text-[60px] font-mono text-amber-800/[0.06] dark:text-white/[0.03] rotate-3 leading-none">π²</span>
          <span className="absolute bottom-[8%] right-[10%] text-[100px] font-serif text-indigo-700/[0.07] dark:text-indigo-300/[0.05] rotate-15 leading-none">∂</span>
          <span className="absolute top-[40%] left-[1%] text-[70px] font-serif text-amber-700/[0.055] dark:text-white/[0.025] -rotate-12 leading-none">∇</span>
          <span className="absolute top-[28%] right-[26%] text-[46px] font-mono text-amber-800/[0.05] dark:text-white/[0.02] leading-none">λ</span>
          <span className="absolute top-[58%] right-[3%] text-[56px] font-serif text-amber-700/[0.055] dark:text-white/[0.025] rotate-6 leading-none">∫</span>
          <span className="absolute top-[5%] left-[36%] text-[38px] font-mono text-amber-800/[0.05] dark:text-white/[0.018] -rotate-3 leading-none">f(x)=0</span>
          {/* SVG diagonal lines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="0%" y1="100%" x2="28%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
            <line x1="100%" y1="100%" x2="68%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
            <line x1="18%" y1="0%" x2="82%" y2="100%" stroke="rgba(99,102,241,0.07)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Glow Blobs */}
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full glow-blob-indigo blur-[110px] pointer-events-none z-0" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 w-[380px] h-[380px] rounded-full glow-blob-amber blur-[90px] pointer-events-none z-0" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto my-24 px-6 space-y-12">

          {/* Message by Director */}
          <div className="relative bg-white/75 dark:bg-slate-900/80 backdrop-blur-sm border border-amber-200/70 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-md dark:shadow-slate-950/20 hover:shadow-xl hover:shadow-amber-100/40 dark:hover:shadow-indigo-950/30 transition duration-300 overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Decorative Background Quote Mark */}
            <div className="absolute right-8 bottom-2 text-[200px] font-serif text-[var(--quote-watermark)] select-none pointer-events-none font-bold leading-none translate-y-12">
              "
            </div>
            
            {/* Director Quote / Message */}
            <div className="flex-1 order-2 md:order-1 text-center md:text-left relative z-10">
              <span className="bg-amber-50 dark:bg-indigo-950/30 text-amber-700 dark:text-indigo-400 border border-amber-200/60 dark:border-indigo-900/35 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Leadership Spotlight
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight mt-4">
                Message from Director
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-200 italic font-medium">
                "Our club serves as a beacon of excellence, fostering creativity and leadership among students.  
                Let's continue to innovate and inspire!"
              </p>
            </div>

            {/* Director Image */}
            <div className="flex-shrink-0 order-1 md:order-2 flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={director}
                  alt="Director"
                  className="w-48 h-48 md:w-52 md:h-52 object-cover border-4 border-amber-400/60 dark:border-indigo-500 rounded-3xl shadow-md transition-all duration-500 hover:scale-105 hover:rotate-1"
                />
                {/* Subtle glow ring */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-300/20 dark:from-indigo-500/20 to-transparent blur-sm pointer-events-none" />
              </div>
              <h3 className="text-xl font-bold mt-4 text-slate-800 dark:text-slate-200">Dr. B.K. Tripathi</h3>
              <p className="text-xs font-bold text-amber-600 dark:text-indigo-400 tracking-wider uppercase mt-1">Director</p>
            </div>
          </div>

          {/* Message by HOD */}
          <div className="relative bg-white/75 dark:bg-slate-900/80 backdrop-blur-sm border border-amber-200/70 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-md dark:shadow-slate-950/20 hover:shadow-xl hover:shadow-amber-100/40 dark:hover:shadow-indigo-950/30 transition duration-300 overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Decorative Background Quote Mark */}
            <div className="absolute right-8 bottom-2 text-[200px] font-serif text-[var(--quote-watermark)] select-none pointer-events-none font-bold leading-none translate-y-12">
              "
            </div>
            
            {/* HOD Image */}
            <div className="flex-shrink-0 flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={hod}
                  alt="HOD"
                  className="w-48 h-48 md:w-52 md:h-52 object-cover border-4 border-amber-400/60 dark:border-indigo-500 rounded-3xl shadow-md transition-all duration-500 hover:scale-105 hover:-rotate-1"
                />
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-300/20 dark:from-indigo-500/20 to-transparent blur-sm pointer-events-none" />
              </div>
              <h3 className="text-xl font-bold mt-4 text-slate-800 dark:text-slate-200">Dr. Tauseef Ahmed</h3>
              <p className="text-xs font-bold text-amber-600 dark:text-indigo-400 tracking-wider uppercase mt-1">Head of Department IT'D</p>
            </div>

            {/* HOD Quote / Message */}
            <div className="flex-1 text-center md:text-left relative z-10">
              <span className="bg-amber-50 dark:bg-indigo-950/30 text-amber-700 dark:text-indigo-400 border border-amber-200/60 dark:border-indigo-900/35 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Department Message
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight mt-4">
                Message from HOD
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-200 italic font-medium">
                "As the Head of the Department, I take pride in seeing our students  
                actively engage in learning and collaborative growth through this club."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Events Section ── */}
      <section id="events">
        <EventBoard/>
      </section>

      {/* ── Gallery Section ── */}
      <section id="gallery">
        <EventGallery/>
      </section>

      {/* ── Testimonials Section ── */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* ── Notice Board Section ── */}
      <section id="noticeboard">
        <NoticeBoard/>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection />

      {/* ── Footer / Contact ── */}
      <section id="contact">
        <Footer />
      </section>
    </>
  );
};

export default Home;