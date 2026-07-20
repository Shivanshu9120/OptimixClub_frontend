import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import IdentityCard from "../components/IdentityCard";

const IdentityCardPage = ({ role }) => {
  return (
    <DashboardLayout role={role}>
      <div className="flex flex-col items-center justify-center py-6 w-full animate-fadeInUp">
        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight text-center mb-1">
          🪪 Your Club Pass
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-8 max-w-sm">
          Access your digital verified Optimix Club membership pass and export it for offline use.
        </p>
        <IdentityCard />
      </div>
    </DashboardLayout>
  );
};

export default IdentityCardPage;
