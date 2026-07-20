import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import logo from "../assets/images/logo.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [photo,setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      if (!isPasswordValid) {
        Swal.fire("Validation Error!", "Please ensure your password meets all complexity requirements.", "error");
        return;
      }
      if (password !== confirmPassword) {
        Swal.fire("Validation Error!", "Passwords do not match.", "error");
        return;
      }
      if (!agreeTerms) {
        Swal.fire("Validation Error!", "You must agree to the Terms & Conditions.", "error");
        return;
      }
    }

    setLoading(true);


    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const endpoint = isSignup ? `${BASE_URL}/api/auth/signup` : `${BASE_URL}/api/auth/login`;

    let requestBody;
    let headers = {};

    requestBody = JSON.stringify({ email, password });
    headers["Content-Type"] = "application/json";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: headers,
        body: requestBody,
      });


      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("isOnboarded", data.isOnboarded !== undefined ? data.isOnboarded : "false");
        const userName = data.name || data.user?.name;
        if (userName) localStorage.setItem("name", userName);

        if(data.photo || data.user?.photo) localStorage.setItem("photo", data.photo || data.user?.photo);

        if (isSignup) {
          Swal.fire("Success!", "Account registered successfully! Let's complete your profile onboarding.", "success");
          navigate("/onboarding");
        } else {
          Swal.fire("Success!", "Logged in successfully", "success");
          if (data.isOnboarded === false) {
            navigate("/onboarding");
          } else if (data.role === "admin" || data.role === "superadmin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        }
      } else {
        Swal.fire("Error!", data.message || "Invalid credentials. Please try again", "error");
      }
    } catch (error) {
      console.error("Server Error", error)
      Swal.fire("Error!", "Server error. Please try again later", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Left Side: Branding/Illustration Column (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 relative overflow-hidden items-center justify-center p-12 text-white">
          {/* Math decorations */}
          <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-40">
            <div className="absolute inset-0 math-lines" />
            <span className="absolute top-10 left-[10%] text-[100px] font-serif font-bold text-white/5 rotate-12 leading-none">Σ</span>
            <span className="absolute bottom-[20%] right-[10%] text-[80px] font-serif text-white/5 -rotate-12 leading-none">∞</span>
            <span className="absolute top-[40%] right-[15%] text-[50px] font-mono text-white/5 rotate-6">λ</span>
          </div>

          <div className="relative z-10 text-center max-w-md">
            <img src={logo} alt="Club Logo" className="w-24 h-24 rounded-full border-2 border-indigo-400 mx-auto shadow-lg mb-6" />
            <h1 className="text-4xl font-black tracking-tight leading-tight">
              OPTIMIX CLUB
            </h1>
            <p className="text-indigo-300 font-extrabold uppercase tracking-widest text-xs mt-1.5">
              Empowering Student Innovators
            </p>
            <p className="text-slate-400 mt-4 leading-relaxed text-sm">
              Sign up or log in to register for upcoming hackathons, tech quizzes, workshops, and manage notice announcements.
            </p>
          </div>
        </div>

        {/* Right Side: Form Column */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
          {/* Mobile blurs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full glow-blob-indigo blur-[120px] pointer-events-none z-0 opacity-20 lg:hidden" />

          <div className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-3xl transition-all duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isSignup ? "Sign up to join our student community" : "Enter your credentials to access your dashboard"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name and Upload Photo inputs are removed; they will be filled in the onboarding flow. */}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
                  placeholder="name@recazamgarh.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Password Validation Checklist */}
              {isSignup && (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl space-y-1.5 text-[11px] font-semibold transition-all">
                  <p className="text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[9px] font-black">Password Requirements</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-slate-600 dark:text-slate-400">
                    <div className={`flex items-center gap-1.5 transition-colors ${hasMinLength ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                      <span className={hasMinLength ? "text-emerald-500" : "text-rose-455"}>{hasMinLength ? "✓" : "✗"}</span>
                      <span>Min 6 characters</span>
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors ${hasUpperCase ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                      <span className={hasUpperCase ? "text-emerald-500" : "text-rose-455"}>{hasUpperCase ? "✓" : "✗"}</span>
                      <span>One uppercase</span>
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors ${hasLowerCase ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                      <span className={hasLowerCase ? "text-emerald-500" : "text-rose-455"}>{hasLowerCase ? "✓" : "✗"}</span>
                      <span>One lowercase</span>
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors ${hasNumber ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                      <span className={hasNumber ? "text-emerald-500" : "text-rose-455"}>{hasNumber ? "✓" : "✗"}</span>
                      <span>One number</span>
                    </div>
                    <div className={`flex items-center gap-1.5 transition-colors ${hasSpecialChar ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                      <span className={hasSpecialChar ? "text-emerald-500" : "text-rose-455"}>{hasSpecialChar ? "✓" : "✗"}</span>
                      <span>One special char</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Password Input */}
              {isSignup && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full pl-4 pr-10 py-3 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      aria-label="Confirm Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-655 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                  {confirmPassword && (
                    <p className={`text-[11px] font-bold mt-1.5 ${password === confirmPassword ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-455"}`}>
                      {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
                    </p>
                  )}
                </div>
              )}

              {/* Agree to Terms & Conditions Checkbox */}
              {isSignup && (
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed cursor-pointer select-none">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </label>
                </div>
              )}


              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all"
                disabled={loading}
              >
                {loading ? "Processing..." : isSignup ? "Create Account" : "Sign In"}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;