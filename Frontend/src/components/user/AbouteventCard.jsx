import React, { useEffect, useState } from "react";

export default function AboutEventCard() {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch("/data/eventDetails.json")
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error("Error loading event data:", err));
  }, []);

  if (!event) {
    return (
      <div className="text-center text-gray-500 mt-8">
        Loading event details...
      </div>
    );
  }

  return (
    
    <div className="bg-white w-full p-6 rounded-xl shadow-sm border border-gray-200 gap-3">
      <h2 className="text-gray-900 text-xl font-bold border-b border-gray-200 pb-3 mb-5">
        {event.title}
      </h2>

      {event.description.map((para, i) => (
        <p key={i} className="text-gray-700 mb-4 leading-relaxed">
          {para}
        </p>
      ))}

      <h3 className="text-gray-900 font-semibold mt-8 mb-3">
        {event.expectationsTitle}
      </h3>

      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {event.expectations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <p className="text-gray-700 mt-8 leading-relaxed italic">
        {event.footer}
      </p>
    </div>
  );
}
