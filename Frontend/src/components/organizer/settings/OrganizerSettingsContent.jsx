// components/organizer/settings/OrganizerSettingsContent.jsx
import React, { useState } from "react";

// Mock completed events data
const completedEvents = [
  { id: 1, title: "Hackathon 2025", date: "Nov 20, 2025" },
  { id: 2, title: "Charity Gala", date: "Nov 17, 2025" },
];

const OrganizerSettingsContent = () => {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'archives'

  return (
    <div className="flex flex-col md:flex-row gap-6">
      
      {/* Tabs Navigation */}
      <aside className="flex md:flex-col gap-3 mb-4 md:mb-0">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "profile"
              ? "bg-red-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setActiveTab("archives")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "archives"
              ? "bg-red-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          Completed Events
        </button>
      </aside>

      {/* Content */}
      <div className="flex-1">
          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-2xl shadow-md max-w-4xl">
                <h2 className="text-2xl font-bold mb-6">Edit Organizer Profile</h2>
                <form className="space-y-4">

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                    type="email"
                    defaultValue="admin@example.com"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-medium mb-1">Contact Number</label>
                    <input
                    type="text"
                    defaultValue="+63 912 345 6789"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                {/* Password Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    </div>
                </div>

                {/* Confirm New Password (full width) */}
                <div>
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Save Changes
                </button>
                </form>
            </div>
            )}

        {activeTab === "archives" && (
          <div className="bg-white p-6 rounded-2xl shadow-md max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Completed Events</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-3 font-semibold text-gray-700">Event Name</th>
                  <th className="border-b p-3 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {completedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="p-3">{event.title}</td>
                    <td className="p-3">{event.date}</td>
                  </tr>
                ))}
                {completedEvents.length === 0 && (
                  <tr>
                    <td colSpan="2" className="p-3 text-center text-gray-400">
                      No completed events found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerSettingsContent;
