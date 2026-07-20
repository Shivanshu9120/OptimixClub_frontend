import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoadingScreen } from "./components/Loader";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Events = lazy(() => import("./pages/Events"));
const Home = lazy(() => import("./pages/Home"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const EditEvent = lazy(() => import("./components/editEvents"));
const EditNotice = lazy(() => import("./components/editNotices"));
const AboutClub = lazy(() => import("./pages/About"));
const ContactUs = lazy(() => import("./pages/Contact"));
const RegistrationForm = lazy(() => import("./components/RegistrationForm"));
const Terms = lazy(() => import("./pages/Terms"));
const Onboarding = lazy(() => import("./pages/Onboarding"));

// Admin dashboard pages
const ManageEventsPage = lazy(() => import("./pages/admin/ManageEventsPage"));
const ManageNoticesPage = lazy(() => import("./pages/admin/ManageNoticesPage"));
const EventGalleryPage = lazy(() => import("./pages/admin/EventGalleryPage"));
const TestimonialsPage = lazy(() => import("./pages/admin/TestimonialsPage"));
const UsersDashboardPage = lazy(() => import("./pages/admin/UsersPage"));
const AllRegistrationsPage = lazy(() => import("./pages/admin/AllRegistrationsPage"));
const EventRegistrationsPage = lazy(() => import("./pages/admin/EventRegistrationsPage"));
const MessagesPage = lazy(() => import("./pages/admin/MessagesPage"));
const ApprovedAttendeesPage = lazy(() => import("./pages/admin/ApprovedAttendeesPage"));

// User dashboard pages
const UserEventsPage = lazy(() => import("./pages/user/UserEventsPage"));
const MyRegistrationsPage = lazy(() => import("./pages/user/MyRegistrationsPage"));
const SubmitTestimonialPage = lazy(() => import("./pages/user/SubmitTestimonialPage"));
const IdentityCardPage = lazy(() => import("./pages/IdentityCardPage"));

const PrivateRoute = ({ children, rolesAllowed }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isOnboarded = localStorage.getItem("isOnboarded");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rolesAllowed && !rolesAllowed.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Redirect to onboarding if they have not completed it yet
  if (isOnboarded === "false" && window.location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // Redirect away from onboarding if they already completed it
  if (isOnboarded === "true" && window.location.pathname === "/onboarding") {
    return <Navigate to={role === "admin" || role === "superadmin" ? "/admin-dashboard" : "/user-dashboard"} replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutClub />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/onboarding"
            element={
              <PrivateRoute rolesAllowed={["student", "user", "admin", "superadmin"]}>
                <Onboarding />
              </PrivateRoute>
            }
          />


          {/* Admin Dashboard Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/events"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <ManageEventsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/notices"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <ManageNoticesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/gallery"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <EventGalleryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/testimonials"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <TestimonialsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/users"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <UsersDashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/registrations"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <AllRegistrationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/event-registrations"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <EventRegistrationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/event-registrations/:eventId"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <ApprovedAttendeesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/messages"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <MessagesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-dashboard/id-card"
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <IdentityCardPage role="admin" />
              </PrivateRoute>
            }
          />

          {/* User Dashboard Routes */}
          <Route
            path="/user-dashboard"
            element={
              <PrivateRoute rolesAllowed={["student", "user", "admin", "superadmin"]}>
                <UserDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/events"
            element={
              <PrivateRoute rolesAllowed={["student", "user", "admin", "superadmin"]}>
                <UserEventsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/registrations"
            element={
              <PrivateRoute rolesAllowed={["student", "user", "admin", "superadmin"]}>
                <MyRegistrationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/testimonial"
            element={
              <PrivateRoute rolesAllowed={["student", "user", "admin", "superadmin"]}>
                <SubmitTestimonialPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-dashboard/id-card"
            element={
              <PrivateRoute rolesAllowed={["student", "user", "admin", "superadmin"]}>
                <IdentityCardPage role="user" />
              </PrivateRoute>
            }
          />

          {/* CRUD Standalone pages */}
          <Route 
            path="/edit-event/:id" 
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <EditEvent />
              </PrivateRoute>
            }
          />
          <Route 
            path="/register/:eventId" 
            element={
              <PrivateRoute rolesAllowed={["student", "user", "admin", "superadmin"]}>
                <RegistrationForm />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/edit-notice/:id" 
            element={
              <PrivateRoute rolesAllowed={["admin", "superadmin"]}>
                <EditNotice />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
