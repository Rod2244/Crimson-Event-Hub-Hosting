import React, { useEffect, useState } from "react";
import { X, Download } from "lucide-react";

const AnnouncementDetailModal = ({ announcementId, onClose }) => {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5100/api/announcements/${announcementId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch announcement");
        setAnnouncement(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (announcementId) fetchAnnouncement();
  }, [announcementId]);

  if (!announcement) return null; // or a loading spinner

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
        >
          <X size={24} />
        </button>

        <div className="p-6 sm:p-10 space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800">{announcement.title}</h1>

          {/* Category & Posted By */}
          <div className="flex flex-wrap gap-3">
            <span className="bg-gray-100 px-3 py-1 rounded-full">{announcement.category}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">Posted By: {announcement.author}</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {new Date(announcement.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* Description */}
          <div>
            <strong>Description:</strong>
            <p className="whitespace-pre-line mt-1 text-gray-700">{announcement.description}</p>
          </div>

          {/* Attachment */}
          {announcement.file_name && (
            <a
              href={announcement.file_url || "#"}
              download={announcement.file_name}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Download size={16} /> Download File
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetailModal;
