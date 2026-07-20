import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EventRegistrations = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));

    // Fetch registrations
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/registrations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch((err) => console.error("Error fetching registrations:", err));
  }, []);

  const closePortalModal = () => setSelectedEvent(null);

  return (
    <div className="p-6">
      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const approvedUsersList = registrations.filter(
            (reg) => reg.event._id === event._id && reg.status === "approved"
          );
          const approvedCount = approvedUsersList.length;

          return (
            <div
              key={event._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-500 hover:shadow-md transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${event.picture}`}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 line-clamp-1">{event.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    Approved Registrations: <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{approvedCount}</span>
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/admin-dashboard/event-registrations/${event._id}`)}
                  className="mt-6 w-full py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-sm hover:shadow-md"
                >
                  View Approved Users
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventRegistrations;
