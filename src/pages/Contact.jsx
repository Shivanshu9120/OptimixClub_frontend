"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import logo from "../assets/images/logo.jpg";
import Swal from 'sweetalert2'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      Swal.fire(
                'Message Created!',
                'Your message has been sent.',
                'success'
              );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire(
        'Failed!',
        'Message sending failed.Try again!',
        'error'
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-700 px-6 py-12">
        {/* Contact Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-violet-700 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg opacity-90 text-gray-700">
            Have questions, suggestions, or just want to say hello? Reach out to us!
          </p>
        </div>

        {/* Contact Information */}
        <div className="max-w-5xl mx-auto mt-16 p-8 bg-gradient-to-r from-blue-500 to-violet-700 text-white rounded-2xl shadow-2xl transform transition-all hover:scale-105 flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Club Logo"
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto mb-6"
          />
          <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-200">
            Email: <span className="font-semibold">optimixclub@gmail.com</span>
          </p>
          <p className="text-lg text-gray-200">
            Phone: <span className="font-semibold">+91 9219159131</span>
          </p>
          <p className="text-lg text-gray-200">
            Address: <span className="font-semibold">Rajkiya Engineering College Azamgarh</span>
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-violet-700 bg-clip-text text-transparent">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Gradient Divider */}
        <div className="max-w-5xl mx-auto mt-20 h-1 bg-gradient-to-r from-blue-500 to-violet-700 rounded-full"></div>
      </div>
    </div>
  );
}
