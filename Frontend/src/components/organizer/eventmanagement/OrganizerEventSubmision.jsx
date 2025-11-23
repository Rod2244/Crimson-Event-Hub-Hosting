import { useState } from "react";
import { Send, UploadCloud, ArrowLeft, X, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Feedback component
const FeedbackMessage = ({ message, type, onClose }) => {
    if (!message) return null;

    const baseClasses = "fixed top-4 right-4 p-4 rounded-xl shadow-lg flex items-center gap-3 z-50 transition-transform transform";
    let styleClasses = "";
    let Icon = AlertTriangle;

    if (type === 'success') {
        styleClasses = "bg-green-100 text-green-800 border-l-4 border-green-500";
        Icon = CheckCircle;
    } else {
        styleClasses = "bg-red-100 text-red-800 border-l-4 border-red-500";
    }

    return (
        <div className={`${baseClasses} ${styleClasses} animate-slide-in-right`}>
            <Icon size={20} />
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
                <X size={16} />
            </button>
        </div>
    );
};

export default function OrganizerEventSubmissionForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        organizer: "",
        eventDate: "",
        eventTime: "",
        location: "",
        eventLink: "",
        targetAudience: "",
        number_of_registration: ""
    });

    const [showDropdown, setShowDropdown] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [feedbackType, setFeedbackType] = useState("error");
    const [isLoading, setIsLoading] = useState(false);

    const [attachmentFile, setAttachmentFile] = useState(null);
    const [eventImageFile, setEventImageFile] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);

    const audienceSuggestions = [
        "School-wide (All students and faculty)",
        "CCS Department",
        "CLA Department",
        "1st Year Students",
        "2nd Year Students",
        "3rd Year Students",
        "4th Year Students",
    ];

    const filteredSuggestions = audienceSuggestions.filter(item =>
        item.toLowerCase().includes(formData.targetAudience.toLowerCase())
    );

    const handleChange = (field, value) => setFormData({ ...formData, [field]: value });
    const handleFileChange = e => setAttachmentFile(e.target.files[0]);
    const handleImageChange = e => setEventImageFile(e.target.files[0]);
    const handleCloseFeedback = () => setFeedbackMessage(null);

    const handleSubmit = async () => {
        setFeedbackMessage(null);
        setIsLoading(true);

        // Validate required fields
        const requiredFields = ["title", "description", "category", "organizer", "eventDate", "eventTime", "location", "targetAudience"];
        for (let field of requiredFields) {
            if (!formData[field]?.trim()) {
                setFeedbackType("error");
                setFeedbackMessage(`Please fill in the required field: ${field.replace(/([A-Z])/g, " $1")}`);
                setIsLoading(false);
                return;
            }
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => value && data.append(key, value));
            if (attachmentFile) data.append("attachment", attachmentFile);
            if (eventImageFile) data.append("event_image", eventImageFile);

            const token = localStorage.getItem("token"); // make sure your user is logged in

            const res = await fetch("http://localhost:5100/api/events", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`  // include token for auth
                },
                body: data
            });

            const result = await res.json();

            if (res.ok) {
                setFeedbackType("success");
                setFeedbackMessage(`Event submitted successfully! Approval status: ${result.approval_status || 'pending'}. Redirecting...`);
                // reset form
                setFormData({
                    title: "", description: "", category: "", organizer: "",
                    eventDate: "", eventTime: "", location: "", eventLink: "",
                    targetAudience: "", number_of_registration: ""
                });
                setAttachmentFile(null);
                setEventImageFile(null);

                setTimeout(() => navigate("/organizer/eventmanagement"), 3000);
            } else {
                setFeedbackType("error");
                setFeedbackMessage(result.message || "An error occurred.");
            }
        } catch (err) {
            console.error(err);
            setFeedbackType("error");
            setFeedbackMessage("Failed to connect to the server.");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <>
            <style>
                {`
                    @keyframes slideInRight {
                        from { transform: translateX(100%); }
                        to { transform: translateX(0); }
                    }
                    .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
                `}
            </style>

            <FeedbackMessage message={feedbackMessage} type={feedbackType} onClose={handleCloseFeedback} />

            <div className="flex-1 bg-gray-50 min-h-screen overflow-y-auto p-4 sm:p-10 font-sans">
                <div className="max-w-6xl mx-auto">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/organizer/eventmanagement")}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 mb-6 transition font-medium text-sm"
                        disabled={isLoading}
                    >
                        <ArrowLeft size={18} /> Back to Event Management
                    </button>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-800">Submit New Event</h1>
                        <p className="text-gray-500 mt-1 text-base">
                            Provide the details below to submit a new event and optionally attach supporting files.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8">

                        {/* --- Basic Info --- */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: "Title *", field: "title", placeholder: "Event title" },
                                    { label: "Category *", field: "category", placeholder: "Workshop, Seminar, etc." },
                                    { label: "Organizer *", field: "organizer", placeholder: "Organizer name or department" },
                                    { label: "Location *", field: "location", placeholder: "Physical venue or virtual link" }
                                ].map(({ label, field, placeholder }) => (
                                    <div key={field}>
                                        <label className="text-sm font-semibold text-gray-600">{label}</label>
                                        <input
                                            type="text"
                                            value={formData[field]}
                                            onChange={(e) => handleChange(field, e.target.value)}
                                            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300"
                                            placeholder={placeholder}
                                            disabled={isLoading}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <label className="text-sm font-semibold text-gray-600">Description *</label>
                                <textarea
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300"
                                    placeholder="Describe the event..."
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* --- Timing & Access --- */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">Timing and Access</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Event Date *</label>
                                    <input
                                        type="date"
                                        value={formData.eventDate}
                                        onChange={(e) => handleChange("eventDate", e.target.value)}
                                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Event Time *</label>
                                    <input
                                        type="time"
                                        value={formData.eventTime}
                                        onChange={(e) => handleChange("eventTime", e.target.value)}
                                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300"
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Event Link (optional)</label>
                                    <input
                                        type="url"
                                        value={formData.eventLink}
                                        onChange={(e) => handleChange("eventLink", e.target.value)}
                                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300"
                                        placeholder="Zoom/Meet/Registration URL"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- Audience & Capacity --- */}
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">Audience and Capacity</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Target Audience *</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.targetAudience}
                                            onChange={(e) => handleChange("targetAudience", e.target.value)}
                                            className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300"
                                            placeholder="Type or select audience"
                                            onFocus={() => setShowDropdown(true)}
                                            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                                            disabled={isLoading}
                                        />
                                        {showDropdown && (
                                            <div className="absolute z-10 w-full bg-white border rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto">
                                                {filteredSuggestions.length > 0 ? filteredSuggestions.map((item, i) => (
                                                    <div key={i} className="px-4 py-2 cursor-pointer hover:bg-red-50"
                                                        onMouseDown={() => { handleChange("targetAudience", item); setShowDropdown(false); }}>
                                                        {item}
                                                    </div>
                                                )) : (
                                                    <div className="px-4 py-2 text-gray-500 italic">No matches</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-600">Max Registrations (optional)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.number_of_registration}
                                        onChange={(e) => handleChange("number_of_registration", e.target.value)}
                                        className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300"
                                        placeholder="e.g., 50"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- File Uploads --- */}
                        {[
                            { label: "Upload Event Image *", file: eventImageFile, handler: handleImageChange, required: true, accept: "image/*" },
                            { label: "Upload Attachment (optional)", file: attachmentFile, handler: handleFileChange, required: false, accept: "*/*" }
                        ].map(({ label, file, handler, accept }) => (
                            <div key={label}>
                                <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">{label}</h2>
                                <label className={`flex items-center gap-4 border-2 p-5 rounded-xl cursor-pointer transition ${file ? "border-green-500 bg-green-50" : "border-dashed border-gray-300 hover:border-red-500 hover:bg-gray-50"}`}>
                                    <UploadCloud size={24} className={file ? "text-green-600" : "text-gray-600"} />
                                    <div>
                                        <p className="text-base font-semibold text-gray-700">{file ? `Selected: ${file.name}` : `Click to select ${label.toLowerCase()}`}</p>
                                        <p className="text-sm text-gray-500">Max size 10MB. {accept === "image/*" ? "JPG, PNG" : "PDF, DOCX, JPG, PNG"}</p>
                                    </div>
                                    <input type="file" className="hidden" accept={accept} onChange={handler} disabled={isLoading} />
                                </label>
                                {file && (
                                    <button onClick={() => (file === eventImageFile ? setEventImageFile(null) : setAttachmentFile(null))}
                                        className="mt-2 text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                                        disabled={isLoading}>
                                        <X size={12} /> Remove
                                    </button>
                                )}
                                {file === eventImageFile && file && (
                                    <div className="mt-2 w-48 h-48 border border-gray-300 rounded-lg overflow-hidden cursor-pointer" onClick={() => setShowImageModal(true)}>
                                        <img src={URL.createObjectURL(file)} alt="Event Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* --- Submit Button --- */}
                        <div className="flex justify-end pt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`px-8 py-3 bg-red-600 text-white rounded-lg flex items-center gap-2 font-semibold shadow-lg transition ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-700"}`}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (<><Send size={18} /> Submit Event</>)}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- IMAGE MODAL --- */}
            {showImageModal && eventImageFile && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowImageModal(false)}>
                    <div className="relative max-w-3xl max-h-[90vh]">
                        <img src={URL.createObjectURL(eventImageFile)} alt="Full Event Preview" className="w-full h-auto rounded-lg object-contain" />
                        <button onClick={() => setShowImageModal(false)} className="absolute top-2 right-2 text-white hover:text-gray-200">
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
