import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { CardSkeleton } from './SkeletonLoader';

const AdminEventandNotice = ({ type = "all" }) => {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === "events" || type === "all") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/events`, setEvents, "Failed to load events");
    }
    if (type === "notices" || type === "all") {
      fetchData(`${import.meta.env.VITE_API_BASE_URL}/api/notices`, setNotices, "Failed to load notices");
    }
  }, [type]);

  const handleDelete = async (id, url, setter, itemType) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#ef4444',
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

  const showEvents = type === "events" || type === "all";
  const showNotices = type === "notices" || type === "all";

  return (
    <div className="flex flex-col w-full divide-y divide-slate-200 dark:divide-slate-800">
      {/* Events Section */}
      {showEvents && (
        <div className="flex-1 overflow-hidden">
          {type === "all" && (
            <h2 className="text-sm font-extrabold px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
              📅 Your Events
            </h2>
          )}
          <div className={`overflow-y-auto px-4 no-scrollbar pb-6 pt-4 ${type === "events" ? "max-h-[65vh]" : "max-h-[35vh]"}`}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardSkeleton count={2} type="event" />
              </div>
            ) : events.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(event => (
                  <li key={event._id} className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">{event.name}</h3>
                      <p className="h-16 overflow-y-auto no-scrollbar text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-3">
                        <Link to={`/edit-event/${event._id}`} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(event._id, `${import.meta.env.VITE_API_BASE_URL}/api/events`, setEvents, "event")}
                          className="text-xs font-bold text-rose-600 dark:text-rose-455 hover:underline"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm italic text-center py-8">No events created yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Notices Section */}
      {showNotices && (
        <div className="flex-1 overflow-hidden">
          {type === "all" && (
            <h2 className="text-sm font-extrabold px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider">
              📢 Your Notices
            </h2>
          )}
          <div className={`overflow-y-auto px-4 no-scrollbar pb-6 pt-4 ${type === "notices" ? "max-h-[65vh]" : "max-h-[35vh]"}`}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CardSkeleton count={2} type="event" />
              </div>
            ) : notices.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notices.map(notice => (
                  <li key={notice._id} className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">{notice.title}</h3>
                      <p className="h-16 overflow-y-auto no-scrollbar text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                        {notice.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                        {new Date(notice.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-3">
                        <Link to={`/edit-notice/${notice._id}`} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(notice._id, `${import.meta.env.VITE_API_BASE_URL}/api/notices`, setNotices, "notice")}
                          className="text-xs font-bold text-rose-600 dark:text-rose-450 hover:underline"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm italic text-center py-8">No notices created yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventandNotice;
