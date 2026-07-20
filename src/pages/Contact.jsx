import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/images/logo.jpg";
import Swal from 'sweetalert2';

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

      Swal.fire('Message Created!', 'Your message has been sent successfully.', 'success');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      Swal.fire('Failed!', 'Failed to send your message. Please check and try again.', 'error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 py-16 px-6 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-24 -left-36 w-96 h-96 rounded-full glow-blob-indigo blur-[120px] pointer-events-none z-0 opacity-30" />
        <div className="absolute bottom-24 -right-36 w-96 h-96 rounded-full glow-blob-amber blur-[120px] pointer-events-none z-0 opacity-20" />

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center relative z-10 mb-16">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Support
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Contact Our Team
          </h1>
          <p className="text-base md:text-lg text-slate-650 dark:text-slate-350 mt-4 leading-relaxed max-w-xl mx-auto">
            Have questions, feedback, or need assistance? Send us a message and our coordinators will reach out shortly.
          </p>
        </div>

        {/* Content Box */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
          
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            {/* Math layout lines decorative */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
              <span className="absolute bottom-6 right-6 text-[120px] font-bold select-none">∴</span>
            </div>

            <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
              <img
                src={logo}
                alt="Club Logo"
                className="w-20 h-20 rounded-full border-2 border-indigo-400 shadow-md object-cover mb-8"
              />
              <h2 className="text-2xl font-black tracking-tight mb-6">Get In Touch</h2>
              
              <ul className="space-y-6 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-indigo-600/35 border border-indigo-400/25 flex items-center justify-center text-indigo-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Support</span>
                    <a href="mailto:optimixclub@gmail.com" className="font-semibold text-white hover:underline">optimixclub@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-indigo-600/35 border border-indigo-400/25 flex items-center justify-center text-indigo-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Call Coordinators</span>
                    <a href="tel:+919219159131" className="font-semibold text-white hover:underline">+91 9219159131</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-indigo-600/35 border border-indigo-400/25 flex items-center justify-center text-indigo-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">HQ Address</span>
                    <span className="font-semibold text-white">Rajkiya Engineering College, Azamgarh, UP</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative z-10 text-xs text-slate-400 text-center lg:text-left mt-8 pt-6 border-t border-white/10 font-medium">
              We usually reply within 24 hours of form submission.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm font-medium"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Type your message here..."
                  className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm font-medium"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-6 w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
