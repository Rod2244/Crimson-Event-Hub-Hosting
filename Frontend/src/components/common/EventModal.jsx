import React from "react";

export default function EventModal ({selectedEvent, setSelectedEvent }) {
    if (!selectedEvent) return null;
    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 ">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">{selectedEvent.title}</h2>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-600 font-semibold">Date</p>
                            <p className="text-lg text-gray-800">{selectedEvent.date}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-semibold">Time</p>
                            <p className="text-lg text-gray-800">{selectedEvent.time}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p ssNaclame="text-sm text-gray-600 font-semibold">Location</p>
                                <p className="text-lg text-gray-800">{selectedEvent.location}</p>
                            </div>
                            <div>
                                <p ssNaclame="text-sm text-gray-600 font-semibold">Organizer</p>
                                <p className="text-lg text-gray-800">{selectedEvent.organizer}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-600 font-semibold">Attendees</p>
                                <p className="text-lg text-gray-800">{selectedEvent.attendees} people</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-semibold">Category</p>
                                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${
                                    selectedEvent.category === 'Academic'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                    {selectedEvent.category}
                                </span>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 font-semibold mb-2"> Description </p>
                            <p className="text-gray-800">{selectedEvent.description}</p>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition">
                            Register Now
                        </button>

                        <button onClick={() => setSelectedEvent(null)}
                            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-3 rounded-lg font-semibold transition"
                            >
                                Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}