import React, { useState } from "react";

const FiltersSidebar = ({ onClearAll, onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: [],
    category: [],
    dateRange: "All Dates",
    department: [],
    status: [],
  });

  const handleCheckboxChange = (section, value) => {
    setFilters((prev) => {
      const current = prev[section];
      const updated =
        current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
      const newFilters = { ...prev, [section]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleDateChange = (value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, dateRange: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleClear = () => {
    setFilters({
      type: [],
      category: [],
      dateRange: "All Dates",
      department: [],
      status: [],
    });
    onClearAll?.();
  };

  return (
    <div className="w-64 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-700">Filters</h2>
        <button
          onClick={handleClear}
          className="text-sm text-red-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      <Section title="Type">
        {["Events", "Announcements"].map((type) => (
          <Checkbox
            key={type}
            label={type}
            checked={filters.type.includes(type)}
            onChange={() => handleCheckboxChange("type", type)}
          />
        ))}
      </Section>

      <Section title="Category">
        {["Academic", "Organization", "Sports", "Cultural", "Career"].map(
          (cat) => (
            <Checkbox
              key={cat}
              label={cat}
              checked={filters.category.includes(cat)}
              onChange={() => handleCheckboxChange("category", cat)}
            />
          )
        )}
      </Section>

      <Section title="Date Range">
        {["All Dates", "Today", "This Week", "This Month"].map(
          (date) => (
            <Radio
              key={date}
              label={date}
              name="dateRange"
              checked={filters.dateRange === date}
              onChange={() => handleDateChange(date)}
            />
          )
        )}
      </Section>

      <Section title="Department">
        {["CCS", "COE", "CTE", "CLA", "All Department"].map((dept) => (
          <Checkbox
            key={dept}
            label={dept}
            checked={filters.department.includes(dept)}
            onChange={() => handleCheckboxChange("department", dept)}
          />
        ))}
      </Section>

      <Section title="Status">
        {["Open for Registration", "Full", "Upcoming", "Completed"].map(
          (status) => (
            <Checkbox
              key={status}
              label={status}
              checked={filters.status.includes(status)}
              onChange={() => handleCheckboxChange("status", status)}
            />
          )
        )}
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-4">
    <h3 className="text-sm font-semibold text-gray-600 mb-2">{title}</h3>
    <div className="space-y-1">{children}</div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span>{label}</span>
  </label>
);

const Radio = ({ label, name, checked, onChange }) => (
  <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-red-600 focus:ring-red-500"
    />
    <span>{label}</span>
  </label>
);

export default FiltersSidebar;
