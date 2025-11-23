import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';

const ViewEventContent = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`http://localhost:5100/api/events/${eventId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("Event not found");

                const data = await response.json();
                setEvent(data);
            } catch (err) {
                console.error(err);
                alert("Failed to fetch event details.");
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    const handleBack = () => navigate('/admin/eventPage');

    return (
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto bg-gray-50 min-h-screen">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mb-6"
            >
                <ArrowLeft size={18} />
                Back to Events
            </button>

            {loading ? (
                <div className="text-center text-gray-500 text-lg">Loading event details...</div>
            ) : event ? (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Event Cover Image */}
                    {event.event_image && (
                        <div className="w-full h-64 sm:h-96 overflow-hidden">
                            <img
                                src={`http://localhost:5100/uploads/events/${event.event_image}`} 
                                alt="Event Cover"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 sm:p-10 space-y-6">
                        {/* Event Title */}
                        <h1 className="text-4xl font-bold text-gray-800">{event.title}</h1>

                        {/* Category & Organizer */}
                        <div className="flex flex-wrap gap-4 text-gray-600">
                            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">{event.category}</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">Organizer: {event.organizer_name}</span>
                        </div>

                        {/* Date, Time, Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
                            <div>
                                <h3 className="font-semibold">Date</h3>
                                <p>{new Date(event.event_date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Time</h3>
                                <p>{event.event_time || 'N/A'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p>{event.location || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Audience & Number of Registrations */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                            <div>
                                <h3 className="font-semibold">Audience</h3>
                                <p>{event.audience}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Max Registrations</h3>
                                <p>{event.number_of_registration || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Event Link */}
                        {event.event_link && (
                            <div>
                                <h3 className="font-semibold">Event Link</h3>
                                <a
                                    href={event.event_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-red-600 hover:underline break-all"
                                >
                                    {event.event_link}
                                </a>
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                        </div>

                        {/* Event Attachment */}
                        {event.file_name && (
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Attachment</h3>
                                <a
                                    href={`http://localhost:5100/uploads/events/${event.file_name}`}
                                    download
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    <Download size={16} />
                                    Download File
                                </a>
                            </div>
                        )}

                        {/* Event Status */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-1">Status</h3>
                            <span className={`px-3 py-1 rounded-full font-medium text-white ${
                                event.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                            }`}>
                                {event.status}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500 text-lg">Event not found.</div>
            )}
        </div>
    );
};

export default ViewEventContent;
