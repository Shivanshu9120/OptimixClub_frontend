import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  // Fetch Logged-in User
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("https://optimixclub-backend.onrender.com/api/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  // Fetch All Users
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://optimixclub-backend.onrender.com/api/auth/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Promote User to Admin
  const promoteToAdmin = async (userId) => {
    try {
      const response = await fetch(`https://optimixclub-backend.onrender.com/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: "admin" }),
      });

      if (response.ok) {
        Swal.fire("Success!", "User promoted to admin!", "success");
      } else {
        Swal.fire("Failed!", "Failed to promote!", "error");
      }

      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle Edit User Details
  const handleEditUser = (user) => {
    Swal.fire({
      title: "Edit User Details",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${user.name}">
        <input id="swal-email" class="swal2-input" placeholder="Email" value="${user.email}">
        <select id="swal-role" class="swal2-input">
          <option value="student" ${user.role === "student" ? "selected" : ""}>Student</option>
          <option value="admin" ${user.role === "admin" ? "selected" : ""}>Admin</option>
          <option value="superadmin" ${user.role === "superadmin" ? "selected" : ""}>Superadmin</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          email: document.getElementById("swal-email").value,
          role: document.getElementById("swal-role").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateUser(user._id, result.value);
      }
    });
  };

  // Update User API Call
  const updateUser = async (userId, userData) => {
    try {
      const response = await fetch(`https://optimixclub-backend.onrender.com/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Swal.fire("Updated!", "User details updated successfully.", "success");
        fetchUsers(); // Refresh users list
      } else {
        const errorData = await response.json();
        Swal.fire("Failed!", errorData.msg || "Could not update user.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-violet-700 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-white text-3xl font-bold mb-6">
          Registered Users
        </h1>

        {loading && <p className="text-white text-center">Loading users...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-lg shadow-lg p-4 text-center">
              <img
                src={`https://optimixclub-backend.onrender.com/uploads/${user.photo}`}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border border-gray-300"
              />
              <h2 className="text-xl font-bold text-blue-700">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className={`font-semibold ${user.role === "admin" ? "text-green-600" : "text-violet-600"}`}>
                {user.role}
              </p>

              {user.role !== "admin" && user.role !== "superadmin" && (
                <button
                  onClick={() => promoteToAdmin(user._id)}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Promote to Admin
                </button>
              )}

              {currentUser?.role === "superadmin" && (
                <button
                  onClick={() => handleEditUser(user)}
                  className="mt-3 ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit Details
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
