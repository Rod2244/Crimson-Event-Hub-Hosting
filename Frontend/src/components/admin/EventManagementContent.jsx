import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const eventsData = [
    { title: 'Evaluation Meeting', date: 'Nov 5, 2025 at 2:00 PM', category: 'Academic', organizer: 'Office of the Dean, College of Computing Studies (CCS)', attendees: 45, status: 'Active' },
    { title: 'Sports Tournament', date: 'Nov 8, 2025 at 9:00 AM', category: 'Non-Academic', organizer: 'Sports Council', attendees: 120, status: 'Active' },
    { title: 'Career Fair 2025', date: 'Nov 12, 2025 at 10:00 AM', category: 'Academic', organizer: 'Career Services', attendees: 300, status: 'Active' },
    { title: 'Graduation Ceremony', date: 'Nov 20, 2025 at 9:00 AM', category: 'Academic', organizer: 'Registrar', attendees: 500, status: 'Active' },
    { title: 'Graduation Ceremony', date: 'Nov 20, 2025 at 9:00 AM', category: 'Academic', organizer: 'Registrar', attendees: 500, status: 'Active' },
    { title: 'Graduation Ceremony', date: 'Nov 20, 2025 at 9:00 AM', category: 'Academic', organizer: 'Registrar', attendees: 500, status: 'Active' },
    { title: 'Graduation Ceremony', date: 'Nov 20, 2025 at 9:00 AM', category: 'Academic', organizer: 'Registrar', attendees: 500, status: 'Active' },
    { title: 'Graduation Ceremony', date: 'Nov 20, 2025 at 9:00 AM', category: 'Academic', organizer: 'Registrar', attendees: 500, status: 'Active' },
    { title: 'Graduation Ceremony', date: 'Nov 20, 2025 at 9:00 AM', category: 'Academic', organizer: 'Registrar', attendees: 500, status: 'Active' },
    { title: 'Graduation Ceremony', date: 'Nov 20, 2025 at 9:00 AM', category: 'Academic', organizer: 'Registrar', attendees: 500, status: 'Active' },
];

const CategoryTag = ({ category }) => {
    const isAcademic = category === 'Academic';
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
            isAcademic 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-red-100 text-red-800'
        }`}>
            {category}
        </span>
    );
};

const StatusTag = ({ status }) => {
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
            status === 'Active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
        }`}>
            {status}
        </span>
    );
};

const EventRow = ({ event, isHighlighted }) => (
    <div className={`grid grid-cols-7 gap-4 items-center p-3 text-sm border-b last:border-b-0 ${isHighlighted ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
        <div className="col-span-1 font-semibold text-gray-800">{event.title}</div>
        <div className="col-span-1 text-gray-600 text-xs">{event.date}</div>
        <div className="col-span-1">
            <CategoryTag category={event.category} />
        </div>
        <div className="col-span-1 text-gray-600 text-xs">{event.organizer}</div>
        <div className="col-span-1 text-gray-600 text-center">{event.attendees}</div>
        <div className="col-span-1 text-center">
            <StatusTag status={event.status} />
        </div>
        <div className="col-span-1 flex justify-center space-x-2">
            <button className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50 transition" title="View">
                <Eye size={16} />
            </button>
            <button className="text-gray-500 hover:text-yellow-600 p-1 rounded-full hover:bg-yellow-50 transition" title="Edit">
                <Edit size={16} />
            </button>
            <button className="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition" title="Delete">
                <Trash2 size={16} />
            </button>
        </div>
    </div>
);

const EventManagementContent = () => {
    const navigate = useNavigate();

    const handleCreateEvent = () => {
        navigate('/admin/eventpage/eventsubmission');
    }

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            
            {/* Header and Create Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Event Management</h1>
                <button 
                    className="flex items-center space-x-2 bg-red-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-red-800 transition"
                    onClick={handleCreateEvent}
                >
                    <Plus size={20} />
                    <span>Create Event</span>
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex space-x-4 mb-8">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition"
                    />
                </div>
                <select className="px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-red-500 focus:border-red-500 transition">
                    <option>All Categories</option>
                    <option>Academic</option>
                    <option>Non-Academic</option>
                    <option>Sports</option>
                </select>
            </div>

            {/* Event Table Container */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                
                {/* Table Header */}
                <div className="grid grid-cols-7 gap-4 bg-red-700 text-white font-semibold text-sm p-4 sticky top-0">
                    <div className="col-span-1">Event Title</div>
                    <div className="col-span-1">Date & Time</div>
                    <div className="col-span-1">Category</div>
                    <div className="col-span-1">Organizer</div>
                    <div className="col-span-1 text-center">Attendees</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-center">Action</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {eventsData.map((event, index) => (
                        <EventRow 
                            key={index} 
                            event={event} 
                            isHighlighted={index % 2 === 0} // Highlight every other row to match the image style
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default EventManagementContent;