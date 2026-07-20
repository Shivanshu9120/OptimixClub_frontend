import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminTestimonials = () => {
    const [activeTab, setActiveTab] = useState("pending"); // "pending" or "approved"
    const [pendingTestimonials, setPendingTestimonials] = useState([]);
    const [approvedTestimonials, setApprovedTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingTestimonials = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials/pending`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            setPendingTestimonials(data);
        } catch (err) {
            console.error("Error fetching pending testimonials:", err);
        }
    };

    const fetchApprovedTestimonials = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials`);
            const data = await response.json();
            setApprovedTestimonials(data);
        } catch (err) {
            console.error("Error fetching approved testimonials:", err);
        }
    };

    const loadAll = async () => {
        setLoading(true);
        await Promise.all([fetchPendingTestimonials(), fetchApprovedTestimonials()]);
        setLoading(false);
    };

    useEffect(() => {
        loadAll();
    }, []);

    const approveTestimonial = async (id) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials/approve/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            Swal.fire("Approved!", "Testimonial approved successfully!", "success");
            // Move item from pending to approved list
            const approvedItem = pendingTestimonials.find(t => t._id === id);
            if (approvedItem) {
                setApprovedTestimonials(prev => [...prev, { ...approvedItem, approved: true }]);
            }
            setPendingTestimonials(prev => prev.filter(t => t._id !== id));
        } else {
            Swal.fire("Failed!", "Testimonial approval failed!", "error");
        }
    };

    const deleteTestimonial = async (id, listType) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    Swal.fire("Deleted!", "Testimonial deleted successfully!", "success");
                    if (listType === "pending") {
                        setPendingTestimonials(prev => prev.filter(t => t._id !== id));
                    } else {
                        setApprovedTestimonials(prev => prev.filter(t => t._id !== id));
                    }
                } else {
                    Swal.fire("Failed!", "Testimonial deletion failed!", "error");
                }
            }
        });
    };

    return (
        <div className="w-full">
            {/* Tab switch control */}
            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
                <button
                    onClick={() => setActiveTab("pending")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
                        activeTab === "pending"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                            : "text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                >
                    ⏳ Pending Approval ({pendingTestimonials.length})
                </button>
                <button
                    onClick={() => setActiveTab("approved")}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
                        activeTab === "approved"
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                            : "text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                >
                    ✅ Approved Testimonials ({approvedTestimonials.length})
                </button>
            </div>

            {loading ? (
                <p className="text-slate-500 dark:text-slate-400 text-center py-8 animate-pulse">Loading testimonials...</p>
            ) : (
                <div className="space-y-4">
                    {activeTab === "pending" ? (
                        <ul className="space-y-3">
                            {pendingTestimonials.length === 0 ? (
                                <p className="text-slate-500 dark:text-slate-400 text-sm italic py-4 text-center">No pending testimonials</p>
                            ) : (
                                pendingTestimonials.map((testimonial) => (
                                    <li
                                        key={testimonial._id}
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm transition-all duration-200"
                                    >
                                        <div className="flex-1 min-w-0 pr-4">
                                            <p className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">{testimonial.name}</p>
                                            <p className="text-slate-600 dark:text-slate-350 text-xs mt-1 leading-relaxed">{testimonial.message}</p>
                                        </div>
                                        <div className="mt-3 sm:mt-0 space-x-2 flex items-center shrink-0">
                                            <button
                                                onClick={() => approveTestimonial(testimonial._id)}
                                                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => deleteTestimonial(testimonial._id, "pending")}
                                                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    ) : (
                        <ul className="space-y-3">
                            {approvedTestimonials.length === 0 ? (
                                <p className="text-slate-500 dark:text-slate-400 text-sm italic py-4 text-center">No approved testimonials</p>
                            ) : (
                                approvedTestimonials.map((testimonial) => (
                                    <li
                                        key={testimonial._id}
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm transition-all duration-200"
                                    >
                                        <div className="flex-1 min-w-0 pr-4 flex items-center gap-3">
                                            <img
                                                src={testimonial.user?.photo && testimonial.user?.photo !== "null" && testimonial.user?.photo !== "undefined" ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${testimonial.user.photo}` : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>"}
                                                alt={testimonial.name}
                                                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                                            />
                                            <div>
                                                <p className="font-extrabold text-sm text-slate-800 dark:text-slate-250">{testimonial.name}</p>
                                                <p className="text-slate-600 dark:text-slate-350 text-xs mt-1 leading-relaxed">{testimonial.message}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3 sm:mt-0 space-x-2 flex items-center shrink-0">
                                            <button
                                                onClick={() => deleteTestimonial(testimonial._id, "approved")}
                                                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminTestimonials;
