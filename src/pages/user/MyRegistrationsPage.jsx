import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import UserRegistrations from "../../components/userRegistration";

const MyRegistrationsPage = () => {
  return (
    <DashboardLayout role="user">
      <UserRegistrations />
    </DashboardLayout>
  );
};

export default MyRegistrationsPage;
