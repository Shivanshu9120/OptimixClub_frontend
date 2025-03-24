import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Events from "./pages/Events";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import EditEvent from "./components/editEvents";
import EditNotice from "./components/editNotices";
import PictureForm from "./components/PictureForm";
import AboutClub from "./pages/About";
import ContactUs from "./pages/Contact";
import UsersPage from "./components/Users";
import RegistrationForm from "./components/RegistrationForm";
import AdminRegistration from "./components/AdminRegistration";
import EventRegistrations from "./components/RegisteredUsers";

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return token && role === roleRequired ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutClub/> } />
        <Route path="/contact" element={<ContactUs/> } />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />
        <Route
          path="/events"
          element={<Events/>}
        />
        <Route path="/edit-event/:id" element={<EditEvent/>}/>
        <Route path="/register/:eventId" element={<RegistrationForm />} />
        <Route path="/edit-notice/:id" element={<EditNotice/>}/>
        <Route path="/picture-form" element={<PictureForm/>}/>
        <Route path="/users-form" element={<UsersPage/>}/>
        <Route path="/registration-list" element={<AdminRegistration/>}/>
        <Route path="/registered-users" element={<EventRegistrations/>}/>
      </Routes>
    </Router>
  );
}

export default App;
