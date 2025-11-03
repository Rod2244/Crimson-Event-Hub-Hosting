import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import FiltersSidebar from "../components/common/FiltersSidebar";
import eventsData from "../../public/data/data.json";

export default function SearchPage() {
  const [filters, setFilters] = useState({});
  const [filteredEvents, setFilteredEvents] = useState(eventsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // for mobile sidebar

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const handleClearAll = () => {
    setFilters({
      type: [],
      category: [],
      dateRange: "All Dates",
      department: [],
      status: [],
    });
    setFilteredEvents(eventsData);
  };

  useEffect(() => {
    let filtered = [...eventsData];

    if (filters.type?.length) {
      filtered = filtered.filter((e) => filters.type.includes(e.type));
    }
    if (filters.category?.length) {
      filtered = filtered.filter((e) => filters.category.includes(e.category));
    }
    if (filters.department?.length) {
      filtered = filtered.filter((e) => filters.department.includes(e.department));
    }
    if (filters.status?.length) {
      filtered = filtered.filter((e) => filters.status.includes(e.status));
    }
    if (filters.dateRange && filters.dateRange !== "All Dates") {
      const today = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.date);
        if (filters.dateRange === "Today")
          return eventDate.toDateString() === today.toDateString();
        if (filters.dateRange === "This Week") {
          const start = new Date(today.setDate(today.getDate() - today.getDay()));
          const end = new Date(start);
          end.setDate(end.getDate() + 7);
          return eventDate >= start && eventDate <= end;
        }
        if (filters.dateRange === "This Month")
          return (
            eventDate.getMonth() === new Date().getMonth() &&
            eventDate.getFullYear() === new Date().getFullYear()
          );
        return true;
      });
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [filters, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      <Navbar showSearchBar={true} />

      <main
        className={`flex p-6 gap-6 transition-all duration-300 ${
          isFilterOpen ? "blur-sm pointer-events-none md:pointer-events-auto" : ""
        }`}
      >
        <div className="hidden md:block">
          <FiltersSidebar
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
        </div>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="fixed bottom-6 right-6 z-30 md:hidden bg-red-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-red-600 transition"
        >
          Show Filters
        </button>

        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Search Results for “{searchQuery}”
              </h1>
              <p className="text-sm text-gray-500">
                {filteredEvents.length} result{filteredEvents.length !== 1 && "s"} found
              </p>
            </div>
            <div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400">
                <option>Sort: Relevance</option>
                <option>Sort: Date</option>
                <option>Sort: Department</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full">
                {searchQuery} ✕
              </span>
            )}
            {filters.category?.map((cat) => (
              <span
                key={cat}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
            {filters.status?.map((status) => (
              <span
                key={status}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                {status}
              </span>
            ))}
          </div>

          {filteredEvents.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No results found.</p>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition duration-150"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition px-4 py-1 rounded-lg text-sm">
                        View Details
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm">
                        Register Now
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2 text-xs text-gray-600">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md">
                      {item.type}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">
                      {item.department}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="text-xs text-gray-400 mt-2">
                    📅 {item.date} | Status: {item.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {isFilterOpen && (
        <>
          <div
            onClick={() => setIsFilterOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden"
          ></div>

          <div
            className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              <FiltersSidebar
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
