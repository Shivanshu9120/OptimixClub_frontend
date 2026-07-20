import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import UsersPage from "../../components/Users";

const UsersDashboardPage = () => {
  return (
    <DashboardLayout role="admin">
      <UsersPage />
    </DashboardLayout>
  );
};

export default UsersDashboardPage;
