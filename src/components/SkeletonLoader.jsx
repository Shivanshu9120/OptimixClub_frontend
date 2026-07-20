import React from "react";

/**
 * ShimmerBlock: The atomic building block of our skeletons with shimmer animation
 */
export const ShimmerBlock = ({ className = "" }) => {
  return (
    <div className={`animate-shimmer rounded-md bg-slate-200 dark:bg-slate-800 ${className}`} />
  );
};

/**
 * CardSkeleton: Skeletons for events, testimonials, users, and gallery items
 */
export const CardSkeleton = ({ count = 3, type = "event" }) => {
  const cards = Array.from({ length: count });

  if (type === "gallery") {
    return (
      <>
        {cards.map((_, i) => (
          <div
            key={i}
            className="min-w-[300px] h-[220px] rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-2 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            <ShimmerBlock className="w-full h-full rounded-xl" />
          </div>
        ))}
      </>
    );
  }

  if (type === "testimonial") {
    return (
      <>
        {cards.map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-row items-center gap-5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm overflow-hidden"
            style={{ width: "clamp(300px, 42vw, 440px)" }}
          >
            {/* Avatar skeleton */}
            <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
              <ShimmerBlock className="w-14 h-14 rounded-full" />
              <ShimmerBlock className="w-12 h-3" />
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-slate-200 dark:bg-slate-800" />

            {/* Text skeleton */}
            <div className="flex-1 space-y-3">
              <ShimmerBlock className="w-full h-3" />
              <ShimmerBlock className="w-5/6 h-3" />
              <ShimmerBlock className="w-2/3 h-3" />
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <ShimmerBlock className="w-20 h-4" />
                <ShimmerBlock className="w-16 h-3" />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === "user") {
    return (
      <>
        {cards.map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm p-6 text-center flex flex-col justify-between items-center h-[260px]"
          >
            <div className="w-full flex flex-col items-center">
              <ShimmerBlock className="w-20 h-20 rounded-full mb-4" />
              <ShimmerBlock className="w-2/3 h-5 mb-2" />
              <ShimmerBlock className="w-1/2 h-3 mb-4" />
              <ShimmerBlock className="w-1/4 h-5 rounded-full" />
            </div>
            <div className="w-full mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/50">
              <ShimmerBlock className="w-full h-8 rounded-xl" />
            </div>
          </div>
        ))}
      </>
    );
  }

  // Default: Event Card
  return (
    <>
      {cards.map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 min-w-[290px] w-72 h-[410px] flex flex-col shadow-sm justify-between relative overflow-hidden"
        >
          {/* Top image placeholder */}
          <ShimmerBlock className="w-full h-40 rounded-xl" />
          
          {/* Date Chip */}
          <div className="mt-4">
            <ShimmerBlock className="w-24 h-4 mb-2" />
            <ShimmerBlock className="w-48 h-5 mb-3" />
          </div>

          {/* Description Lines */}
          <div className="space-y-2 flex-grow">
            <ShimmerBlock className="w-full h-3" />
            <ShimmerBlock className="w-5/6 h-3" />
            <ShimmerBlock className="w-4/5 h-3" />
          </div>

          {/* Action Button */}
          <div className="mt-4">
            <ShimmerBlock className="w-full h-9 rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
};

/**
 * NoticeSkeleton: Skeleton representing cork notice items in the bulletin board
 */
export const NoticeSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800/80 relative"
          style={{ transform: i % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)" }}
        >
          {/* Cork Push Pin representation */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-400/40 rounded-full" />
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-dashed border-slate-200 dark:border-slate-800/80 pb-2 mb-3">
            <ShimmerBlock className="w-1/2 h-5" />
            <ShimmerBlock className="w-16 h-4 rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <ShimmerBlock className="w-full h-3.5" />
            <ShimmerBlock className="w-11/12 h-3.5" />
            <ShimmerBlock className="w-5/6 h-3.5" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * ListSkeleton: Skeletons for dashboard list rows (registrations, message inbox, etc.)
 */
export const ListSkeleton = ({ count = 3, hasAvatar = false }) => {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center justify-between gap-4 w-full"
        >
          <div className="flex items-center gap-3 w-full">
            {hasAvatar && <ShimmerBlock className="w-9 h-9 rounded-full flex-shrink-0" />}
            
            <div className="space-y-2 flex-grow">
              <ShimmerBlock className="w-1/3 h-4" />
              <div className="flex gap-2">
                <ShimmerBlock className="w-20 h-3" />
                <ShimmerBlock className="w-16 h-3" />
              </div>
            </div>
          </div>
          <ShimmerBlock className="w-16 h-6 rounded-full flex-shrink-0" />
        </div>
      ))}
    </div>
  );
};

/**
 * TableSkeleton: Visual table cells placeholder for tables (like approved attendees)
 */
export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="w-full border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      {/* Mock Header */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        {Array.from({ length: cols }).map((_, j) => (
          <ShimmerBlock key={j} className="h-4 w-3/4" />
        ))}
      </div>
      
      {/* Mock Rows */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-4 items-center">
            {Array.from({ length: cols }).map((_, j) => (
              <ShimmerBlock key={j} className="h-3.5 w-5/6" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * ProfileSkeleton: Profile page inputs layout loader
 */
export const ProfileSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 w-full max-w-4xl shadow-sm">
      {/* Profile Pic placeholder */}
      <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <ShimmerBlock className="w-32 h-32 rounded-full" />
        <ShimmerBlock className="w-24 h-4" />
        <ShimmerBlock className="w-36 h-3" />
      </div>

      {/* Grid forms fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <ShimmerBlock className="w-20 h-4" />
            <ShimmerBlock className="w-full h-10 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800/80">
        <ShimmerBlock className="w-24 h-10 rounded-xl" />
        <ShimmerBlock className="w-32 h-10 rounded-xl" />
      </div>
    </div>
  );
};

export default CardSkeleton;
