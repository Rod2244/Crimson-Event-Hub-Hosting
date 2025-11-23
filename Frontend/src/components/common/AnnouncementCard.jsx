import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";
import Button from "./Button";

export default function AnnouncementCard({
  id,
  category,
  color,
  title,
  desc,
  tags = [],
  time,
  date,
  status,
}) {
  const navigate = useNavigate();

  const statusColors = {
    Upcoming: "bg-green-100 text-green-700",
    Ongoing: "bg-yellow-100 text-yellow-700",
    Past: "bg-gray-200 text-gray-600",
    Cancelled: "bg-red-100 text-red-700",
  };

  const categoryColors = {
    "Non-academic": "bg-blue-500 text-blue-700",
    Ongoing: "bg-yellow-100 text-yellow-700",
    Past: "bg-green-200 text-green-600",
    Academic: "bg-red-500 text-red-700",
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

  // Format Date Function (returns readable date string)
  const formatDate = (dateStr) => {
    if (!dateStr) return 'No date available';
    const date = new Date(dateStr);
    return date.toLocaleDateString(); // Example: "11/20/2025"
  };

  // Format Time Function (returns readable time string)
  const formatTime = (timeStr) => {
    if (!timeStr) return 'No time available';

    // Split the time string into components
    const timeParts = timeStr.split(":");
    if (timeParts.length === 3) {
      // If the time is in HH:mm:ss format
      const hours = timeParts[0];
      const minutes = timeParts[1];
      const date = new Date();

      // Set the time based on hours and minutes (ignoring seconds)
      date.setHours(hours, minutes, 0);

      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Example: "7:00 PM"
    }
    
    return 'Invalid time format';
  };

  // Get the category color from the categoryColors object, default to 'bg-gray-300' if not found
  const categoryColor = categoryColors[category] || "bg-gray-300 text-gray-700";

  return (
    <div className="bg-white w-full p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-3">
      {/* Category and Time */}
      <div className="flex justify-between items-center">
        <span
          className={`${categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-md uppercase`}
        >
          {category}
        </span>
        <span className="text-xs text-gray-400">{formatTime(time)}</span> {/* Format time */}
      </div>

      {/* Title and Description */}
      <div>
        <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{desc || 'No description available'}</p> {/* Show fallback text if no description */}
      </div>

      {/* Tags, Date, and Status */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 border-t border-[#d64553] pt-3">
        {/* Tags */}
        {tags.length > 0 && tags.map((tag, i) => (
          <span
            key={i}
            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md"
          >
            <Users size={14} /> {tag}
          </span>
        ))}

        {/* Event Date */}
        <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md">
          <Calendar size={14} /> {formatDate(date)} {/* Format date */}
        </span>

        {/* Status with color indicator */}
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

      {/* Button to View Details */}
      <div className="flex justify-end mt-2">
        <Button
          onClick={handleViewDetails}
          className="bg-[#d64553] hover:bg-[#c43b48] text-white text-sm px-4 py-1.5 rounded-full transition cursor-pointer"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
