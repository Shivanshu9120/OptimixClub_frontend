import { useEffect, useState } from "react";

const UserRegistrations = () => {
  const [user, setUser] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/registrations`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredRegistrations = data.filter(
          (reg) => reg.user._id === user._id
        );
        setUserRegistrations(filteredRegistrations);
      })
      .catch((err) =>
        console.error("Error fetching user registrations:", err)
      );
  }, [user]);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mx-6 mb-6">
      <h2 className="text-xl font-bold mb-3">Your Registered Events</h2>
      {userRegistrations.length > 0 ? (
        <ul>
          {userRegistrations.map((reg) => (
            <li
              key={reg._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="font-medium">{reg.event.name}</span>
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  reg.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {reg.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">You have not registered for any events.</p>
      )}
    </div>
  );
};

export default UserRegistrations;
