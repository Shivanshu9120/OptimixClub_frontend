import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import EventsDisplay from "../../components/EventsDisplay";

const UserEventsPage = () => {
  return (
    <DashboardLayout role="user">
      <EventsDisplay />
    </DashboardLayout>
  );
};

export default UserEventsPage;
