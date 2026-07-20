import React from "react";

/**
 * Spinner: Compact, inline spinner loader suitable for buttons or card overlays
 */
export const Spinner = ({ size = "md", color = "indigo" }) => {
  const sizeClasses = {
    xs: "w-4 h-4 border-2",
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
  };

  const colorClasses = {
    indigo: "border-indigo-600 dark:border-indigo-400 border-t-transparent dark:border-t-transparent",
    amber: "border-amber-500 dark:border-amber-400 border-t-transparent dark:border-t-transparent",
    white: "border-white border-t-transparent",
  };

  return (
    <div
      className={`inline-block rounded-full animate-spin ${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.indigo}`}
      role="status"
    />
  );
};

/**
 * LoadingScreen: Full-screen branded loading transition with animated mathematical orbits
 */
export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="relative flex flex-col items-center">
        
        {/* Glowing Background Blobs */}
        <div className="absolute w-64 h-64 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 blur-3xl -top-12 pointer-events-none" />
        <div className="absolute w-64 h-64 rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-3xl -bottom-12 pointer-events-none" />

        {/* Orbit System */}
        <div className="relative w-28 h-28 flex items-center justify-center select-none pointer-events-none">
          {/* Inner pulsating node */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/40 animate-pulse">
            <span className="text-white text-base font-black font-serif">O</span>
          </div>

          {/* Orbit Line 1 */}
          <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/30 dark:border-indigo-400/40 animate-[spin_10s_infinite_linear]" />
          
          {/* Orbit Line 2 */}
          <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/30 dark:border-amber-400/40 animate-[spin_6s_infinite_linear_reverse]" />

          {/* Math Symbols Orbiting */}
          <div className="absolute inset-0 animate-orbit">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-serif font-black text-indigo-600/70 dark:text-indigo-400/70">Σ</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-serif font-black text-amber-500/70 dark:text-amber-400/70">∞</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] font-mono text-purple-600/70 dark:text-purple-400/70">π²</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-serif text-indigo-500/70 dark:text-indigo-400/70">∂</span>
          </div>
        </div>

        {/* Text Details */}
        <div className="mt-6 text-center">
          <h2 className="text-lg font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 dark:from-indigo-400 dark:via-purple-400 dark:to-amber-400 select-none animate-pulse">
            Optimix Club
          </h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-1">
            Loading Excellence...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
