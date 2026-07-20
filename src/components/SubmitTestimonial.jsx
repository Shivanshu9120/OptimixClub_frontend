import { useState } from "react";
import Swal from "sweetalert2";

const SubmitTestimonial = () => {
    const [name, setName] = useState("");
    const [testimonial, setTestimonial] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials/submit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: name, message: testimonial }),
        });

        if (response.ok) {
            Swal.fire("Submitted!", "Your testimonial has been submitted for approval.", "success");
            setName("");
            setTestimonial("");
        } else {
            Swal.fire("Error!", "Failed to submit the testimonial. Please try again.", "error");
        }
    };

    return (
        <div className="w-full flex flex-col items-center py-4">
            {/* 🌟 Testimonial Form Card */}
            <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl p-6 transition-colors duration-300">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Share Your Experience</h2>

                {/* ✍️ Form */}
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    />
                    <textarea
                        value={testimonial}
                        onChange={(e) => setTestimonial(e.target.value)}
                        placeholder="Write your testimonial..."
                        required
                        className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 transition-colors duration-200"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition font-semibold text-sm self-end md:self-stretch"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitTestimonial;
