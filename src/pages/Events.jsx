import EventsDisplay from "../components/EventsDisplay";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Events = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div>
      <Navbar/>
      </div>
    <div className="min-h-screen bg-gray-50 py-10">
      <EventsDisplay/>
    </div>
    <div className="mt-auto">
      <Footer/>
    </div>
    </div>
  );
};

export default Events;

