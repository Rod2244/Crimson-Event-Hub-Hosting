import React, { useEffect, useState } from "react";
import { X, Download } from "lucide-react";

const EventDetailModal = ({ eventId, onClose, onViewEvent  }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // -----------------------------
    // FETCH EVENT BY ID
    // -----------------------------
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`http://localhost:5100/api/events/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch event");
                }

                const data = await res.json();
                setEvent(data);
            } catch (error) {
                console.error("Error fetching event:", error);
            } finally {
                setLoading(false);
            }
        };

        if (eventId) fetchEvent();
    }, [eventId]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="text-white text-xl">Loading event...</div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl">
                    <p className="text-red-600">Event not found.</p>
                    <button
                        onClick={onClose}
                        className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-opacity-50 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
                >
                    <X size={24} />
                </button>

                <div className="p-6 sm:p-10 space-y-6">

                    {/* Event Cover Image */}
                    <div className="w-full h-60 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center">
                        {event.event_image ? (
                            <img
                                src={`http://localhost:5100/uploads/events/${event.event_image}`}
                                className="w-full h-full object-cover"
                                alt="Event"
                            />
                        ) : (
                            <span className="text-gray-500">No image available</span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>

                    {/* Category & Organizer */}
                    <div className="flex flex-wrap gap-3">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">{event.category}</span>

                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                            Organizer: {event.organizer_name}
                        </span>
                    </div>

                    {/* Grid Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <strong>Date:</strong>
                            <p>{new Date(event.event_date).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <strong>Time:</strong>
                            <p>{event.event_time}</p>
                        </div>
                        <div>
                            <strong>Location:</strong>
                            <p>{event.location}</p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <strong>Description:</strong>
                        <p className="whitespace-pre-line">{event.description}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;
