import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../assets/images/logo.jpg';

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 overflow-hidden">

      {/* ── Math Decoration Layer ── */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute inset-0 math-lines" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="0%" y1="100%" x2="20%" y2="0%" stroke="rgba(99,102,241,0.06)" strokeWidth="0.8" />
          <line x1="100%" y1="100%" x2="78%" y2="0%" stroke="rgba(99,102,241,0.06)" strokeWidth="0.8" />
          <line x1="30%" y1="0%" x2="85%" y2="100%" stroke="rgba(99,102,241,0.035)" strokeWidth="0.5" />
        </svg>
        <span className="absolute top-8 left-[3%] text-[100px] font-serif font-bold text-white/[0.035] rotate-12 leading-none">Σ</span>
        <span className="absolute top-[15%] right-[5%] text-[72px] font-serif text-white/[0.03] -rotate-6 leading-none">π</span>
        <span className="absolute bottom-[20%] left-[10%] text-[55px] font-mono text-white/[0.025] rotate-3 leading-none">∞</span>
        <span className="absolute bottom-[10%] right-[14%] text-[80px] font-serif text-indigo-300/[0.04] rotate-12 leading-none">∂</span>
        <span className="absolute top-[40%] right-[2%] text-[60px] font-serif text-white/[0.022] -rotate-6 leading-none">∇</span>
        <span className="absolute top-[6%] left-[42%] text-[34px] font-mono text-white/[0.02] -rotate-3 leading-none">f(x)=Σ</span>
      </div>

      {/* ── Glow Blobs ── */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full glow-blob-indigo blur-[100px] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute -bottom-32 -right-32 w-[380px] h-[380px] rounded-full glow-blob-violet blur-[90px] pointer-events-none z-0" aria-hidden="true" />

      {/* ── Footer Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Column */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Optimix Logo" className="w-8 h-8 rounded-full border border-slate-700 shadow-sm" />
              <span className="text-white text-lg font-black tracking-wider">OPTIMIX CLUB</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fostering technical innovation, creative projects, and collaborative leadership among students of Rajkiya Engineering College, Azamgarh.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Navigation</h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a href="/" className="hover:text-indigo-400 transition-colors duration-200">Home</a>
              <a href="/about" className="hover:text-indigo-400 transition-colors duration-200">About Us</a>
              <a href="/events" className="hover:text-indigo-400 transition-colors duration-200">Our Events</a>
              <a href="/contact" className="hover:text-indigo-400 transition-colors duration-200">Contact</a>
            </div>
          </div>

          {/* Affiliation Column */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Affiliation</h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-500">
              <span>Rajkiya Engineering College</span>
              <span>Approved by AICTE</span>
              <span>Affiliated to AKTU, Lucknow</span>
              <span>Azamgarh, UP, India</span>
            </div>
          </div>

          {/* Social Connect Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Connect With Us</h4>
            <div className="flex space-x-3">
              <a href="https://www.linkedin.com/company/optimix-club/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 hover:border-indigo-500/60 hover:text-white hover:bg-indigo-950/40 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://www.instagram.com/optimixclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 hover:border-pink-500/60 hover:text-white hover:bg-pink-950/30 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                <FaInstagram size={16} />
              </a>
              <a href="https://x.com/Shivaanshusingh" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:text-white hover:bg-sky-950/30 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                <FaTwitter size={16} />
              </a>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold tracking-wide">
              Empowering Students • Enriching Experiences
            </p>
          </div>

        </div>

        {/* Copyright Strip */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] text-slate-600 font-semibold tracking-wide gap-4">
          <div>
            © {new Date().getFullYear()} OPTIMIX Club. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="/terms" className="hover:text-indigo-400 transition-colors duration-200">Terms & Conditions</a>
            <span>Designed for REC Azamgarh</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
