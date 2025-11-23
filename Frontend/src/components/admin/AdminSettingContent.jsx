import React, { useState, useEffect } from "react";

// Mock archived data
const archivedData = [
  { id: 1, title: "Science Fair", type: "Event", date: "2025-10-15" },
  { id: 2, title: "Campus Clean-Up", type: "Announcement", date: "2025-09-30" },
  { id: 3, title: "Art Exhibition", type: "Event", date: "2025-08-20" },
  { id: 4, title: "Art Exhibition", type: "Event", date: "2025-08-20" },
  { id: 5, title: "Art Exhibition", type: "Event", date: "2025-08-20" },
  { id: 6, title: "Art Exhibition", type: "Event", date: "2025-08-20" },
];

const SettingContent = () => {
  const [twoFA, setTwoFA] = useState(false);
  const [autoLogout, setAutoLogout] = useState(false);
  const [passwordLength, setPasswordLength] = useState(8);
  const [archivedFilter, setArchivedFilter] = useState("all");
  const [rejectedFilter, setRejectedFilter] = useState("all");
  const [rejectedData, setRejectedData] = useState([]);
  const [loadingRejected, setLoadingRejected] = useState(true);
  const [rejectedError, setRejectedError] = useState("");

  // Fetch rejected items from backend
  useEffect(() => {
    const fetchRejected = async () => {
      try {
        setLoadingRejected(true);
        setRejectedError("");

        // Get the token from localStorage (or wherever you store it)
        const token = localStorage.getItem("token");
        if (!token) {
          setRejectedError("You must be logged in to view rejected items");
          setRejectedData([]);
          return;
        }

        const res = await fetch("http://localhost:5100/api/rejected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // attach JWT token
          },
        });

        console.log("Rejected data:", rejectedData);

        if (!res.ok) {
          // 401, 403, 500, etc.
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        // Adapt based on your backend response structure
        if (data.success && Array.isArray(data.items)) {
          setRejectedData(data.items);
        } else if (Array.isArray(data)) {
          // fallback if backend returns just an array
          setRejectedData(data);
        } else {
          setRejectedError(data.message || "Failed to fetch rejected items");
          setRejectedData([]);
        }
      } catch (err) {
        console.error("Error fetching rejected items:", err);
        setRejectedError(err.message || "Server error while fetching rejected items");
        setRejectedData([]);
      } finally {
        setLoadingRejected(false);
      }
    };

    fetchRejected();
  }, []);


  // Filters
  const filteredArchived = archivedData.filter(item =>
    archivedFilter === "all" ? true : item.type === archivedFilter
  );

  const filteredRejected = rejectedData.filter(item =>
    rejectedFilter === "all" ? true : item.type === rejectedFilter
  );

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6 p-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 space-y-6 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
        {/* Security & Privacy */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Security & Privacy</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Two-Factor Authentication (2FA) for Admins</span>
              <input 
                type="checkbox" 
                checked={twoFA} 
                onChange={() => setTwoFA(!twoFA)} 
                className="w-5 h-5 accent-red-600"
              />
            </label>

            <div className="flex items-center space-x-2">
              <label className="text-gray-700 font-medium">Minimum Password Length:</label>
              <input 
                type="number" 
                value={passwordLength} 
                onChange={e => setPasswordLength(Number(e.target.value))} 
                className="w-20 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-red-600 focus:border-red-600"
              />
            </div>

            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Auto-logout Inactive Users</span>
              <input 
                type="checkbox" 
                checked={autoLogout} 
                onChange={() => setAutoLogout(!autoLogout)} 
                className="w-5 h-5 accent-red-600"
              />
            </label>

            <div className="flex items-center space-x-2">
              <label className="text-gray-700 font-medium">Data Retention Policy:</label>
              <select className="border border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-red-600 focus:border-red-600">
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
                <option value="forever">Forever</option>
              </select>
            </div>
          </div>
        </section>

        {/* Integration & API Settings */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Integration & API Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Google Calendar Sync</span>
              <input type="checkbox" className="w-5 h-5 accent-red-600" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Email Notifications</span>
              <input type="checkbox" className="w-5 h-5 accent-red-600" />
            </label>
          </div>
        </section>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 space-y-8 overflow-y-auto h-[calc(100vh-2rem)]">
        {/* Archived */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Archived</h2>

          <div className="flex items-center mb-4 space-x-3">
            <label className="text-gray-700 font-medium">Filter by type:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-red-600 focus:border-red-600"
              value={archivedFilter}
              onChange={e => setArchivedFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Event">Events</option>
              <option value="Announcement">Announcements</option>
            </select>
          </div>

          <div className="grid grid-cols-12 gap-4 font-medium text-gray-700 bg-gray-100 p-3 rounded-t-lg">
            <div className="col-span-6">Title</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Date</div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredArchived.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="grid grid-cols-12 gap-4 items-center p-3 hover:bg-gray-50 transition rounded-b-lg"
              >
                <div className="col-span-6 font-medium text-gray-800 truncate">{item.title}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    item.type === "Event" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                  }`}>{item.type}</span>
                </div>
                <div className="col-span-2 text-gray-500">{item.date}</div>
              </div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default SettingContent;
