import UpcomingEvent from "../UpcomingEvent";
import CalendarCard from "./CalendarCard";
import QuickActions from "./QuickAction";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const upcoming = [
    { date: "21", month: "Sept", title: "Career Fair 2025", time: "9:00 AM – 4:00 PM" },
    { date: "25", month: "Sept", title: "Research Symposium", time: "1:00 PM – 5:00 PM" },
    { date: "29", month: "Sept", title: "Midterm Exams Begin", time: "All Day" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800 space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CalendarCard />
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Upcoming Events</h3>
            <button 
              onClick={() => navigate("/events")}
              className="text-[#d64553] text-sm font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="divide-y">
            {upcoming.map((u, i) => (
              <UpcomingEvent key={i} {...u} />
            ))}
          </div>
        </div>
      </div>

      <QuickActions onSubmit={() => alert("Redirect to submission form")} />
    </div>
  );
}
