import Navbar from "../components/common/Navbar";
import { useState } from "react";
import { Calendar, Bell, Megaphone, CheckCircle, XCircle, Info } from "lucide-react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Event: CCS Hackathon 2025",
      message: "A new event has been posted. Registration is now open!",
      time: "2 hours ago",
      category: "Events",
      icon: <Calendar className="text-red-500" size={24} />,
      read: false,
    },
    {
      id: 2,
      title: "Event Reminder: Career Fair Tomorrow",
      message: "Career Fair 2025 is happening tomorrow at 9:00 AM. Don’t forget to attend!",
      time: "5 hours ago",
      category: "Reminders",
      icon: <Bell className="text-pink-500" size={24} />,
      read: false,
    },
    {
      id: 3,
      title: "Important: Midterm Schedule Posted",
      message: "The midterm schedule for AY 2024-2025 has been posted.",
      time: "1 day ago",
      category: "Announcements",
      icon: <Megaphone className="text-orange-500" size={24} />,
      read: true,
    },
    {
      id: 4,
      title: "Submission Approved",
      message: "Your event 'Blood Donation Drive' has been approved and published.",
      time: "2 days ago",
      category: "Approvals",
      icon: <CheckCircle className="text-green-500" size={24} />,
      read: true,
    },
    {
      id: 5,
      title: "Registration Confirmed",
      message: "You have successfully registered for 'Tech Summit 2025'.",
      time: "3 days ago",
      category: "Registrations",
      icon: <Info className="text-blue-500" size={24} />,
      read: true,
    },
    {
      id: 6,
      title: "Event Cancelled: Basketball Practice",
      message: "The basketball practice scheduled for next week has been cancelled.",
      time: "4 days ago",
      category: "Events",
      icon: <XCircle className="text-red-600" size={24} />,
      read: true,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Unread", "Events", "Announcements", "Reminders", "Registrations", "Approvals"];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    activeCategory === "All"
      ? notifications
      : activeCategory === "Unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <section className="bg-gray-100 py-4 px-6 border-t border-[#d64553] justify-between rounded-lg flex items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
            <p className="text-sm text-gray-500 mt-1">
              You have{" "}
              <span className="font-semibold text-red-700">{unreadCount}</span>{" "}
              {unreadCount === 1 ? "unread notification" : "unread notifications"}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm font-semibold px-4 py-1.5 rounded-md transition"
            >
              Mark All as Read
            </button>
          )}
        </section>

        <div className="flex flex-wrap gap-3 mb-5">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const styles = isActive
              ? "bg-[#a22c36] text-white border-[#a22c36]"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200";

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1 rounded-full text-sm font-medium border transition-all cursor-pointer ${styles}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-start border rounded-lg p-4 transition ${
                n.read ? "bg-gray-50 border-gray-200" : "bg-white border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2">{n.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    {n.title}
                    {!n.read && <span className="text-red-500 text-lg">•</span>}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{n.message}</p>
                  <div className="flex gap-3 mt-3">
                    {!n.read && (
                      <button
                        onClick={() => handleMarkRead(n.id)}
                        className="bg-blue-50 border border-blue-500 text-blue-600 text-sm px-3 py-1 rounded-md hover:bg-blue-100 transition"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(n.id)}
                      className="border border-red-500 text-red-600 text-sm px-3 py-1 rounded-md hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <p className="text-center text-gray-500 py-10">No notifications found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
