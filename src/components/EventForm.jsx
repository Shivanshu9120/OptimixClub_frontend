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
        const response = await fetch("https://optimixclub-backend.onrender.com/api/events", {
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
          <h2 className="text-xl font-semibold mb-4">Create Event📅</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            className="w-full p-2 border rounded"
            value={newEvent.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="w-full p-2 border rounded"
            value={newEvent.date}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            className="w-full p-2 border rounded"
            value={newEvent.description}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="picture"
            className="w-full p-2 border rounded"
            onChange={(e) => setNewEvent({ ...newEvent, picture: e.target.files[0] })}
            // required
          />
          <button type="submit" className="w-full py-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500">
            Add Event
          </button>
        </form>
          
    </div>
  )
}

export default EventForm
