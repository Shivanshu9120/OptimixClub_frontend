import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import AdminTestimonials from "../../components/AdminTestimonial";

const TestimonialsPage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm transition-colors duration-300">
        <AdminTestimonials />
      </div>
    </DashboardLayout>
  );
};

export default TestimonialsPage;
