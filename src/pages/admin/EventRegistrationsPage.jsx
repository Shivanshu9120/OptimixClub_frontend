import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import EventRegistrations from "../../components/RegisteredUsers";

const EventRegistrationsPage = () => {
  return (
    <DashboardLayout role="admin">
      <EventRegistrations />
    </DashboardLayout>
  );
};

export default EventRegistrationsPage;
