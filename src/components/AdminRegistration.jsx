import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminRegistration = () => {
    const [registrations, setRegistrations] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/registration/registrations`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setRegistrations(res.data));
    }, [token]);

    const handleStatusUpdate = async (id, status) => {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/registration/approve/${id}`, 
            { status }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setRegistrations(prev => prev.map(reg => reg._id === id ? { ...reg, status } : reg));
    };

    const handleDelete = async (id) => {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/registration/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire(
                          'Deleted!',
                          'Registration deleted',
                          'success'
                        );
        setRegistrations(prev => prev.filter(reg => reg._id !== id));
    };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {registrations.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">No registrations found.</p>
        ) : (
          registrations.map(reg => (
            <div 
              key={reg._id} 
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between transition-all duration-200 hover:shadow-md"
            >
              {/* User Image & Info */}
              <div className="flex items-center gap-4">
                <img 
                  src={reg.user?.photo && reg.user?.photo !== "null" && reg.user?.photo !== "undefined" ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${reg.user.photo}` : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>"} 
                  alt="User" 
                  className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                />
                <div>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {reg.user.name} <span className="text-slate-400 dark:text-slate-500 font-normal">registered for</span> {reg.event.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {reg.branch} Branch • Year {reg.year} • <span className={`font-semibold capitalize ${
                      reg.status === "approved"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : reg.status === "rejected"
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}>{reg.status}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons (Responsive) */}
              <div className="flex flex-row items-center gap-2 mt-4 sm:mt-0">
                {(reg.status === "pending" || reg.status === "rejected") && (
                  <button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
                    onClick={() => handleStatusUpdate(reg._id, "approved")}
                  >
                    Approve
                  </button>
                )}
                {reg.status === "approved" && (
                  <button 
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
                    onClick={() => handleStatusUpdate(reg._id, "rejected")}
                  >
                    Reject
                  </button>
                )}
                <button 
                  className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
                  onClick={() => handleDelete(reg._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminRegistration;
