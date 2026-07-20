import React, { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ProfileSkeleton } from "./SkeletonLoader";
import { Spinner } from "./Loader";

export const Profile = ({ hideActions = false }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editDob, setEditDob] = useState("");
  const [editRollNo, setEditRollNo] = useState("");
  const [editBranch, setEditBranch] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editContact, setEditContact] = useState("");
  const [editPhoto, setEditPhoto] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const fileInputRef = useRef(null);


  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, user not authenticated");
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
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
      localStorage.setItem("isOnboarded", data.isOnboarded);
      setEditName(data.name || "");
      setEditEmail(data.email || "");
      setEditGender(data.gender || "");
      setEditDob(data.dob ? new Date(data.dob).toISOString().split('T')[0] : "");
      setEditRollNo(data.rollNo || "");
      setEditBranch(data.branch || "");
      setEditYear(data.year || "");
      setEditContact(data.contact || "");
    } catch (error) {
      console.error("Error fetching user info:", error);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("email", editEmail);
    formData.append("gender", editGender);
    formData.append("dob", editDob);
    formData.append("rollNo", editRollNo);
    formData.append("branch", editBranch);
    formData.append("year", editYear);
    formData.append("contact", editContact);
    if (editPhoto) {
      formData.append("photo", editPhoto);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user/${userInfo._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Updated!", "Profile details updated successfully!", "success");
        
        // Sync local storage so header sidebar displays correctly immediately
        if (data.user?.name) localStorage.setItem("name", data.user.name);
        if (data.user?.photo) localStorage.setItem("photo", data.user.photo);

        setIsEditing(false);
        setEditPhoto(null);
        
        // Reload state
        await fetchUserInfo();
      } else {
        Swal.fire("Error!", data.msg || "Failed to update profile", "error");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      Swal.fire("Error!", "Server connection failed.", "error");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full justify-center">
        <ProfileSkeleton />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300">
        {error ? (
          <p className="text-rose-500 text-center py-8 font-bold">{error}</p>
        ) : userInfo ? (
          <form onSubmit={handleUpdateProfile} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
              
              {/* ── Left Column: Avatar & Quick Info ── */}
              <div className="md:col-span-1 flex flex-col items-center text-center md:border-r border-slate-100 dark:border-slate-800/80 pb-6 md:pb-0 md:pr-8">

                <div className="relative group cursor-pointer mb-6">
                  {/* Profile Photo Display with dynamic preview */}
                  <img
                    src={
                      editPhoto
                        ? URL.createObjectURL(editPhoto)
                        : userInfo.photo && userInfo.photo !== "null" && userInfo.photo !== "undefined"
                        ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${userInfo.photo}`
                        : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-md group-hover:scale-[1.02] transition duration-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>";
                    }}
                  />
                  {/* Photo Edit Pencil Trigger Overlay */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2.5 hover:bg-indigo-700 shadow-lg transition-colors border-2 border-white dark:border-slate-900"
                    title="Change Photo"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>

                {/* Hidden input file picker */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditPhoto(e.target.files[0]);
                      if (!isEditing) setIsEditing(true);
                    }
                  }}
                  className="hidden"
                />

                <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{userInfo.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">{userInfo.email}</p>
                
                <span className="px-4 py-1 text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-950/60 rounded-full mt-3.5 inline-block font-black uppercase tracking-wider">
                  {userInfo.role}
                </span>
              </div>

              {/* ── Right Column: Form with user fields ── */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">Account Details</h3>
                  <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">
                    {isEditing ? "Modify your profile information below." : "View your profile details. Click Edit to make changes."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={isEditing ? editName : (userInfo.name || "")}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                      disabled={!isEditing}
                      className={`w-full p-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        isEditing
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          : "bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      }`}
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={isEditing ? editEmail : userInfo.email}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                      disabled={!isEditing}
                      className={`w-full p-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        isEditing
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          : "bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      }`}
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Gender</label>
                    {isEditing ? (
                      <select
                        value={editGender}
                        onChange={(e) => setEditGender(e.target.value)}
                        required
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={userInfo.gender || "Not specified"}
                        disabled
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      />
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editDob}
                        onChange={(e) => setEditDob(e.target.value)}
                        required
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
                      />
                    ) : (
                      <input
                        type="text"
                        value={userInfo.dob ? new Date(userInfo.dob).toLocaleDateString() : "Not specified"}
                        disabled
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      />
                    )}
                  </div>

                  {/* Roll Number */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Roll Number</label>
                    <input
                      type="text"
                      value={isEditing ? editRollNo : (userInfo.rollNo || "Not specified")}
                      onChange={(e) => setEditRollNo(e.target.value)}
                      required
                      disabled={!isEditing}
                      className={`w-full p-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        isEditing
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          : "bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      }`}
                    />
                  </div>

                  {/* Branch */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Branch</label>
                    {isEditing ? (
                      <select
                        value={editBranch}
                        onChange={(e) => setEditBranch(e.target.value)}
                        required
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="">Select Branch</option>
                        <option value="IT">Information Technology (IT)</option>
                        <option value="ME">Mechanical Engineering (ME)</option>
                        <option value="CE">Civil Engineering (CE)</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={userInfo.branch || "Not specified"}
                        disabled
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      />
                    )}
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Academic Year</label>
                    {isEditing ? (
                      <select
                        value={editYear}
                        onChange={(e) => setEditYear(e.target.value)}
                        required
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={userInfo.year ? `${userInfo.year}${userInfo.year === '1' ? 'st' : userInfo.year === '2' ? 'nd' : userInfo.year === '3' ? 'rd' : 'th'} Year` : "Not specified"}
                        disabled
                        className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      />
                    )}
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Contact Number</label>
                    <input
                      type="tel"
                      value={isEditing ? editContact : (userInfo.contact || "Not specified")}
                      onChange={(e) => setEditContact(e.target.value)}
                      required
                      maxLength={10}
                      disabled={!isEditing}
                      className={`w-full p-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        isEditing
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          : "bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none"
                      }`}
                    />
                  </div>

                  {/* Role Display Input (Always Read-only) */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Account Role</label>
                    <input
                      type="text"
                      value={userInfo.role}
                      disabled
                      className="w-full p-3.5 rounded-2xl text-sm font-semibold bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed select-none capitalize"
                    />
                  </div>
                </div>

                {/* Edit & Save Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-end gap-3">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(true);
                        setEditName(userInfo.name || "");
                        setEditEmail(userInfo.email || "");
                        setEditGender(userInfo.gender || "");
                        setEditDob(userInfo.dob ? new Date(userInfo.dob).toISOString().split('T')[0] : "");
                        setEditRollNo(userInfo.rollNo || "");
                        setEditBranch(userInfo.branch || "");
                        setEditYear(userInfo.year || "");
                        setEditContact(userInfo.contact || "");
                      }}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-indigo-500/20"
                    >
                      ✏️ Edit Profile Details
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditPhoto(null);
                          setEditName(userInfo.name || "");
                          setEditEmail(userInfo.email || "");
                          setEditGender(userInfo.gender || "");
                          setEditDob(userInfo.dob ? new Date(userInfo.dob).toISOString().split('T')[0] : "");
                          setEditRollNo(userInfo.rollNo || "");
                          setEditBranch(userInfo.branch || "");
                          setEditYear(userInfo.year || "");
                          setEditContact(userInfo.contact || "");
                        }}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saveLoading}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-md hover:shadow-indigo-500/20"
                      >
                        {saveLoading ? (
                          <span className="flex items-center gap-2">
                            <Spinner size="xs" color="white" /> Saving...
                          </span>
                        ) : "Save Changes"}
                      </button>
                    </>
                  )}
                </div>

                {/* Admin Buttons if not dashboard-embedded */}
                {!hideActions && (userInfo.role === "admin" || userInfo.role === "superadmin") && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-4">
                    <Link to={"/picture-form"}>
                      <button type="button" className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 rounded-xl">
                        Add Picture
                      </button>
                    </Link>
                    <Link to={"/registration-list"}>
                      <button type="button" className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 rounded-xl">
                        Registrations
                      </button>
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </form>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-center py-8">User profile not found.</p>
        )}
      </div>
    </div>
  );
};


