import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ListSkeleton } from "./SkeletonLoader";

const UserRegistrations = () => {
  const [user, setUser] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/my-registrations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRegistrations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user registrations:", err);
        setLoading(false);
      });
  }, [user]);

  const handleCancelRegistration = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Registration?",
      text: "Do you want to cancel this event registration? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // rose-600
      cancelButtonColor: "#475569", // slate-600
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it"
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/registration/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          Swal.fire("Cancelled!", "Your registration has been successfully cancelled.", "success");
          // Remove from local state
          setUserRegistrations((prev) => prev.filter((reg) => reg._id !== id));
        } else {
          Swal.fire("Error!", data.msg || data.message || "Failed to cancel registration.", "error");
        }
      } catch (error) {
        console.error("Error cancelling registration:", error);
        Swal.fire("Error!", "Connection error. Please try again.", "error");
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">My Registrations</h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">Track the status of your club event applications.</p>
        </div>
      </div>

      {loading ? (
        <ListSkeleton count={3} />
      ) : userRegistrations.length > 0 ? (
        <div className="space-y-4">
          {userRegistrations.map((reg) => (
            <div
              key={reg._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Event & Registration Metadata */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
                    {reg.event?.name || "Event Details"}
                  </h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl">
                    Branch: <strong className="text-slate-700 dark:text-slate-200">{reg.branch}</strong>
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl">
                    Year: <strong className="text-slate-700 dark:text-slate-200">{reg.year}</strong>
                  </span>
                  {reg.createdAt && (
                    <span className="text-[11px] text-slate-400">
                      Applied: {new Date(reg.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badge & Actions */}
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                {/* Status Badge */}
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                    reg.status === "approved"
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200/40 dark:border-emerald-950/50"
                      : reg.status === "rejected"
                      ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-450 border-rose-200/40 dark:border-rose-950/50"
                      : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200/40 dark:border-amber-950/50"
                  }`}
                >
                  {reg.status}
                </span>

                {/* Cancel Action if Pending */}
                {reg.status === "pending" && (
                  <button
                    type="button"
                    onClick={() => handleCancelRegistration(reg._id)}
                    className="text-xs font-bold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 border border-rose-200 dark:border-rose-950 px-3.5 py-1.5 rounded-xl transition duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold italic">You have not registered for any events yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserRegistrations;
