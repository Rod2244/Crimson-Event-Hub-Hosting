// components/EventFilters.jsx
import React from "react";
import { Search, ChevronDown } from "lucide-react";

const EventFilters = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }) => {
  const categories = ["All", "Academic", "Non-Academic"];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="relative flex-grow">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events or organizer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-red-500 focus:border-red-500 text-gray-700"
        />
      </div>

      {/* Category Dropdown */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="flex-shrink-0 flex items-center bg-white border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 text-sm font-medium appearance-none"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat.toLowerCase()}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EventFilters;
