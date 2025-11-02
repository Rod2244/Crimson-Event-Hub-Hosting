import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { Calendar, Clock, MapPin, Share2, Bookmark, ArrowRight } from "lucide-react";
import AboutEventCard from "../components/user/AbouteventCard";
import EventDetailsSection from "../components/user/EventdetailSection";
import AttachmentFile from "../components/organizer/AttachmentFile";
import OrganizerSection from "../components/organizer/OrganizerSection";
import ShareEvent from "../components/user/ShareEvent";
import RelatedEvents from "../components/common/RelatedEvents";

export default function EventDetails() {
  const { id } = useParams();

  const event = {
    title: "CCS Hackathon 2025: Code for Innovation",
    color: "bg-[#a22c36]",
    date: "November 20, 2025",
    time: "8:00 AM - 8:00 PM",
    location: "CCS Building, Computer Lab 2",
    category: "Academic",
    status: "Upcoming",
    audience: "CCS Students",
    deadline: "November 15, 2025",
    description:
      "Join us for the most exciting coding competition of the year! The CCS Hackathon 2025 brings together the brightest minds in computer science to solve real-world problems through innovative tech solutions.",
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 p-13">
        <section className="bg-gray-100 py-4 px-6 border-t border-[#d64553] ">
        <div className="bg-white w-full p-6 rounded-xl shadow-sm border border-gray-200 gap-3 pb-8 mb-8">
          <span className={`${event.color} text-white text-xs font-semibold px-3 py-1 rounded-md uppercase`}>
            {event.category}
          </span>

          <h1 className="text-3xl font-bold mt-3 text-gray-900">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-700">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md">
              <Calendar size={14} /> {event.date}
            </span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md">
              <Clock size={14} /> {event.time}
            </span>
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md">
              <MapPin size={14} /> {event.location}
            </span>
            <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full" /> {event.status}
            </span>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition">
              <ArrowRight size={16} /> Register Now
            </button>

            <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition">
              <Bookmark size={16} /> Save Event
            </button>

            <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
        <AboutEventCard />
        <div className="mt-8">
          <EventDetailsSection event={event} />
        </div>
        <div className="mt-8">
          <AttachmentFile/>
        </div>
        <div className="mt-8">
          <OrganizerSection />
        </div>
        <div className="mt-8">
          <ShareEvent />
        </div>
        <div className="mt-8">
          <RelatedEvents />
        </div>
        </section>
        
      </div>
    </div>
  );
}
