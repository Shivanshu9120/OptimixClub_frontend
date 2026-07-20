import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Messages from "../../components/MessageList";

const MessagesPage = () => {
  return (
    <DashboardLayout role="admin">
      <Messages />
    </DashboardLayout>
  );
};

export default MessagesPage;
