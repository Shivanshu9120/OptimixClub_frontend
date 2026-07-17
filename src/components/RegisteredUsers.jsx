import { useState, useEffect } from "react";

const EventRegistrations = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [openEvent, setOpenEvent] = useState(null);

  useEffect(() => {
    // Fetch events
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));

    // Fetch registrations
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/registrations`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRegistrations(data))
      .catch((err) => console.error("Error fetching registrations:", err));
  }, []);

  const toggleUserList = (eventId) => {
    setOpenEvent(openEvent === eventId ? null : eventId);
  };

  return (
    <div className="p-6">
      <div className="relative text-center">
      <h1 className="relative text-4xl mb-4 font-extrabold text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
            Registered Events
        </span>
        </h1>
     </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          const approvedUsers = registrations.filter(
            (reg) => reg.event._id === event._id && reg.status === "approved"
          ).length;

          return (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden h-[460px] flex flex-col transition-all duration-500"
            >
              {/* Event Image */}
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${event.picture}`}
                alt={event.name}
                className="w-full h-40 object-cover"
              />

              {/* Event Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-center text-gray-700">{event.name}</h2>

                {/* Display Number of Approved Users */}
                <p className="text-center mt-2 text-sm text-gray-600">
                  Approved Users: <span className="font-bold text-blue-600">{approvedUsers}</span>
                </p>

                <button
                  onClick={() => toggleUserList(event._id)}
                  className="mt-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700  hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500 text-white rounded-lg py-2 px-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:animate-gradient"
                >
                  {openEvent === event._id ? "Hide Users" : "View Registered Users"}
                </button>

                {/* Registered Users List (Hidden by Default) */}
                <div className={`mt-3 transition-all duration-500 ${openEvent === event._id ? "h-40" : "h-0"}`}>
                  <div className={`bg-gray-100 p-3 rounded-lg h-40 overflow-y-auto scrollbar-hide ${openEvent === event._id ? "block" : "hidden"}`}>
                    <h3 className="font-semibold mb-2 text-gray-800">Approved Users:</h3>
                    <ul className="space-y-2">
                      {approvedUsers > 0 ? (
                        registrations
                          .filter((reg) => reg.event._id === event._id && reg.status === "approved")
                          .map((reg) => (
                            <li key={reg._id} className="flex items-center p-2 rounded-lg bg-white shadow">
                              <img
                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${reg.user.photo}`}
                                alt={reg.user.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <p className="font-medium text-gray-800">{reg.user.name}</p>
                                <p className="text-sm text-gray-600">{reg.user.email}</p>
                                <p className="text-xs text-gray-500">
                                  {reg.branch}, Year {reg.year}
                                </p>
                              </div>
                            </li>
                          ))
                      ) : (
                        <p className="text-sm text-gray-500 italic text-center">
                          No users registered yet.
                        </p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventRegistrations;
