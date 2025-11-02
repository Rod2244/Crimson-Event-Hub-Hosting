import { useState, useEffect } from "react";
import Button from "./Button";
import AnnouncementCard from "./AnnouncementCard";

export default function LatestUpdates() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortStatus, setSortStatus] = useState("All"); // ✅ new state for dropdown

  const categories = [
    "All",
    "Academic",
    "Organizations",
    "Non-Academic",
    "Council Events",
  ];

  const statuses = ["All", "Upcoming", "Ongoing", "Completed", "Cancelled"];

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        setLoading(false);
      });
  }, []);

  let filteredAnnouncements =
    activeCategory === "All"
      ? announcements
      : announcements.filter((a) => a.category === activeCategory);

  if (sortStatus !== "All") {
    filteredAnnouncements = filteredAnnouncements.filter(
      (a) => a.status.toLowerCase() === sortStatus.toLowerCase()
    );
  }

  return (
    <div className="py-4 px-6"> 
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            const styles = isActive
              ? "bg-[#a22c36] text-white border-[#a22c36]"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200";

            return (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1 rounded-full text-sm font-medium border transition-all cursor-pointer ${styles}`}
              >
                {category}
              </Button>
            );
          })}
        </div>

        <div>
          <select
            value={sortStatus}
            onChange={(e) => setSortStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#a22c36] cursor-pointer"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                Sort by: {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-8">Loading announcements...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((item) => (
              <AnnouncementCard key={item.id} {...item} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No announcements found for this filter.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
