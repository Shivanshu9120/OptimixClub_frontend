import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { FaUser, FaUserGraduate, FaCalendarAlt, FaIdCard, FaPhone, FaArrowRight, FaCamera } from "react-icons/fa";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire("Validation Error!", "Please enter your full name.", "error");
      return;
    }
    if (!gender) {
      Swal.fire("Validation Error!", "Please select your gender.", "error");
      return;
    }
    if (!dob) {
      Swal.fire("Validation Error!", "Please enter your date of birth.", "error");
      return;
    }
    if (!rollNo.trim()) {
      Swal.fire("Validation Error!", "Please enter your roll number.", "error");
      return;
    }
    if (!branch) {
      Swal.fire("Validation Error!", "Please select your branch.", "error");
      return;
    }
    if (!year) {
      Swal.fire("Validation Error!", "Please select your year.", "error");
      return;
    }
    if (!contact.trim() || contact.length < 10) {
      Swal.fire("Validation Error!", "Please enter a valid 10-digit contact number.", "error");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Authentication Error!", "Please login first to onboard.", "error");
      navigate("/login");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("rollNo", rollNo);
    formData.append("branch", branch);
    formData.append("year", year);
    formData.append("contact", contact);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/onboard`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success!", "Profile completed successfully! Welcome to Optimix Club.", "success");
        
        // Save to local storage for instant header sync
        if (data.user?.name) localStorage.setItem("name", data.user.name);
        if (data.user?.photo) localStorage.setItem("photo", data.user.photo);
        localStorage.setItem("isOnboarded", "true");
        
        const role = localStorage.getItem("role");
        if (role === "admin" || role === "superadmin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        Swal.fire("Error!", data.msg || "Onboarding submission failed.", "error");
      }
    } catch (error) {
      console.error("Onboarding Error", error);
      Swal.fire("Error!", "Server connection error. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Soft background light/dark blur blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full glow-blob-indigo blur-[120px] pointer-events-none z-0 opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full glow-blob-amber blur-[120px] pointer-events-none z-0 opacity-15" />

        <div className="relative z-10 w-full max-w-2xl p-8 md:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl transition-all duration-300">
          <div className="text-center mb-8">
            <span className="inline-block bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-950/60 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
              Profile Setup
            </span>
            <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Complete Your Onboarding
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Welcome aboard! Tell us a little more about yourself so you can participate in club events, quizzes, and workshops.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Upload with Circular Preview */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative group cursor-pointer">
                <img
                  src={
                    photoPreview ||
                    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>"
                  }
                  alt="Avatar Preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-slate-100 dark:border-slate-800 shadow-md group-hover:scale-[1.02] transition duration-200"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>";
                  }}
                />
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 shadow-lg cursor-pointer transition-colors border-2 border-white dark:border-slate-900">
                  <FaCamera size={14} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-semibold">
                Upload Profile Picture (Optional)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaUser className="text-slate-400" /> Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-semibold"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaUserGraduate className="text-slate-400" /> Gender <span className="text-rose-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-semibold cursor-pointer"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-slate-400" /> Date of Birth <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-semibold cursor-pointer"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaIdCard className="text-slate-400" /> Roll Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-semibold"
                  placeholder="e.g. 2100840130001"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                />
              </div>

              {/* Branch */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaUserGraduate className="text-slate-400" /> Branch <span className="text-rose-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-semibold cursor-pointer"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="ME">Mechanical Engineering (ME)</option>
                  <option value="CE">Civil Engineering (CE)</option>
                </select>
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaCalendarAlt className="text-slate-400" /> Academic Year <span className="text-rose-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-semibold cursor-pointer"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              {/* Contact */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaPhone className="text-slate-400" /> Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm font-semibold"
                  placeholder="e.g. 9876543210"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 text-white font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Submitting details..."
              ) : (
                <>
                  Complete Setup <FaArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Onboarding;
