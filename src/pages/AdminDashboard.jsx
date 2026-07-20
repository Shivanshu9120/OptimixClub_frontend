import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Profile } from "../components/Profile";

const AdminDashboard = () => {
  const role = localStorage.getItem("role");

  return (
    <DashboardLayout role={role}>
      <div className="max-w-4xl">
        <Profile hideActions={true} />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
