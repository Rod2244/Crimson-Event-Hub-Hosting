import React, { useState } from 'react';
import { Search, Plus, Eye, ChevronDown, Filter, ChevronLeft } from 'lucide-react';

// --- Mock Data ---
const eventRegistrations = [
  { id: 1, title: 'Rave Party', category: 'Non-Academic', organizer: 'Student Council', createdAt: 'Nov 18, 2025, 7:21 PM', status: 'Upcoming', registeredCount: 3 },
  { id: 2, title: 'Hackathon', category: 'Academic', organizer: 'CSS Officials', createdAt: 'Nov 18, 2025, 7:21 PM', status: 'Approved', registeredCount: 2 },
  { id: 3, title: 'Toy Expo', category: 'Non-Academic', organizer: 'Student Council', createdAt: 'Nov 18, 2025, 7:21 PM', status: 'Rejected', registeredCount: 0 },
  { id: 4, title: 'Dance Competition', category: 'Non-Academic', organizer: 'Student Council', createdAt: 'Nov 18, 2025, 7:21 PM', status: 'Upcoming', registeredCount: 98 },
  { id: 5, title: 'Battle of the Bands', category: 'Non-Academic', organizer: 'Student Council', createdAt: 'Nov 18, 2025, 7:21 PM', status: 'Approved', registeredCount: 210 },
  { id: 6, title: 'Tawag ng Mic', category: 'Non-Academic', organizer: 'Student Council', createdAt: 'Nov 18, 2025, 7:21 PM', status: 'Rejected', registeredCount: 0 },
];

const attendeesData = {
  1: [
    { id: 101, firstName: 'Anya', lastName: 'Forger', email: 'anya.f@example.com', joined: 'Nov 18, 2025, 7:30 PM' },
    { id: 102, firstName: 'Loid', lastName: 'Forger', email: 'loid.f@example.com', joined: 'Nov 18, 2025, 8:00 PM' },
    { id: 103, firstName: 'Yor', lastName: 'Forger', email: 'yor.f@example.com', joined: 'Nov 18, 2025, 8:45 PM' },
  ],
  2: [
    { id: 201, firstName: 'Bartholomew', lastName: 'Kuma', email: 'b.kuma@example.com', joined: 'Nov 10, 2025, 10:00 AM' },
    { id: 202, firstName: 'Boa', lastName: 'Hancock', email: 'b.hancock@example.com', joined: 'Nov 11, 2025, 11:15 AM' },
  ]
};

// --- Utilities ---
const getStatusClasses = (status) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-700';
    case 'Rejected': return 'bg-red-100 text-red-700';
    case 'Upcoming': return 'bg-blue-100 text-blue-700';
    default: return '';
  }
};

// --- Event Table ---
const EventRegistrationTable = ({ events, onSelectEvent }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-x-auto border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-red-600 text-white">
        <tr>
          <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">Event</th>
          <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider hidden sm:table-cell">Organizer</th>
          <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">Registered</th>
          <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
          <th className="p-4 text-center text-sm font-semibold uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {events.map(event => (
          <tr key={event.id} className="border-b hover:bg-red-50 transition-all duration-150 cursor-pointer" onClick={() => onSelectEvent(event)}>
            <td className="p-4 text-gray-800 font-medium">{event.title}</td>
            <td className="p-4 text-gray-600 text-sm hidden sm:table-cell">{event.organizer}</td>
            <td className="p-4 text-red-600 font-bold">{event.registeredCount}</td>
            <td className="p-4">
              <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(event.status)}`}>
                {event.status}
              </span>
            </td>
            <td className="p-4 text-center">
              <Eye size={18} className="text-gray-400 hover:text-red-600 transition-colors duration-150 mx-auto"/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Attendee Table ---
const AttendeeDetailTable = ({ event, attendees, onBack }) => (
  <div>
    <button
      onClick={onBack}
      className="flex items-center text-red-600 font-semibold mb-6 hover:text-red-800 transition duration-200"
    >
      <ChevronLeft size={20} className="mr-2" /> Back
    </button>

    <h2 className="text-2xl font-bold text-gray-900 mb-1">{event.title} Attendees</h2>
    <p className="text-gray-500 mb-6">Total Registered: <span className="font-semibold text-red-600">{attendees.length}</span></p>

    <div className="bg-white rounded-2xl shadow-md overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">First Name</th>
            <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">Last Name</th>
            <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="p-4 text-left text-sm font-semibold uppercase tracking-wider hidden md:table-cell">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {attendees.length > 0 ? attendees.map(attendee => (
            <tr key={attendee.id} className="hover:bg-gray-50 transition-all duration-150">
              <td className="p-4 font-medium text-gray-800">{attendee.firstName}</td>
              <td className="p-4 font-medium text-gray-800">{attendee.lastName}</td>
              <td className="p-4 text-blue-600 text-sm break-words">{attendee.email}</td>
              <td className="p-4 text-gray-500 text-sm hidden md:table-cell">{attendee.joined}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4" className="p-8 text-center text-gray-400 italic">No attendees registered yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Component ---
const OrganizerRegistrationPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = eventRegistrations.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentAttendees = selectedEvent ? attendeesData[selectedEvent.id] || [] : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
        <header className="bg-white shadow-md p-4 sm:p-6 flex justify-between items-center rounded-b-2xl border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedEvent ? "Registration Details" : "Registration Management"}
          </h1>
        </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-2">
        {!selectedEvent && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-grow max-w-md w-full">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
              <input
                type="text"
                placeholder="Search events or organizer..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-red-500 focus:border-red-500 transition duration-150 text-gray-700"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition duration-150 text-sm font-medium">
                <Filter size={16}/> Status
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition duration-150 text-sm font-medium">
                All Categories <ChevronDown size={16}/>
              </button>
            </div>
          </div>
        )}

        {/* Conditional Tables */}
        {selectedEvent ? (
          <AttendeeDetailTable event={selectedEvent} attendees={currentAttendees} onBack={() => setSelectedEvent(null)} />
        ) : (
          <EventRegistrationTable events={filteredEvents} onSelectEvent={setSelectedEvent} />
        )}
      </main>
    </div>
  );
};

export default OrganizerRegistrationPage;
