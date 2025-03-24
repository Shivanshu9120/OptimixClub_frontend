import { useState } from "react";
import Swal from "sweetalert2";

const SubmitTestimonial = () => {
    const [name, setName] = useState("");
    const [testimonial, setTestimonial] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const response = await fetch("https://optimixclub-backend.onrender.com/api/testimonials/submit", {
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
        <div className="w-full flex flex-col items-center py-8 px-4">
            {/* 🏷 Title Heading */}
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Submit Testimonials</h1>

            {/* 🌟 Testimonial Form Card */}
            <div className="w-full max-w-6xl bg-white border border-gray-300 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Share Your Experience</h2>

                {/* ✍️ Form */}
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={testimonial}
                        onChange={(e) => setTestimonial(e.target.value)}
                        placeholder="Write your testimonial..."
                        required
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition font-medium"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitTestimonial;
