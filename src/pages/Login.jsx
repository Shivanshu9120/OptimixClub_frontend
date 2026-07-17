import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const Login = () => {
  // State to track login or signup mode
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo,setPhoto] = useState(null) //Store uploaded photo
  const [loading, setLoading] = useState(false); // To disable button during request
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button to prevent multiple requests

    const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Update if backend is deployed
    const endpoint = isSignup ? `${BASE_URL}/api/auth/signup` : `${BASE_URL}/api/auth/login`;

    //Use formdata if signing up with an image
    let requestBody;
  let headers = {}; // No headers for FormData

  if (isSignup) {
    if (photo) {
      // Use FormData when uploading a photo
      requestBody = new FormData();
      requestBody.append("name", name);
      requestBody.append("email", email);
      requestBody.append("password", password);
      requestBody.append("photo", photo);
    } else {
      // Use JSON if no photo is uploaded
      requestBody = JSON.stringify({ name, email, password });
      headers["Content-Type"] = "application/json";
    }
  } else {
    // Login request always uses JSON
    requestBody = JSON.stringify({ email, password });
    headers["Content-Type"] = "application/json";
  }


    // const payload = isSignup
    //   ? { name, email, password, role,  } // Signup requires name & role
    //   : { email, password }; // Login only requires email & password

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: isSignup ? {} : { "Content-Type": "application/json" }, // No headers for FormData
        // body: JSON.stringify(payload),
        body: requestBody,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if(data.photo) localStorage.setItem("photo",data.photo); //store photo url if avavilable

        // Redirect user based on role
        if (data.role === "admin") {
          Swal.fire("Success!", isSignup ? "Admin registered successfully" : "Admin logged in successfully", "success");
          navigate("/admin-dashboard");
        }
        else if (data.role === "superadmin") {
          Swal.fire("Success!", isSignup ? "SuperAdmin registered successfully" : "SuperAdmin logged in successfully", "success");
          navigate("/admin-dashboard");
        }
         else if (data.role === "student") {
          Swal.fire("Success!", isSignup ? "Student registered successfully" : "Student logged in successfully", "success");
          navigate("/user-dashboard");
        } else {
          navigate("/home");
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div>
      <Navbar/>
      </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Show Name & Role and photo fields only for Sign Up */}
          {isSignup && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  aria-label="Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border rounded-md"
                  onChange={(e)=> setPhoto(e.target.files[0])}
                  />
              </div>
            </>
          )}
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-md ${loading ? "bg-gray-400" : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500"}`}
            disabled={loading}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        {/* Toggle between Login and Signup */}
        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
    <div className="mt-auto">
      <Footer/>
    </div>
    </div>
  );
};

export default Login;