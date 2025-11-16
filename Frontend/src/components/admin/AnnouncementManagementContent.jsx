import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const announcementsData = [
  { title: "Semester Registration Open", date: "Oct 29, 2025", audience: "School-wide", author: "Registrar Office", status: "Published", views: "542" },
  { title: "Scholarship Applications Now Open", date: "Oct 28, 2025", audience: "School-wide", author: "Finance Office", status: "Published", views: "430" },
  { title: "Engineering Lab Maintenance", date: "Oct 27, 2025", audience: "Engineering", author: "Facility Management", status: "Published", views: "310" },
  { title: "CCS Department Meeting", date: "Oct 26, 2025", audience: "CCS", author: "CCS Department", status: "Draft", views: "0" },
];

const CategoryTag = ({ audience }) => {
  const isSchoolwide = audience === "School-wide";
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
        isSchoolwide ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
      }`}
    >
      {audience}
    </span>
  );
};

const StatusTag = ({ status }) => {
  const isPublished = status === "Published";
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
        isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

const AnnouncementRow = ({ announcement, isHighlighted }) => (
  <div
    className={`grid grid-cols-8 items-center text-sm px-5 py-3  ${
      isHighlighted ? "bg-gray-50" : "bg-white"
    }`}
  >
    <div className="col-span-2 font-medium text-gray-800 truncate">{announcement.title}</div>
    <div className="text-gray-600 text-xs">{announcement.date}</div>
    <div>
      <CategoryTag audience={announcement.audience} />
    </div>
    <div className="text-gray-600 text-xs truncate">{announcement.author}</div>
    <div className="text-center">
      <StatusTag status={announcement.status} />
    </div>
    <div className="text-center text-gray-600">{announcement.views}</div>
    <div className="flex justify-center space-x-2">
      <button
        className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition"
        title="View"
      >
        <Eye size={16} />
      </button>
      <button
        className="text-gray-500 hover:text-yellow-600 p-1 rounded-full hover:bg-yellow-50 transition"
        title="Edit"
      >
        <Edit size={16} />
      </button>
      <button
        className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const AnnouncementManagementContent = () => {
      const navigate = useNavigate();

      const handleCreateAnnouncement = () => {
        navigate('/admin/announcementpage/announcementsubmission')
      }
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Announcement Management</h1>
        <button 
          className="flex items-center space-x-2 bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-red-800 transition"
          onClick={handleCreateAnnouncement}
        >
          <Plus size={20} />
          <span>Create Announcement</span>
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>
        <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition">
          <option>All Audiences</option>
          <option>School-wide</option>
          <option>Engineering</option>
          <option>CCS</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-8 gap-4 bg-red-700 text-white font-semibold text-sm p-4">
          <div className="col-span-2">Title</div>
          <div>Date</div>
          <div>Audience</div>
          <div>Author</div>
          <div className="text-center">Status</div>
          <div className="text-center">Views</div>
          <div className="text-center">Actions</div>
        </div>

        {/* Body */}
        <div>
          {announcementsData.map((announcement, index) => (
            <AnnouncementRow
              key={index}
              announcement={announcement}
              isHighlighted={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManagementContent;
