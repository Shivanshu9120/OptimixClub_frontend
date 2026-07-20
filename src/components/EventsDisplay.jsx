import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EventCard from "./EventCard";

const EventsDisplay = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling
  const [currentUser, setCurrentUser] = useState(null); // Store current user info
  const [userRegistrations, setUserRegistrations] = useState([]); // Store user's registrations

  const navigate = useNavigate();

  // Fetch events, user info, and user registrations
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        // 1. Fetch Events
        const eventsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`);
        if (!eventsResponse.ok) {
          throw new Error("Failed to fetch events");
        }
        const eventsData = await eventsResponse.json();
        const updatedEvents = eventsData.map(event => ({
          ...event,
          picture: `${import.meta.env.VITE_API_BASE_URL}/api/events/uploads/${event.picture}`
        }));
        setEvents(updatedEvents);

        // 2. Fetch User & Registrations if token exists
        if (token) {
          const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setCurrentUser(userData);

            const regResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/my-registrations`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (regResponse.ok) {
              const regData = await regResponse.json();
              setUserRegistrations(Array.isArray(regData) ? regData : []);
            }
          }
        }
      } catch (error) {
        console.error("Error loading events display data:", error);
        setError("Error loading page contents.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegisterClick = async (event) => {
    if (!currentUser) {
      Swal.fire("Authentication Error!", "Please log in first to register for events.", "error");
      navigate("/login");
      return;
    }

    // Verify if profile details exist (since onboarding is mandatory, they should exist, but safety first)
    if (!currentUser.branch || !currentUser.year) {
      Swal.fire({
        title: "Profile Incomplete!",
        text: "Please complete your student profile details first to register.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Profile",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user-dashboard");
        }
      });
      return;
    }

    const result = await Swal.fire({
      title: "Register for Event?",
      html: `Do you want to register for <strong>${event.name}</strong>?<br/><br/><div class="text-xs text-slate-500 dark:text-slate-400">Your profile details will be submitted:<br/>Branch: <strong>${currentUser.branch}</strong><br/>Year: <strong>${currentUser.year} Year</strong></div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5", // Indigo-600
      cancelButtonColor: "#475569", // Slate-600
      confirmButtonText: "Yes, Register Now",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId: event._id,
            branch: currentUser.branch,
            year: parseInt(currentUser.year, 10),
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Registered!", "Submitted for approval successfully!", "success");
          
          // Instantly update local registrations state
          setUserRegistrations(prev => [...prev, { event: { _id: event._id }, user: { _id: currentUser._id } }]);
          
          navigate("/user-dashboard/registrations");
        } else {
          Swal.fire("Error!", data.msg || data.message || "Failed to register. Please try again.", "error");
        }
      } catch (error) {
        console.error("Registration error:", error);
        Swal.fire("Error!", "Connection failed. Please try again.", "error");
      }
    }
  };

  const isRegisteredForEvent = (eventId) => {
    return userRegistrations.some(reg => reg.event && reg.event._id === eventId);
  };

  return (
    <div className="w-full relative">
      <div className="py-4">
        {/* Show loading message */}
        {loading && <p className="text-center text-slate-500 dark:text-slate-400">Loading events...</p>}

        {/* Show error message if fetching failed */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Display event cards if events are available */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard 
                  key={event._id} 
                  {...event} 
                  onRegisterClick={() => handleRegisterClick(event)} 
                  isRegistered={isRegisteredForEvent(event._id)}
                />
              ))
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400 col-span-full">
                No upcoming events found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default EventsDisplay;
