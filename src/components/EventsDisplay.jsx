import React from 'react'
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const EventsDisplay = () => {

  const [events, setEvents] = useState([]); // State to store events
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://optimixclub-backend.onrender.com/api/events");
  
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
  
        const data = await response.json();
  
        // Map the events and append the full image URL
        const updatedEvents = data.map(event => ({
          ...event,
          picture: `https://optimixclub-backend.onrender.com/api/events/uploads/${event.picture}`
        }));
  
        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error loading events");
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  // Empty dependency array means this runs once when the component mounts

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
          Upcoming Events
        </h1>

        {/* Show loading message */}
        {loading && <p className="text-center text-gray-500">Loading events...</p>}

        {/* Show error message if fetching failed */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Display event cards if events are available */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event._id} {...event} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No upcoming events found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

   

export default EventsDisplay
