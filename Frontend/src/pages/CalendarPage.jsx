import React, { useState } from "react";

import HeaderControls from "../components/common/HeaderControls";
import CategoryFilters from "../components/common/CategoryFilters";
import MonthView from "../components/common/MonthView";
import  WeekView from "../components/common/WeekView";
import DayView from "../components/common/DayView";
import UpcomingEvents from "../components/common/UpcomingEvents";
import EventModal from "../components/common/EventModal";
import Navbar from "../components/common/Navbar";


export default function CalendarView () {
    const [viewMode, setViewMode] = useState('month');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date(2025, 10));

    const events = [
        { id: 1, title: 'Board Meeting', date: '2025-11-05', time: '2:00 PM', category: 'Academic', organizer: 'Dr. Hendrix Richard Ty', location: 'CTE Building, Social Hall', attendees: '45', description: 'A meeting led by department heads to discuss updates and plans for the department.', color: 'bg-blue-600' },
        { id: 2, title: 'Faculty Meeting', date: '2025-11-06', time: '3:30 PM', category: 'Academic', organizer: 'Academic Affairs', location: 'Conference Hall', attendees: '80', description: 'Discussion on curriculum updates.', color: 'bg-blue-600'},
        { id: 3, title: 'Sports Tournament', date: '2025-11-08', time: '9:00 AM', category: 'Non-Academic', organizer: 'Sports Council', location: 'Sports Complex', attendees: '120', description: 'Inter-department sports competition.', color: 'bg-red-600'},
        { id: 4, title: 'Club Fair', date: '2025-11-10', time: '1:00 PM', category: 'Non-Academic', organizer: 'Student Organization', location: 'Student Center', attendees: '200', description: 'Meet and join student clubs.', color: 'bg-red-600'},
        { id: 5, title: 'Carrer Fair 2025', date: '2025-11-12', time: '10:00 AM', category: 'Academic', organizer: 'Career Services', location: 'Main Gymnasium', attendees: '300', description: 'Networking with corporate partners.', color: 'bg-blue-600'},
        { id: 6, title: 'Graduation Ceremony', date: '2025-11-20', time: '9:00 AM', category: 'Academic', organizer: 'Registar', location: 'Grand Astoria', attendees: '500', description: 'Commencement exercises for graduates.', color: 'bg-blue-600'},
        { id: 7, title: 'Seminar: Digital Marketing', date: '2025-11-15', time: '2:00 PM', category: 'Academic', organizer: 'Accountacy Department', location: 'CTE Building, Social Hall', attendees: '150', description: 'Expert talk on digital marketing strategies.', color: 'bg-blue-600'},
    ];

    const categories = [
        { key: 'all', label: 'All Categories', color: 'bg-red-700'},
        { key: 'Academic', label: 'Academic', color: 'bg-blue-600'},
        { key: 'Organization', label: 'Organization', color: 'bg-yellow-600'},
        { key: 'Non-Academic', label: 'Non-Academic', color: 'bg-red-600'},
        { key: 'Council Events', label: 'Council Events', color: 'bg-green-600'}

    ];

    const filteredEvents = 
    selectedCategory === 'all'
    ? events
    : events.filter(event => event.category === selectedCategory);

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];


    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let i = 1; i <= getDaysInMonth(currentDate); i++) {
        days.push(i);
    }

    const getEventsForDay = (day) => {
        if (!day) return [];
        return filteredEvents.filter(e => {
            const eventDay = new Date(e.date).getDate();
            return eventDay === day;
        });
    };

    const getMonthYear = () => {
        return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-6xl mx-auto p-10">
                <HeaderControls 
                getMonthYear={getMonthYear}
                previousMonth={previousMonth}
                nextMonth={nextMonth}
                viewMode={viewMode}
                setViewMode={setViewMode}
                />

                <CategoryFilters 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                />

                {viewMode === "month" && (
                    <MonthView 
                    days={days}
                    getEventsForDay={getEventsForDay}
                    setSelectedEvent={setSelectedEvent}
                    />
                )}

                {viewMode === "week" && (
                    <WeekView 
                    filteredEvents={filteredEvents}
                    setSelectedEvent={setSelectedEvent}
                    />
                )}
                
                {viewMode === "day" && (
                    <DayView 
                    getEventsForDay={getEventsForDay}
                    setSelectedEvent={setSelectedEvent}
                    />
                )}

                <UpcomingEvents 
                filteredEvents={filteredEvents}
                setSelectedEvent={setSelectedEvent}
                />
            </div>

            <EventModal 
            selectedEvent={selectedEvent}
             setSelectedEvent={setSelectedEvent}
            />
        </div>
    )
}