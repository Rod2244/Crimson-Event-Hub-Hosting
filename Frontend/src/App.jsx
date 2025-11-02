import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import EventDetails from "./pages/EventDetails"
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";
import EditProfilePage from "./pages/EditprofilePage";
import NotificationPage from "./pages/NotificationPage";
import EventPage from "./pages/EventPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/homepage/:id" element={<EventDetails />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/notificationpage" element={<NotificationPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/profile/editProfile" element={<EditProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}
