import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, user not authenticated");
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://optimixclub-backend.onrender.com/api/auth/user", {
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
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-full bg-white p-16 rounded-xl shadow-lg text-center border border-gray-200">
        {loading ? (
          <p className="text-gray-500">Loading user info...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : userInfo ? (
          <div>
            <img
              src={`https://optimixclub-backend.onrender.com/uploads/${userInfo.photo}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border border-gray-300"
            />
            <h2 className="text-xl font-semibold">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.email}</p>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full mt-2 inline-block">
              {userInfo.role}
            </span>

            {/* Admin/Superadmin Buttons */}
            {(userInfo.role === "admin" || userInfo.role === "superadmin") && (
              <div className="mt-6 flex flex-col gap-3">
                <Link to={"/picture-form"}>
                  <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                    Add Picture
                  </button>
                </Link>

                <Link to={"/registration-list"}>
                  <button className="bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                    Registrations
                  </button>
                </Link>

                <Link to={"/users-form"}>
                  <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                    Users List
                  </button>
                </Link>

                <Link to={"/registered-users"}>
                  <button className="bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                    Event Registrations
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">User data not available</p>
        )}
      </div>
    </div>
  );
};
