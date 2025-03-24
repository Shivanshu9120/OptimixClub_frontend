import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubmitTestimonial from "../components/SubmitTestimonial";
import { Profile } from "../components/Profile";
import EventsDisplay from "../components/EventsDisplay";
import UserRegistrations from "../components/userRegistration";



const UserDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex w-full flex-row max-sm:flex-col p-3">
        <div className="w-1/3 max-sm:w-full">
          <Profile />
        </div>
        <div className="w-2/3 max-sm:w-full">
          <EventsDisplay />
        </div>
      </div>
      <SubmitTestimonial />
      <UserRegistrations/>
      <Footer />
    </div>
  );
};

export default UserDashboard;
