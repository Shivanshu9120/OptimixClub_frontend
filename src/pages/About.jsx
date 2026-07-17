"use client";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.jpg";
import Navbar from "../components/Navbar";
import director from "../assets/images/director.png"
import hod from "../assets/images/HOD.jpg"
import president from "../assets/images/president.jpg"
import { Link } from "react-router-dom";

export default function AboutClub() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, user not authenticated");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const adminUsers = Array.isArray(data)
          ? data.filter((user) => user.role === "admin" || user.role === "superadmin")
          : data.role === "admin"
          ? [data]
          : [];

        setAdmins(adminUsers);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-700 px-6 py-12">
        {/* About Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-violet-700 bg-clip-text text-transparent">
            About Our Club
          </h1>
          <p className="text-lg opacity-90 text-gray-700">
            Our club is a vibrant community dedicated to fostering innovation,
            teamwork, and skill development. We provide a platform where
            like-minded individuals come together to learn, grow, and contribute
            towards a greater goal.
          </p>
        </div>

        {/* Messages Section */}
        <div className="max-w-5xl mx-auto mt-16 space-y-12">
          {/* Message by Director */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center">
              <img
                src={director}
                alt="Director"
                className="w-60 h-56 object-cover border-[6px] border-blue-600 rounded-lg shadow-lg"
              />
              <h3 className="text-xl font-semibold mt-3">Dr. B.K. Tripathi</h3>
              <p className="text-gray-600">Director</p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold text-blue-700">Message from Director</h2>
              <p className="mt-4 text-lg text-gray-700">
                "Our club serves as a beacon of excellence, fostering creativity and
                leadership among students. Let’s continue to innovate and inspire!"
              </p>
            </div>
          </div>

          {/* Message by HOD */}
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center">
              <img
                src={hod}
                alt="HOD"
                className="w-60 h-56 object-cover border-[6px] border-blue-600 rounded-lg shadow-lg"
              />
              <h3 className="text-xl items-center font-semibold mt-3">Dr. Tauseef Ahmed</h3>
              <p className="text-gray-600">Head of Department IT'D</p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold text-blue-700">Message from HOD</h2>
              <p className="mt-4 text-lg text-gray-700">
                "As the Head of the Department, I take pride in seeing our students
                actively engage in learning and collaborative growth through this club."
              </p>
            </div>
          </div>

          {/* Message by Club President */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center">
              <img
                src={president}
                alt="Club President"
                className="w-60 h-56 object-cover border-[6px] border-blue-600 rounded-lg shadow-lg"
              />
              <h3 className="text-xl font-semibold mt-3">Mo.Aqib</h3>
              <p className="text-gray-600">Club President</p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold text-blue-700">Message from Club President</h2>
              <p className="mt-4 text-lg text-gray-700">
                "This club is a family of learners, builders, and dreamers. Together,
                we strive to create an environment that fosters personal and
                professional growth."
              </p>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="max-w-5xl mx-auto mt-16 p-8 bg-gradient-to-r from-blue-500 to-violet-700 text-white rounded-2xl shadow-2xl transform transition-all hover:scale-105 relative flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Club Logo"
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto mb-6"
          />
          <h2 className="text-3xl font-semibold mb-6">Aim & Objectives</h2>
          <ul className="list-disc pl-8 space-y-3 text-lg text-left sm:text-center">
            <li>To provide a platform for members to learn and grow.</li>
            <li>To encourage collaboration and teamwork in projects.</li>
            <li>To organize events, workshops, and competitions.</li>
            <li>To contribute to social and technological advancements.</li>
          </ul>
        </div>

        {/* Club Committee Section */}
      <div className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-violet-700 bg-clip-text text-transparent">
          Club Committee
        </h2>
        <p className="text-lg text-center text-gray-600 mt-2">
          Meet our amazing club administrators!
        </p>

        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {admins.length > 0 ? (
            admins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${admin.photo}`}
                  alt={admin.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-violet-500 hover:border-blue-500 transition-all"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {admin.name}
                </h3>
                <p className="text-gray-600">{admin.email}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg mt-6 text-gray-600">No admins found.</p>
          )}
        </div>
      

      {/* Gradient Divider */}
      <div className="max-w-5xl mx-auto mt-20 h-1 bg-gradient-to-r from-blue-500 to-violet-700 rounded-full"></div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-violet-700 bg-clip-text text-transparent">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Ready to be part of something amazing? Join us today and start your journey
          towards innovation and growth.
        </p>
        <Link to="/contact">
        <button className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500 ">
          Join Now
        </button>
        </Link>
      </div>
    </div>
    </div>
    </div>
  );
}