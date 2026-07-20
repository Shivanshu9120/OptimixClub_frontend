import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import logo from "../assets/images/logo.jpg";
import { Spinner } from "./Loader";

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23f1f5f9'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%2394a3b8'/></svg>";

const IdentityCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user details for ID card:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const getAvatarUrl = (photo) => {
    if (photo && photo !== "null" && photo !== "undefined") {
      return `${import.meta.env.VITE_API_BASE_URL}/uploads/${photo}`;
    }
    return DEFAULT_AVATAR;
  };

  const handleExport = async () => {
    if (!cardRef.current || !user) return;
    setExporting(true);
    try {
      // Create high-res canvas (2x device pixel ratio for crisp text/borders)
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Optimix_Pass_${user.name.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting ID card:", error);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner size="lg" />
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-4 animate-pulse">
          Loading digital membership pass...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10 bg-rose-50 dark:bg-rose-950/20 border border-rose-250 dark:border-rose-900 rounded-3xl p-6">
        <p className="text-sm text-rose-600 dark:text-rose-400 font-bold">
          Failed to load profile. Please verify your authentication.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md px-4 py-4">
      {/* Google font loaded for handwritten signature */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
      />

      {/* ID Pass card container */}
      <div
        ref={cardRef}
        className="relative bg-slate-950 text-white border-[3px] border-slate-800 rounded-[2.5rem] w-[340px] h-[520px] flex flex-col p-6 items-center overflow-hidden shadow-2xl shrink-0"
        style={{
          boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.15)",
        }}
      >
        {/* Subtle grid lines background overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        {/* Lanyard Slot Cutout */}
        <div className="w-14 h-3.5 bg-slate-900 rounded-full border-2 border-slate-800 mb-6 shrink-0 shadow-inner z-10" />

        {/* Card Header */}
        <div className="flex items-center gap-3 w-full pb-4 border-b-2 border-dashed border-slate-800 shrink-0 z-10">
          <img
            src={logo}
            alt="Club Logo"
            className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow-md shrink-0"
          />
          <div>
            <h3 className="text-sm font-black tracking-widest text-indigo-400 leading-none">
              OPTIMIX CLUB
            </h3>
            <p className="text-[9px] text-slate-400 font-black tracking-widest mt-1 uppercase">
              Digital Membership Pass
            </p>
          </div>
        </div>

        {/* Photo Container & Role badge */}
        <div className="my-6 relative flex flex-col items-center shrink-0 z-10">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500/80 shadow-lg shadow-indigo-500/30">
            <img
              src={getAvatarUrl(user.photo)}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_AVATAR;
              }}
            />
          </div>
          <span className="absolute -bottom-3 bg-indigo-600 border border-slate-950 text-white text-[9px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
            {user.role}
          </span>
        </div>

        {/* Member Details */}
        <div className="w-full text-center space-y-4 my-2 flex-grow z-10">
          <div>
            <h4 className="text-lg font-black tracking-tight text-white line-clamp-1">
              {user.name}
            </h4>
            <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mt-0.5">
              Optimix Member
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-3 text-left bg-slate-900/60 p-3 rounded-2xl border border-slate-800/40">
            <div>
              <span className="block text-[8px] text-slate-500 font-black uppercase tracking-wider">
                Roll Number
              </span>
              <span className="text-xs font-bold text-slate-200">
                {user.rollNo || "N/A"}
              </span>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500 font-black uppercase tracking-wider">
                Branch & Year
              </span>
              <span className="text-xs font-bold text-slate-200">
                {user.branch ? `${user.branch} / ${user.year || "1st"}` : "N/A"}
              </span>
            </div>
            <div className="col-span-2">
              <span className="block text-[8px] text-slate-500 font-black uppercase tracking-wider">
                Email Address
              </span>
              <span className="text-xs font-bold text-slate-200 truncate block">
                {user.email}
              </span>
            </div>
          </div>
        </div>

        {/* ID Card Footer - Barcode & Digital Signature */}
        <div className="w-full border-t border-slate-800 pt-4 flex items-center justify-between shrink-0 z-10">
          {/* Barcode representation */}
          <div className="flex flex-col items-start gap-1">
            <div className="h-7 w-32 bg-white/5 rounded flex items-center justify-around px-1.5 py-0.5 select-none opacity-80">
              <span className="w-[1.5px] h-full bg-slate-400"></span>
              <span className="w-[3px] h-full bg-slate-400"></span>
              <span className="w-[1px] h-full bg-slate-400"></span>
              <span className="w-[2px] h-full bg-slate-400"></span>
              <span className="w-[1px] h-full bg-slate-400"></span>
              <span className="w-[3.5px] h-full bg-slate-400"></span>
              <span className="w-[1px] h-full bg-slate-400"></span>
              <span className="w-[2px] h-full bg-slate-400"></span>
              <span className="w-[1.5px] h-full bg-slate-400"></span>
              <span className="w-[3px] h-full bg-slate-400"></span>
            </div>
            <span className="text-[6.5px] text-slate-500 font-mono tracking-widest uppercase">
              OPMX-{user._id ? user._id.substring(0, 8) : "MEMBER"}
            </span>
          </div>

          {/* Digital Signature */}
          <div className="flex flex-col items-center">
            <div
              className="text-2xl text-indigo-300 font-serif leading-none select-none tracking-normal"
              style={{
                fontFamily: "'Great Vibes', cursive",
                transform: "rotate(-4deg)",
              }}
            >
              Shivanshu Singh
            </div>
            <div className="h-[1px] w-20 bg-slate-700/60 my-1" />
            <span className="text-[7.5px] text-slate-500 font-black uppercase tracking-wider">
              Club Authority
            </span>
          </div>
        </div>
      </div>

      {/* Action export control */}
      <button
        onClick={handleExport}
        disabled={exporting}
        className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2.5 active:scale-95"
      >
        {exporting ? (
          <>
            <Spinner size="xs" color="white" /> Exporting Pass...
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export Pass (PNG)
          </>
        )}
      </button>
    </div>
  );
};

export default IdentityCard;
