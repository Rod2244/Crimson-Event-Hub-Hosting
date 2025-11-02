import { Calendar, Clock, MapPin, Users, AlertCircle } from "lucide-react";

export default function EventDetailsSection({ event }) {
  return (
    <div className="bg-white w-full p-6 rounded-xl shadow-sm border border-gray-200 gap-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Details</h2>

      <ul className="divide-y divide-gray-200">
        <li className="flex items-start gap-3 py-3">
          <div className="p-2 bg-gray-200 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Date</p>
            <p className="text-sm text-gray-800">{event.date}</p>
          </div>
        </li>

        <li className="flex items-start gap-3 py-3">
          <div className="p-2 bg-gray-200 rounded-lg">
            <Clock className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Time</p>
            <p className="text-sm text-gray-800">{event.time}</p>
          </div>
        </li>

        <li className="flex items-start gap-3 py-3">
          <div className="p-2 bg-gray-200 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Location</p>
            <p className="text-sm text-gray-800">{event.location}</p>
          </div>
        </li>

        <li className="flex items-start gap-3 py-3">
          <div className="p-2 bg-gray-200 rounded-lg">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">Target Audience</p>
            <p className="text-sm text-gray-800">{event.audience}</p>
          </div>
        </li>

        <li className="flex items-start gap-3 py-3">
          <div className="p-2 bg-gray-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-gray-500">
              Registration Deadline
            </p>
            <p className="text-sm text-gray-800">{event.deadline}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
