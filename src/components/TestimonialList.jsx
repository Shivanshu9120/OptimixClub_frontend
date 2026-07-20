import { useEffect, useState, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { CardSkeleton } from "./SkeletonLoader";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/testimonials`)
      .then((response) => response.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      });

    const token = localStorage.getItem("token");
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

  const deleteTestimonial = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/testimonials/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            setTestimonials((prev) => prev.filter((t) => t._id !== id));
            Swal.fire("Deleted!", "Testimonial has been deleted", "success");
          }
        } catch (error) {
          console.error("Error deleting testimonial:", error);
          Swal.fire("Error!", "Failed to delete testimonial.", "error");
        }
      }
    });
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      id="testimonials-section"
      className="relative overflow-hidden py-24 px-6 border-b border-amber-100/50 dark:border-slate-900/60 transition-colors duration-300"
      style={{ backgroundColor: "var(--bg-cream-stone)" }}
    >
      <div className="absolute inset-0 dark:bg-slate-950 transition-colors duration-300 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        <div className="absolute inset-0 math-lines" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <line x1="0%" y1="75%" x2="28%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
          <line x1="100%" y1="75%" x2="68%" y2="0%" stroke="rgba(99,102,241,0.12)" strokeWidth="0.8" />
          <line x1="18%" y1="0%" x2="82%" y2="100%" stroke="rgba(99,102,241,0.07)" strokeWidth="0.5" />
          <line x1="0%" y1="75%" x2="76%" y2="0%" stroke="rgba(99,102,241,0.1)" strokeWidth="0.9" />
        </svg>
        <span className="absolute top-6 left-[3%] text-[110px] font-serif font-bold text-amber-900/[0.07] dark:text-white/[0.04] rotate-12 leading-none">Σ</span>
        <span className="absolute top-[10%] right-[5%] text-[75px] font-serif text-amber-800/[0.06] dark:text-white/[0.03] -rotate-6 leading-none">∞</span>
        <span className="absolute bottom-[15%] left-[8%] text-[55px] font-mono text-amber-800/[0.055] dark:text-white/[0.028] rotate-3 leading-none">π²</span>
        <span className="absolute bottom-[6%] right-[12%] text-[90px] font-serif text-indigo-700/[0.06] dark:text-indigo-300/[0.045] rotate-12 leading-none">∂</span>
        <span className="absolute top-[40%] left-[1%] text-[62px] font-serif text-amber-700/[0.05] dark:text-white/[0.025] -rotate-12 leading-none">∇</span>
        <span className="absolute top-[5%] left-[38%] text-[34px] font-mono text-amber-800/[0.05] dark:text-white/[0.018] -rotate-3 leading-none">E=mc²</span>
      </div>

      <div className="absolute -top-36 -left-36 w-[440px] h-[440px] rounded-full glow-blob-amber blur-[110px] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute -bottom-36 -right-36 w-[380px] h-[380px] rounded-full glow-blob-violet blur-[100px] pointer-events-none z-0" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-amber-50/80 dark:bg-indigo-950/30 text-amber-700 dark:text-indigo-400 border border-amber-200/60 dark:border-indigo-900/35 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-center mt-3 mb-2 text-slate-800 dark:text-slate-100 tracking-tight">
            What Our Members Say
          </h2>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
            Hear from the students, developers, and leaders who form the heart of Optimix Club.
          </p>
        </div>

        <div className="relative">
          {(testimonials.length > 1 || loading) && (
            <button
              className="flex absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 w-10 h-10 rounded-full shadow-md items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-5 py-3 px-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {loading ? (
              <CardSkeleton count={3} type="testimonial" />
            ) : testimonials.length > 0 ? (
              testimonials.map((t) => (
                <div
                  key={t._id}
                  className="
                    flex-shrink-0 flex flex-row items-center gap-5 relative
                    bg-white dark:bg-slate-900/80
                    border border-slate-200 dark:border-slate-800/80
                    rounded-2xl shadow-md hover:shadow-xl hover:shadow-amber-100/50 dark:hover:shadow-indigo-950/30
                    hover:-translate-y-1 transition-all duration-300 overflow-hidden
                    p-5
                  "
                  style={{
                    width: "clamp(300px, 42vw, 440px)",
                    scrollSnapAlign: "start",
                  }}
                >
                  {/* Decorative top-left quote mark */}
                  <span className="absolute top-3 right-4 text-5xl font-serif text-amber-300/70 dark:text-indigo-700/50 leading-none select-none pointer-events-none">
                    "
                  </span>

                  {/* Avatar */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${t.user.photo}`}
                      alt={t.user.name}
                      className="w-14 h-14 rounded-full border-2 border-amber-400 dark:border-indigo-500 shadow-sm object-cover"
                    />
                    <span className="text-[10px] font-bold text-amber-600 dark:text-indigo-400 uppercase tracking-widest text-center leading-tight max-w-[64px] line-clamp-2">
                      {t.user.name}
                    </span>
                    {/* Admin delete */}
                    {isAdmin && (
                      <button
                        onClick={() => deleteTestimonial(t._id)}
                        className="mt-0.5 py-0.5 px-2 bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 rounded-md hover:bg-rose-100 text-[9px] font-bold uppercase tracking-wide transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-px self-stretch bg-amber-200/60 dark:bg-slate-700/60 flex-shrink-0" />

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                    <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 italic line-clamp-4">
                      "{t.message}"
                    </p>
                    <div className="mt-3 pt-2 border-t border-amber-100/80 dark:border-slate-800/60 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                        {t.name}
                      </span>
                      {/* Stars */}
                      <div className="flex gap-0.5 text-amber-400 dark:text-indigo-400 text-xs flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 dark:text-slate-500 py-8 w-full font-medium">
                No testimonials available at this time.
              </p>
            )}
          </div>

          {/* Right Scroll Button */}
          {testimonials.length > 1 && (
            <button
              className="flex absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 w-10 h-10 rounded-full shadow-md items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
