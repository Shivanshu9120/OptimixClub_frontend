import React, { useState } from "react";
import Swal from "sweetalert2";

const PictureForm = () => {
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
      const response = await fetch("https://optimixclub-backend.onrender.com/api/picture/submit", {
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
    } catch (error) {
      console.error("Error creating picture", error);
      Swal.fire("Error!", "Error posting picture. Please try again", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center">

    <div className="max-w-lg   p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
        Create Picture 📅
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newPicture.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newPicture.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="picture"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-md file:cursor-pointer"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500"
        >
          Add Picture
        </button>
      </form>
    </div>
    </div>
  );
};

export default PictureForm;
