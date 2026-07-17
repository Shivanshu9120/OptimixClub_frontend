import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const AdminEventandNotice = () => {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const fetchData = async (url, setter, errorMsg) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!response.ok) throw new Error(errorMsg);

      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(errorMsg, error);
      // setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/events`, setEvents, "Failed to load events");
    fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/notices`, setNotices, "Failed to load notices");
  }, []);

  const handleDelete = async (id, url, setter, itemType) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
          });

          if (!response.ok) throw new Error(`Failed to delete ${itemType}`);

          setter(prev => prev.filter(item => item._id !== id));

          Swal.fire('Deleted!', `Your ${itemType} has been deleted.`, 'success');
        } catch (error) {
          console.error(`Error deleting ${itemType}:`, error.message);
          Swal.fire('Error!', `Failed to delete the ${itemType}. Please try again.`, 'error');
        }
      }
    });
  };

  return (
    <div>
      {/* Events Section */}
      <div className="flex-1 overflow-hidden">
        <h2 className="text-xl font-semibold mb-4 p-4 border-b bg-gray-50">📅 Your Events</h2>
        <div className="overflow-y-auto max-h-[40vh] px-4 no-scrollbar pb-4">
          {loading ? (
            <p>Loading events...</p>
          ) : events.length > 0 ? (
            <ul className="space-y-3">
              {events.map(event => (
                <li key={event._id} className="bg-gray-100 p-4 rounded">
                  <h3 className="text-lg font-semibold">{event.name}</h3>
                  <p className="h-16 overflow-y-auto no-scrollbar">{event.description}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                  <div className="relative flex space-x-2">
                    <Link to={`/edit-event/${event._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold">✏️ Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id, `${import.meta.env.VITE_API_BASE_URL}/api/events`, setEvents, "event")}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No events created yet.</p>
          )}
        </div>
      </div>

      {/* Notices Section */}
      <div className="flex-1 overflow-hidden border-t-2">
        <h2 className="text-xl font-semibold mb-4 p-4 border-b bg-gray-50">📢 Your Notices</h2>
        <div className="overflow-y-auto max-h-[40vh] px-4 no-scrollbar pb-4">
          {loading ? (
            <p>Loading notices...</p>
          ) : notices.length > 0 ? (
            <ul className="space-y-3">
              {notices.map(notice => (
                <li key={notice._id} className="bg-gray-100 p-4 rounded">
                  <h3 className="text-lg font-semibold">{notice.title}</h3>
                  <p className="h-16 overflow-y-auto no-scrollbar">{notice.description}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(notice.date).toLocaleDateString()}
                  </p>
                  <div className="relative flex space-x-2">
                    <Link to={`/edit-notice/${notice._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold">✏️ Edit</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(notice._id, `${import.meta.env.VITE_API_BASE_URL}/api/notices`, setNotices, "notice")}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No notices created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEventandNotice;
