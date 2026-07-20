import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { CardSkeleton } from "./SkeletonLoader";

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>";

const UsersPage = () => {
  const fileInputRef = useRef(null);
  const [users, setUsers] = useState([]);

  const getAvatarUrl = (photo) => {
    if (photo && photo !== "null" && photo !== "undefined" && photo !== "") {
      return `${import.meta.env.VITE_API_BASE_URL}/uploads/${photo}`;
    }
    return DEFAULT_AVATAR;
  };
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters and Selection
  const [filterRole, setFilterRole] = useState("all"); // "all", "admin", "student", "superadmin"
  const [selectedUser, setSelectedUser] = useState(null);

  // Edit states inside ID Card Modal
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  // Fetch Logged-in User
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`, {
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
  const promoteToAdmin = async (e, userId) => {
    e.stopPropagation(); // Prevent opening modal
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ role: "admin" }),
      });

      if (response.ok) {
        Swal.fire("Success!", "User promoted to admin!", "success");
        fetchUsers();
      } else {
        Swal.fire("Failed!", "Failed to promote!", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Open ID Card Modal
  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setEditName(user.name || "");
    setEditEmail(user.email || "");
    setEditRole(user.role || "");
    setEditFile(null);
  };

  // Close ID Card Modal
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  // Update User details inside ID Card
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("email", editEmail);
    formData.append("role", editRole);
    if (editFile) {
      formData.append("photo", editFile);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        Swal.fire("Updated!", "User details updated successfully.", "success");
        setSelectedUser(null);
        fetchUsers();
      } else {
        const errorData = await response.json();
        Swal.fire("Failed!", errorData.msg || "Could not update user.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed from the club registry!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#4f46e5",
      confirmButtonText: "Yes, delete user!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user/${userId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            Swal.fire("Deleted!", "User has been removed.", "success");
            setSelectedUser(null);
            fetchUsers();
          } else {
            Swal.fire("Failed!", "Failed to delete user.", "error");
          }
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    if (filterRole === "all") return true;
    return user.role === filterRole;
  });

  return (
    <div className="w-full">
      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-6">
        {["all", "admin", "student", "superadmin"].map((role) => (
          <button
            key={role}
            onClick={() => setFilterRole(role)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
              filterRole === role
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50"
            }`}
          >
            {role === "all" ? "🌐 Show All" : role}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton count={6} type="user" />
        </div>
      )}
      {error && <p className="text-rose-500 text-center py-10 font-bold">{error}</p>}

      {/* ── Users Card Grid ── */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleOpenDetails(user)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 text-center transition-all duration-300 hover:shadow-md hover:border-indigo-500 hover:scale-[1.01] cursor-pointer flex flex-col justify-between"
            >
              <div>
                <img
                  src={getAvatarUrl(user.photo)}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border border-slate-200 dark:border-slate-800 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />
                <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">{user.name}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">{user.email}</p>
                
                <span
                  className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    user.role === "superadmin"
                      ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/50"
                      : user.role === "admin"
                      ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50"
                      : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Action Area */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                {user.role !== "admin" && user.role !== "superadmin" ? (
                  <button
                    onClick={(e) => promoteToAdmin(e, user._id)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
                  >
                    Promote to Admin
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                    Privileged Member
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Beautiful ID Card Modal Overlay ── */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={handleCloseModal} />

          {/* ID Card Wrapper */}
          <div className="relative bg-slate-900 text-white border-2 border-slate-800 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl z-10 transition-all duration-300 animate-scaleIn flex flex-col p-6 items-center">
            
            {/* Lanyard Slot Cutout */}
            <div className="w-12 h-3 bg-slate-950 rounded-full border border-slate-800 mb-6 shrink-0 shadow-inner" />

            {/* ID Card Header */}
            <div className="text-center w-full pb-4 border-b border-dashed border-slate-800">
              <h3 className="text-xs font-black tracking-widest text-indigo-400 uppercase">OPTIMIX CLUB</h3>
              <p className="text-[9px] text-slate-400 font-extrabold tracking-wider mt-0.5">DIGITAL MEMBERSHIP PASS</p>
            </div>

            {/* Photo & Role Badge */}
            <div className="my-6 relative flex flex-col items-center">
              <div className="relative w-24 h-24">
                {/* Circular image container */}
                <div 
                  onClick={currentUser?.role === "superadmin" ? () => fileInputRef.current.click() : undefined}
                  className={`w-full h-full rounded-full overflow-hidden border-4 border-indigo-500/80 shadow-lg shadow-indigo-500/20 relative ${
                    currentUser?.role === "superadmin" ? "cursor-pointer" : ""
                  }`}
                >
                  <img
                    src={
                      editFile
                        ? URL.createObjectURL(editFile)
                        : getAvatarUrl(selectedUser.photo)
                    }
                    alt={selectedUser.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_AVATAR;
                    }}
                  />
                  {currentUser?.role === "superadmin" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors duration-200 hover:bg-black/50">
                      <svg className="w-6 h-6 text-white/90 drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              
              {currentUser?.role === "superadmin" && (
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setEditFile(e.target.files[0])}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              )}
              
              <span className="absolute -bottom-3 bg-indigo-600 text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider border border-slate-900 shadow">
                {selectedUser.role}
              </span>
            </div>

            {/* Form Fields (Editable for Superadmin) */}
            {currentUser?.role === "superadmin" ? (
              <form onSubmit={handleUpdateUser} className="w-full space-y-3.5 my-2">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">MEMBER NAME</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="w-full p-2 bg-slate-950/80 border border-slate-800 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                    className="w-full p-2 bg-slate-950/80 border border-slate-800 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">DESIGNATED ROLE</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full p-2 bg-slate-950/80 border border-slate-800 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-semibold"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Superadmin</option>
                  </select>
                </div>

                {/* ID Card Footer - Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(selectedUser._id)}
                    className="p-2.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-500 rounded-xl transition duration-150"
                    title="Remove user permanently"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="flex gap-2 flex-grow justify-end">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-[10px] uppercase tracking-wider transition"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider transition shadow-md shadow-indigo-500/20"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              // View details only (For non-superadmins)
              <div className="w-full space-y-4 my-2 text-center">
                <div>
                  <span className="block text-[8px] tracking-widest text-slate-400 font-black">MEMBER ID</span>
                  <span className="text-xs font-semibold text-slate-350">{selectedUser._id}</span>
                </div>
                <div>
                  <span className="block text-[8px] tracking-widest text-slate-400 font-black">EMAIL ADDRESS</span>
                  <span className="text-xs font-semibold text-slate-350">{selectedUser.email}</span>
                </div>
                
                {/* Barcode Mock */}
                <div className="pt-2 pb-1 shrink-0 flex flex-col items-center">
                  <div className="h-8 w-44 bg-white/10 rounded flex items-center justify-around px-2 py-1 select-none">
                    <span className="w-[2px] h-full bg-slate-400"></span>
                    <span className="w-[1px] h-full bg-slate-400"></span>
                    <span className="w-[4px] h-full bg-slate-400"></span>
                    <span className="w-[2px] h-full bg-slate-400"></span>
                    <span className="w-[1px] h-full bg-slate-400"></span>
                    <span className="w-[3px] h-full bg-slate-400"></span>
                    <span className="w-[2px] h-full bg-slate-400"></span>
                    <span className="w-[1px] h-full bg-slate-400"></span>
                    <span className="w-[4px] h-full bg-slate-400"></span>
                  </div>
                  <span className="text-[7px] text-slate-500 mt-1 font-mono tracking-widest">OPMX-{selectedUser._id.substring(0, 8).toUpperCase()}</span>
                </div>

                <div className="pt-4 border-t border-slate-850 w-full flex justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-[10px] uppercase tracking-wider transition"
                  >
                    Close Pass
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
