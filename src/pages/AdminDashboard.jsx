import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from 'sweetalert2'
import AdminTestimonials from "../components/AdminTestimonial";
import { Profile } from "../components/Profile";
import EventForm from "../components/EventForm";
import NoticeForm from "../components/NoticeForm";
import AdminEventandNotice from "../components/AdminEventandNotice";
import Messages from "../components/MessageList";
import UserRegistrations from "../components/userRegistration";


const AdminDashboard = () => {
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div>
      <Navbar/>
      </div>
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col md:flex-row gap-6">

      {/* Left Sidebar - Admin Info */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-lg ">
        <Profile/>
      </div>

      {/* Middle Section - Create Event */}
      <div className="w-full md:w-2/3 lg:w-2/4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col">
          <EventForm/>
          <NoticeForm/>
        </div>
      </div>

      {/* Right Section - Event List */}
      <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-lg shadow-md max-h-screen overflow-y-auto">
        <AdminEventandNotice/>
      </div>
    </div>

    <div className="p-6 rounded-md">
      <AdminTestimonials/>
    </div>
    <div className="p-6 rounded-md">
      <Messages/>
    </div>
    <div className="p-6 rounded-md">
      <UserRegistrations/>
    </div>
    <div className="mt-auto">
      <Footer/>
    </div>
    </div>
  );
};

export default AdminDashboard;
