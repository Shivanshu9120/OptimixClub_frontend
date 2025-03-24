import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../assets/images/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full h-auto pt-1 pb-1 text-white py-8 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]">
      <div className="container mx-auto px-6 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Club Name & Description */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={logo} alt="club-logo" className="w-6 h-6 rounded-full" />
            <h2 className="text-2xl text-gray-300 font-bold">OPTIMIX CLUB</h2>
            <p className="text-gray-400 text-sm">Empowering Students, Enriching Experiences</p>
          </div>

          {/* Copyright Text */}
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} OPTIMIX Club. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 md:mt-0">
            <a href="https://x.com/Shivaanshusingh" className="text-gray-300 hover:text-white transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://x.com/Shivaanshusingh" className="text-gray-300 hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://www.instagram.com/optimixclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-gray-300 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/optimix-club/?viewAsMember=true" className="text-gray-300 hover:text-white transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
