import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import NoticeForm from "../../components/NoticeForm";
import AdminEventandNotice from "../../components/AdminEventandNotice";

const ManageNoticesPage = () => {
  const [activeTab, setActiveTab] = useState("list"); // "list" or "create"

  return (
    <DashboardLayout role="admin">
      {/* Dynamic Tab Switcher */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-4 mb-6">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
            activeTab === "list"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
          }`}
        >
          📋 View Created Notices
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all uppercase tracking-wider ${
            activeTab === "create"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
          }`}
        >
          ➕ Create New Notice
        </button>
      </div>

      <div className="max-w-4xl">
        {activeTab === "create" ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm transition-colors duration-300">
            <NoticeForm />
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
            <AdminEventandNotice type="notices" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageNoticesPage;
