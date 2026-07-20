import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const RegistrationForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchEvent();
    fetchUser();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not found! Please log in again.");
      return;
    }

    const registrationData = {
      user: user._id,
      eventId,
      branch,
      year,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        Swal.fire("Submitted!", "Submitted for approval!", "success");
        navigate("/");
      } else {
        Swal.fire("Error!", "Failed to register. Please try again", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire("Error!", "Failed to register. Please try again", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Soft blur decorations */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full glow-blob-indigo blur-[120px] pointer-events-none z-0 opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full glow-blob-amber blur-[120px] pointer-events-none z-0 opacity-30" />

        <div className="relative z-10 w-full max-w-md p-8 rounded-3xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300">
          {event ? (
            <>
              <div className="text-center mb-6">
                <span className="inline-block bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Event Registration
                </span>
                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight leading-tight">{event.name}</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Branch Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="block w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm font-medium"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="ME">Mechanical Engineering (ME)</option>
                    <option value="CE">Civil Engineering (CE)</option>
                  </select>
                </div>

                {/* Year Selection */}
                <div>
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="block w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm font-medium"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-6 w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all transform hover:scale-[1.02]"
                >
                  Submit Registration
                </button>
              </form>
            </>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 font-bold animate-pulse py-8">Loading event details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
