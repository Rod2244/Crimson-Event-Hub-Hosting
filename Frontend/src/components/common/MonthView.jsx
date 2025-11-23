import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export default function MonthView ({ 
    days,
    getEventsForDay,
    setSelectedEvent,
}) {
    return (
      <div className="bg-white rounded-lg-shadow-sm p-6 mb-6">
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(days => (
            <div key={days} className="text-center font-bold text-gray-700 py-3 uupercase tracking-wider">
              {days}
            </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((days, idx) => {
          const dayEvents = days ? getEventsForDay(days) : [];
          return (
            <div key={idx}
            className={`min-h-32 p-3 rounded-lg border-2 transition ${
              days
              ? 'bg-white border-gray-300'
              : 'bg-white border-gray-200'
            }`}
            >
              {days && (
                <>
                <div className="font-bold text-lg text-gray-800 mb-2">{days}</div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map(event => (
                    <div key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`text-xs p-2 rounded cursor-pointer hover:shadow-md transition font-semibold truncate ${
                      event.category === 'Academic'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                    }`}
                    title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}