import React, { useState } from "react";
import { Send, UploadCloud, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminEventSubmissionForm() {

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
        attachment: null
    });

    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = () => {
        const requiredFields = [
            "title",
            "description",
            "category",
            "organizer",
            "eventDate",
            "eventTime",
            "location",
            "targetAudience"
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].trim() === "") {
                alert(`Please fill in: ${field.replace(/([A-Z])/g, " $1")}`);
                return;
            }
        }

        console.log("Submitted:", formData);
        alert("Event submitted successfully!");
    };

    return (
        <div className="flex-1 bg-gray-100 min-h-screen overflow-y-auto p-10">
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate("/admin/eventpage")}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 mb-6 transition font-medium"
                >
                    <ArrowLeft size={20} />
                    Back to Event Management Page
                </button>

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Submit New Event</h1>
                    <p className="text-gray-500 mt-1">Provide the details below to submit a new event.</p>
                </div>

                {/* Form */}
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-8">

                    {/* Basic Information */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Title <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                    placeholder="Enter event title"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Category <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.category}
                                    onChange={(e) => handleChange("category", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                    placeholder="Event category"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Organizer <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.organizer}
                                    onChange={(e) => handleChange("organizer", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                    placeholder="Organizer name"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Location <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => handleChange("location", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                    placeholder="Venue or platform"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="text-sm font-medium text-gray-600">
                                Description <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                rows="4"
                                required
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                placeholder="Write a short event description"
                            ></textarea>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Event Details</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Event Date <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.eventDate}
                                    onChange={(e) => handleChange("eventDate", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">
                                    Event Time <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="time"
                                    required
                                    value={formData.eventTime}
                                    onChange={(e) => handleChange("eventTime", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-600">Event Link (optional)</label>
                                <input
                                    type="url"
                                    value={formData.eventLink}
                                    onChange={(e) => handleChange("eventLink", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                    placeholder="Zoom/Google Meet/Registration link"
                                />
                            </div>

                            {/* Optional Attendees */}
                            <div>
                                <label className="text-sm font-medium text-gray-600">Number of Registration (optional)</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.attendees || ""}
                                    onChange={(e) => handleChange("attendees", e.target.value)}
                                    className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                    placeholder="Maximum number of students"
                                />
                            </div>
                        </div>
                    </div>


                    {/* Target Audience */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Target Audience <span className="text-red-600">*</span>
                        </h2>

                        <div className="relative">
                            <input
                                type="text"
                                value={formData.targetAudience}
                                onChange={(e) => handleChange("targetAudience", e.target.value)}
                                placeholder="Type or select target audience"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 outline-none"
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() => {
                                    // Use setTimeout to allow click on dropdown before hiding
                                    setTimeout(() => setShowDropdown(false), 100);
                                }}
                            />

                            {/* Dropdown suggestions */}
                            {showDropdown && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-52 overflow-y-auto">
                                    {filteredSuggestions.length > 0 ? (
                                        filteredSuggestions.map((item, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    handleChange("targetAudience", item);
                                                    setShowDropdown(false);
                                                }}
                                            >
                                                {item}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2 text-gray-500">
                                            No matches — press Enter to use custom value
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>


                    {/* File Upload */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload Attachment (optional)</h2>

                        <label className="flex items-center gap-3 border border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                            <UploadCloud size={22} className="text-gray-600" />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Upload file</p>
                                <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG up to 10MB</p>
                            </div>
                            <input type="file" className="hidden" onChange={handleFileChange} />
                        </label>

                        {formData.attachment && (
                            <p className="text-sm text-green-600 mt-2">
                                File selected: {formData.attachment.name}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-6 border-t">
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 font-medium shadow-md"
                        >
                            <Send size={18} />
                            Submit Event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
