import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import cllglogo from "../assets/images/cllglogo.png";
import aktulogo from "../assets/images/aktulogo.png";
import makelogo from "../assets/images/makelogo.png";
import edlogo from "../assets/images/edlogo.png";

export default function CollegeBanner() {
  return (
    <div className="relative w-full z-10">
      {/* Top Bar with Skip Link & Social Icons */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs md:text-sm font-medium flex justify-between items-center px-6 md:px-12 py-2 border-b border-slate-800">
        <a href="#main-content" className="hover:text-white transition duration-200">
          Skip to Main Content
        </a>
        <div className="flex gap-4 items-center">
          <a href="https://www.linkedin.com/company/optimix-club/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors duration-200">
            <FaLinkedin size={18} />
          </a>
          <a href="https://www.instagram.com/optimixclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors duration-200">
            <FaInstagram size={18} />
          </a>
          <a href="https://x.com/Shivaanshusingh" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors duration-200">
            <FaXTwitter size={16} />
          </a>
        </div>
      </div>

      {/* Banner Section */}
      <div className="relative w-full bg-gradient-to-br from-slate-50 via-slate-100/60 to-indigo-50/20 dark:from-slate-950 dark:via-slate-950/80 dark:to-indigo-950/20 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-5 border-b border-slate-200/50 dark:border-slate-900 transition-colors duration-300 overflow-hidden">

        {/* ── Math Decoration Layer ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
          <div className="absolute inset-0 math-lines" />
          <span className="absolute top-1 right-[22%] text-[52px] font-serif font-bold text-slate-800/[0.04] dark:text-white/[0.055] rotate-12 leading-none">Σ</span>
          <span className="absolute top-2 left-[48%] text-[38px] font-serif text-indigo-700/[0.05] dark:text-indigo-300/[0.07] -rotate-6 leading-none">π</span>
          <span className="absolute bottom-1 left-[30%] text-[44px] font-serif text-slate-800/[0.035] dark:text-white/[0.05] rotate-3 leading-none">∞</span>
          <span className="absolute top-3 left-[62%] text-[28px] font-mono text-slate-700/[0.04] dark:text-white/[0.04] -rotate-3 leading-none">λ=mc²</span>
        </div>

        {/* College Logo - Only on Medium and Large screens */}
        <div className="hidden md:block transition hover:scale-105 duration-300 flex-shrink-0 mr-6 relative z-10">
          <img
            src={cllglogo}
            alt="College Logo"
            className="w-20 h-20 lg:w-22 lg:h-22 object-contain bg-white dark:bg-white p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-200/80 shadow-sm"
          />
        </div>

        {/* Text Content - Visible on all screens */}
        <div className="text-center md:text-left flex-1 relative z-10">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-wide">
            राजकीय इंजीनियरिंग कॉलेज, आज़मगढ़
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 text-transparent bg-clip-text mt-0.5 tracking-tight">
            Rajkiya Engineering College, Azamgarh
          </p>
          <p className="text-xs md:text-sm lg:text-sm text-slate-500 dark:text-slate-200 font-semibold mt-1">
            Leading Engineering College in Uttar Pradesh • Approved by AICTE & Affiliated to AKTU, Lucknow
          </p>
        </div>

        {/* Club Logos - Only on Large screens */}
        <div className="hidden lg:flex gap-4 items-center flex-shrink-0 ml-6 relative z-10">
          <div className="w-18 h-18 bg-white dark:bg-white p-1 rounded-xl border border-slate-200/80 dark:border-slate-200/80 shadow-sm flex items-center justify-center transition hover:scale-110 duration-200">
            <img src={aktulogo} alt="AKTU Logo" className="w-14 h-14 object-contain" />
          </div>
          <div className="w-18 h-18 bg-white dark:bg-white p-1 rounded-xl border border-slate-200/80 dark:border-slate-200/80 shadow-sm flex items-center justify-center transition hover:scale-110 duration-200">
            <img src={makelogo} alt="MAKE Logo" className="w-14 h-14 object-contain" />
          </div>
          <div className="w-18 h-18 bg-white dark:bg-white p-1 rounded-xl border border-slate-200/80 dark:border-slate-200/80 shadow-sm flex items-center justify-center transition hover:scale-110 duration-200">
            <img src={edlogo} alt="ED Logo" className="w-14 h-14 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
