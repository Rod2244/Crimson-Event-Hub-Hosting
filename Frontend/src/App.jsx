import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import EditProfilePage from "./pages/EditprofilePage";
import NotificationPage from "./pages/NotificationPage";
import EventPage from "./pages/EventPage";
import SearchPage from "./pages/SearchPage";
import OrganizerPage from "./pages/OrganizerPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import EventManagementPage from "./pages/EventManagementPage";
import AnnouncementManagementPage from "./pages/AnnouncementManagementPage";
import UserManagementPage from "./pages/UserManagementPage";
import { UserProvider } from "./context/UserContext";
import EventSubmissionAdminPage from "./pages/EventSubmissionAdminPage";
import AnnouncementSubmissionAdminPage from "./pages/AnnouncementSubmissionAdminPage"

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/homepage/:id" element={<EventDetails />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/notificationpage" element={<NotificationPage />} />

          {/* User routes */}
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/editProfile"
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Organizer route */}
          <Route
            path="/organizer/profile"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <OrganizerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer/editProfile"
            element={
              <ProtectedRoute allowedRoles={[2]}>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/eventpage"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <EventManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/eventpage/eventsubmission"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <EventSubmissionAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcementpage"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <AnnouncementManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcementpage/announcementsubmission"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <AnnouncementSubmissionAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/userpage"
            element={
              <ProtectedRoute allowedRoles={[3]}>
                <UserManagementPage />
              </ProtectedRoute>
            }
          />


          {/* About / public pages */}
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
