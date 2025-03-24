import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu
  const role = localStorage.getItem("role"); // Fetch role from localStorage
  const photo = localStorage.getItem("photo");
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("photo")
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-4 shadow-lg ">
      <div className="max-w-full flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="logo" 
            className="h-10 w-10 rounded-full border-2 border-white shadow-md"
          />
          <h1 className="text-white text-2xl font-bold pl-2 tracking-wider">
            OPTIMIX CLUB
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white text-lg font-medium hover:text-yellow-300 transition-all">Home</Link>
          <Link to="/about" className="text-white text-lg font-medium hover:text-yellow-300 transition-all">About</Link>
          <Link to="/contact" className="text-white text-lg font-medium hover:text-yellow-300 transition-all">Contact</Link>
          <Link to="/events" className="text-white text-lg font-medium hover:text-yellow-300 transition-all">Events</Link>
          <Link to={role === "admin" || role === "superadmin" ? "/admin-dashboard" : "/user-dashboard"} className="text-white text-lg font-medium hover:text-yellow-300 transition-all">Dashboard</Link>
          {photo?
          (<div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout} 
                className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-800 transition-all"
              >
                Logout
              </button>
              <img 
                src={`https://optimixclub-backend.onrender.com/uploads/${photo}`} 
                alt="Profile" 
                className="h-10 w-10 rounded-full border-2 border-white cursor-pointer"
              />
            </div>
          ) : (
            <Link to="/login" className="text-white bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition-all">Login / Sign Up</Link>
          )}       
        </div>
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        </div>
      

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden flex flex-col bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600 items-center space-y-4  p-4 rounded-lg mt-2 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link to="/" className="text-white text-lg font-medium hover:text-yellow-300" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" className="text-white text-lg font-medium hover:text-yellow-300 transition-all">About</Link>
        <Link to="/contact" className="text-white text-lg font-medium hover:text-yellow-300 transition-all">Contact</Link>
        <Link to="/events" className="text-white text-lg font-medium hover:text-yellow-300" onClick={() => setIsOpen(false)}>Events</Link>
        <Link to={role === "admin" || role === "superadmin" ? "/admin-dashboard" : "/user-dashboard"} className="text-white text-lg font-medium hover:text-yellow-300" onClick={() => setIsOpen(false)}>Dashboard</Link>
        {photo?
          (<div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout} 
                className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-800 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-white bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition-all">Login / Sign Up</Link>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
