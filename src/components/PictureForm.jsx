import React, { useState } from "react";
import Swal from "sweetalert2";

const PictureForm = ({ onSuccess }) => {
  const [pictures, setPictures] = useState([]);
  const [newPicture, setNewPicture] = useState({
    name: "",
    description: "",
    picture: "",
  });

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setNewPicture({ ...newPicture, picture: e.target.files[0] });
    } else {
      setNewPicture({ ...newPicture, [e.target.name]: e.target.value });
    }
  };

  // Submit new picture
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newPicture.name);
    formData.append("description", newPicture.description);
    formData.append("picture", newPicture.picture);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/picture/submit`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        Swal.fire("Error!", "Failed to post the picture. Please try again", "error");
        return;
      }

      setPictures([...pictures, responseData.pic]);
      setNewPicture({ name: "", description: "", picture: "" });

      Swal.fire("Picture posted!", "Your picture has been posted.", "success");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating picture", error);
      Swal.fire("Error!", "Error posting picture. Please try again", "error");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg rounded-2xl transition-colors duration-300">
        <h2 className="text-xl font-bold text-center text-slate-800 dark:text-slate-100 mb-5">
          Post to Gallery 📸
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Event Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Annual Hackathon"
              className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              value={newPicture.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Tell us about the memory..."
              className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              value={newPicture.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-1">Upload Picture</label>
            <input
              type="file"
              name="picture"
              className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-950/40 file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-950/60 transition-colors duration-200"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
          >
            Upload Picture
          </button>
        </form>
      </div>
    </div>
  );
};

export default PictureForm;
