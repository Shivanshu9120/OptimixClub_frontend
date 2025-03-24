import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import cllglogo from "../assets/images/cllglogo.png";
import aktulogo from "../assets/images/aktulogo.png";
import makelogo from "../assets/images/makelogo.png";
import edlogo from "../assets/images/edlogo.png";

export default function CollegeBanner() {
  return (
    <div className="relative w-full">
      {/* Top Bar with Skip Link & Social Icons */}
      <div className="w-full bg-gray-300 text-black text-sm md:text-base font-medium flex justify-between items-center px-4 md:px-12 py-2">
        <a href="" className="hover:underline">
          Skip to Main Content
        </a>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/company/optimix-club/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.instagram.com/optimixclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram size={20} />
          </a>
          <a href="https://x.com/Shivaanshusingh" target="_blank" rel="noopener noreferrer" className="hover:text-black">
            <FaXTwitter size={20} />
          </a>
        </div>
      </div>

      {/* Banner Section */}
      <div className="w-full bg-gray-100 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 py-6">
        
        {/* College Logo - Only on Medium and Large screens */}
        <img
          src={cllglogo}
          alt="College Logo"
          className="hidden md:block w-20 h-20 lg:w-24 lg:h-24"
        />

        {/* Text Content - Visible on all screens */}
        <div className="text-center md:text-left flex-1 px-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-700">
            राजकीय इंजीनियरिंग कॉलेज, आज़मगढ़
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-200 text-transparent bg-clip-text">
            Rajkiya Engineering College, Azamgarh
          </p>
          <p className="text-sm md:text-lg lg:text-xl text-gray-700 font-medium mt-2">
            Leading Engineering College in Uttar Pradesh, Approved by AICTE & Affiliated to AKTU, Lucknow
          </p>
        </div>

        {/* Club Logos - Only on Large screens */}
        <div className="hidden lg:flex gap-6">
          <img src={aktulogo} alt="AKTU Logo" className="w-24 h-24" />
          <img src={makelogo} alt="MAKE Logo" className="w-24 h-24" />
          <img src={edlogo} alt="ED Logo" className="w-24 h-24" />
        </div>
      </div>
    </div>
  );
}
