import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);


  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    picture:""
  });

  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    // Fetch event data
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://optimixclub-backend.onrender.com/api/events/${id}`);
        const event = response.data;

        // ✅ Prefill the form with the event data
        setEventData({
          name: event.name,
          description: event.description,
          date: event.date.substring(0, 10),
          picture: event.picture
        });
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error(err);
        Swal.fire(
                  'Error!',
                  'Failed to fetch events detail.Please try again',
                  'error'
                );
        navigate("/events");
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      // Handle File Upload
      setEventData({ ...eventData, picture: e.target.files[0] });
  
      // Show Image Preview
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);  // State to show image preview
        };
        reader.readAsDataURL(file);
      }
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
  
      // Convert eventData to FormData
      const formData = new FormData();
      for (const key in eventData) {
        formData.append(key, eventData[key]);
      }
  
      await axios.put(
        `https://optimixclub-backend.onrender.com/api/events/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      Swal.fire("Updated!", "Event updated successfully!", "success");
      navigate("/events");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update Event. Please try again", "error");
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700">
          Loading event details...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Edit Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Image
            </label>
            {/* Existing Image Preview */}
              {eventData.picture && typeof eventData.picture === "string" && (
                <img src={`https://optimixclub-backend.onrender.com/api/events/uploads/${eventData.picture}`} alt="Current Event" width="150" />
              )}

              {/* File Upload */}
              <input type="file" name="picture" onChange={handleChange} />

              {/* Preview of New Image */}
              {previewImage && <img src={previewImage} alt="New Upload" width="150" />}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
