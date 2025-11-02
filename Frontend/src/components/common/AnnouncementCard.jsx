import { useNavigate } from "react-router-dom"
import { Calendar, Users } from "lucide-react";
import Button from "./Button";

export default function AnnouncementCard({ id, category, color, title, desc, tags, time, date, status }) {

  const navigate = useNavigate();

  const statusColors = {
    Upcoming: "bg-green-100 text-green-700",
    Ongoing: "bg-yellow-100 text-yellow-700",
    Past: "bg-gray-200 text-gray-600",
    Cancelled: "bg-red-100 text-red-700",
  };

  const dotColors = {
    Upcoming: "bg-green-500",
    Ongoing: "bg-yellow-500",
    Past: "bg-gray-400",
    Cancelled: "bg-red-500",
  };

  const handleViewDetails = () => {
    navigate(`/homepage/${id}`);
  };

  return (
    <div className="bg-white w-full p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className={`${color} text-white text-xs font-semibold px-3 py-1 rounded-md uppercase`}>
          {category}
        </span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>

      <div>
        <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 border-t border-[#d64553] pt-3">
        {tags.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md"
          >
            <Users size={14} /> {t}
          </span>
        ))}
        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md">
          <Calendar size={14} /> {date}
        </span>
        <span
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            statusColors[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              dotColors[status] || "bg-gray-500"
            }`}
          />
          {status}
        </span>
      </div>

      <div className="flex justify-end mt-2">
        <Button 
          onClick={handleViewDetails}
          className="bg-[#d64553] hover:bg-[#c43b48] text-white text-sm px-4 py-1.5 rounded-full transition cursor-pointer">
          View Details
        </Button>
      </div>
    </div>
  );
}
