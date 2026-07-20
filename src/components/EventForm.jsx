import React, { useState } from 'react'
import Swal from 'sweetalert2'

const EventForm = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "" , picture:"" }); // Stores new event input
    
    // Handle input change for new event
      const handleChange = (e) => {
      if (e.target.name === "picture") {
        // Handle File Upload
        setNewEvent({ ...newEvent, picture: e.target.files[0] });
      } else {
        // Handle Text Input
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
      }
    };
    
    // ✅ Submit new event
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // ✅ Create a FormData object to send text + image
      const formData = new FormData();
      formData.append("name", newEvent.name);
      formData.append("description", newEvent.description);
      formData.append("date", newEvent.date);
      formData.append("picture", newEvent.picture);
    
      try {
        const token = localStorage.getItem("token"); // Retrieve token (if needed)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData, // ✅ Send FormData (not JSON)
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
          Swal.fire(
            'Error!',
            'Failed to create the Event. Please try again',
            'error'
          );
          return;
        }
    
        // ✅ Add new event to state
        setEvents([...events, responseData]);
        setNewEvent({ name: "", date: "", description: "", picture: "" }); // Reset form
    
        Swal.fire(
          'Event Created!',
          'Your event has been posted.',
          'success'
        );
      } catch (error) {
        console.error("Error creating Event", error);
        Swal.fire(
          'Error!',
          'Error creating event. Please try again',
          'error'
        );
      }
    };
    
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Create Event 📅</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
          value={newEvent.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
          value={newEvent.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors h-24"
          value={newEvent.description}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="picture"
          className="w-full p-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded focus:outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-550 file:text-white"
          onChange={(e) => setNewEvent({ ...newEvent, picture: e.target.files[0] })}
        />
        <button type="submit" className="w-full py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white font-bold text-sm rounded transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md">
          Add Event
        </button>
      </form>
    </div>
  );
}

export default EventForm
