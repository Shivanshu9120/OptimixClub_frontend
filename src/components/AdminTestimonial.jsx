import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminTestimonials = () => {
    const [pendingTestimonials, setPendingTestimonials] = useState([]);

    useEffect(() => {
        fetchPendingTestimonials();
    }, []);

    const fetchPendingTestimonials = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials/pending`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();
        setPendingTestimonials(data);
    };

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
            setPendingTestimonials(pendingTestimonials.filter(t => t._id !== id));
        } else {
          Swal.fire("Failed!", "Testimonial approval failed!", "error");
        }
    };

    const deleteTestimonial = async (id) => {
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
          setPendingTestimonials(pendingTestimonials.filter(t => t._id !== id));
      } else {
        Swal.fire("Failed!", "Testimonial deletion failed!", "error");
      }
  };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-gradient mb-4">
    Pending Testimonials
  </h2>
  {/* {message && <p className="mb-4 text-sm text-gray-600">{message}</p>} */}
  <ul className="space-y-4">
  {pendingTestimonials.length === 0 ? (
    <p>No pending testimonials</p>
  ) : (
    pendingTestimonials.map((testimonial) => (
      <li
        key={testimonial._id}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-4 rounded-lg shadow"
      >
        <div className="flex-1">
          <p className="font-semibold text-blue-600">{testimonial.name}</p>
          <p className="text-gray-700">{testimonial.message}</p>
        </div>
        <div className="mt-3 sm:mt-0 space-x-2">
          <button
            onClick={() => approveTestimonial(testimonial._id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white rounded-lg text-sm transition"
          >
            Approve
          </button>
          <button
            onClick={() => deleteTestimonial(testimonial._id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition"
          >
            Delete
          </button>
        </div>
      </li>
    ))
  )}
</ul>
</div>

    );
};

export default AdminTestimonials;
