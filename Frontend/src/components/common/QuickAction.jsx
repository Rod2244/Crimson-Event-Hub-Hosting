import { MapPin } from "lucide-react";

export default function QuickActions({ onSubmit }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold mb-3">Quick Actions</h3>
      <button
        onClick={onSubmit}
        className="bg-[#d64553] hover:bg-[#c43b48] text-white text-sm px-4 py-2 rounded-md transition flex items-center gap-2"
      >
        <MapPin size={16} /> Submit Event/Announcement
      </button>
    </div>
  );
}
