import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import AdminRegistration from "../../components/AdminRegistration";

const AllRegistrationsPage = () => {
  return (
    <DashboardLayout role="admin">
      <AdminRegistration />
    </DashboardLayout>
  );
};

export default AllRegistrationsPage;
