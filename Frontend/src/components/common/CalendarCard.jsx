import { useState } from "react";

export default function CalendarCard() {
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(2025);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const highlighted = [15, 16, 21, 25, 29];

  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const daysArray = Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - firstDay + 1;
    return dayNum > 0 && dayNum <= daysInMonth ? dayNum : "";
  });

  return (
    <div className="bg-gray-100 p-4 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-700">
          {monthNames[month]} {year}
        </h3>
        <button className="text-[#d64553] text-sm font-medium hover:underline">
          View Calendar
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-gray-500 font-medium">
            {d}
          </div>
        ))}

        {daysArray.map((day, i) => {
          if (!day) return <div key={i} className="h-8 rounded-lg"></div>;

          const isHighlighted = highlighted.includes(day);
          const isPrimary = day === 16;

          return (
            <div
              key={i}
              className={`h-8 flex items-center justify-center rounded-lg font-medium
                ${
                  isPrimary
                    ? "bg-[#d64553] text-white"
                    : isHighlighted
                    ? "bg-red-100 text-[#d64553]"
                    : "bg-white text-gray-700"
                } shadow-sm`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
