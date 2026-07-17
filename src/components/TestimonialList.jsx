import { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Check if the user is an admin
  const scrollRef = useRef(null);

  useEffect(() => {
    // Fetch testimonials
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials`)
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching testimonials:", error));

    const token = localStorage.getItem("token");

    // Fetch logged-in user's role (assuming an API endpoint exists)
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
      method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.role === "admin" || data.role === "superadmin") {
          setIsAdmin(true);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // Function to delete a testimonial
  const deleteTestimonial = async (id) => {
    Swal.fire({
          title:'Are you sure?',
          text:"You won't be able to revert this!",
          icon:'warning',
          showCancelButton:true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor:'#d33',
          confirmButtonText:'Yes, delete it!'
        }).then(async(result)=>{
          if(result.isConfirmed){
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      });
      if (response.ok) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id)); // Remove deleted testimonial from UI
        Swal.fire(
                    'Deleted!',
                    'Testimonial has been deleted',
                    'success'
                  )
      } else {
        console.error("Error deleting testimonial");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      Swal.fire(
                  'Error!',
                  'Failed to delete the testimonial.Please try again',
                  'error'
                );
    }
  }})
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 320; // Matches card width + gap

      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto my-16 px-6 sm:px-10 lg:px-14">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-blue-600">
        What Our Members Say
      </h2>

      {/* Left Scroll Button */}
      <button
        className="hidden md:flex absolute left-0 -translate-y-1/2 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-10 top-1/2"
        onClick={() => scroll("left")}
        style={{ transform: "translate(-50%, -50%)" }} // Ensures proper placement outside cards
      >
        <ChevronLeftIcon className="h-7 w-7 text-white" />
      </button>

      {/* Scrollable Testimonials Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth py-6 space-x-6 px-4 md:px-12 lg:px-16"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div
              key={t._id}
              className="flex-shrink-0 p-6 border-2 border-blue-500 rounded-xl 
                         shadow-gray-700/50 shadow-inner 
                        transition-all duration-300 hover:scale-105 
                        bg-white text-black h-[350px] flex flex-col justify-between"
              style={{
                width: "270px",
                scrollSnapAlign: "start",
              }}
            >
              <span className="text-blue-600 text-center font-bold mt-2">{t.name}</span>
              <p className="text-lg font-medium italic text-center">
                "{t.message}"
              </p>

              {/* Name & Profile Picture */}
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${t.user.photo}`}
                  alt={t.user.name}
                  className="w-16 h-16 rounded-full border-2 border-violet-500 shadow-lg shadow-violet-400/50"
                />
                <span className="bg-green-100 text-green-700 text-sm rounded-full font-bold mt-1 p-1 ">{t.user.name}</span>
                {/* Delete Button (Only for Admins) */}
                {isAdmin && (
                  <button
                    onClick={() => deleteTestimonial(t._id)}
                    className=" py-1 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white w-full">No testimonials available</p>
        )}
      </div>

      {/* Right Scroll Button */}
      <button
        className="hidden md:flex absolute right-0 -translate-y-1/2 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-10 top-1/2"
        onClick={() => scroll("right")}
        style={{ transform: "translate(50%, -50%)" }} // Ensures proper placement outside cards
      >
        <ChevronRightIcon className="h-7 w-7 text-white" />
      </button>
    </div>
  );
};

export default Testimonials;
