import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
        const res = await fetch(`https://optimixclub-backend.onrender.com/api/events/${eventId}`);
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

        const res = await fetch("https://optimixclub-backend.onrender.com/api/auth/user", {
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
      const response = await fetch("https://optimixclub-backend.onrender.com/api/registration/", {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-500 to-violet-600">
        {event ? (
          <>
            <h2 className="text-2xl font-bold text-center">{event.name}</h2>
            
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Branch Selection */}
              <label className="block text-sm font-medium text-gray-100">Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="mt-1 block w-full p-2 rounded bg-white text-black shadow-sm"
                required
              >
                <option value="">Select Branch</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ME">Mechanical Engineering (ME)</option>
                <option value="CE">Civil Engineering (CE)</option>
              </select>

              {/* Year Selection */}
              <label className="block mt-3 text-sm font-medium text-gray-100">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1 block w-full p-2 rounded bg-white text-black shadow-sm"
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full px-6 py-2 bg-white text-blue-600 font-bold rounded-md shadow-md hover:bg-gray-200"
              >
                Submit Registration
              </button>
            </form>
          </>
        ) : (
          <p className="text-center">Loading event details...</p>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
