import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import DashboardLayout from "./DashboardLayout";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`);
        const event = response.data;

        setEventData({
          name: event.name,
          description: event.description,
          date: event.date.substring(0, 10),
          picture: event.picture
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Failed to fetch event details. Please try again', 'error');
        navigate("/admin-dashboard/events");
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setEventData({ ...eventData, picture: e.target.files[0] });
  
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result);
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
      const formData = new FormData();
      for (const key in eventData) {
        formData.append(key, eventData[key]);
      }
  
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/events/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      Swal.fire("Updated!", "Event updated successfully!", "success");
      navigate("/admin-dashboard/events");
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update Event. Please try again", "error");
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="admin">
        <div className="flex items-center justify-center py-20">
          <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400 animate-pulse">
            Loading event details...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">✏️ Edit Event</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Modify the event parameters and upload updated banners.</p>
      </div>

      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-lg rounded-2xl p-6 transition-colors duration-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-350 mb-1">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-355 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-355 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-355">
              Banner Image
            </label>
            <div className="flex flex-wrap items-center gap-4">
              {/* Existing Image */}
              {eventData.picture && typeof eventData.picture === "string" && (
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">Current</span>
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${eventData.picture}`}
                    alt="Current Event"
                    className="w-28 h-20 object-cover rounded-lg border dark:border-slate-800"
                  />
                </div>
              )}

              {/* Preview New Image */}
              {previewImage && (
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider mb-1">Preview</span>
                  <img
                    src={previewImage}
                    alt="New Upload"
                    className="w-28 h-20 object-cover rounded-lg border border-indigo-400"
                  />
                </div>
              )}
            </div>

            {/* File Upload Input */}
            <input
              type="file"
              name="picture"
              onChange={handleChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-950/40 file:text-indigo-700 dark:file:text-indigo-400 hover:file:bg-indigo-100 transition-all cursor-pointer"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/events")}
              className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition shadow-md hover:shadow-indigo-500/25"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditEvent;
