import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Profile } from "../components/Profile";

const UserDashboard = () => {
  return (
    <DashboardLayout role="user">
      <div className="w-full max-w-5xl mx-auto">
        <Profile hideActions={true} />
      </div>
    </DashboardLayout>

  );
};

export default UserDashboard;
