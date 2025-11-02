import { Calendar } from "lucide-react";

export default function RegisteredTab() {
  const events = [
    {
      title: "CCS Hackathon 2025",
      date: "Nov 20, 2025 • 8:00 AM • Academic",
      status: "Upcoming",
    },
    {
      title: "Career Fair 2025",
      date: "Oct 21, 2025 • 8:00 AM • Career",
      status: "Upcoming",
    },
    {
      title: "Tech Summit 2025",
      date: "Nov 15, 2025 • 1:00 PM • Academic",
      status: "Upcoming",
    },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registered Events ({events.length})
      </h2>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Calendar className="text-red-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm font-medium">
                {event.status}
              </span>
              <button className="text-red-600 border border-red-400 hover:bg-red-50 px-3 py-1 rounded-md text-sm font-medium transition">
                Unregister
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
