import { useEffect, useState } from "react";
import { Settings, Users, Calendar, Megaphone, CheckCircle, XCircle, Clock } from 'lucide-react';

import Sidebar from '../components/admin/Sidebar';
import HeaderStats from '../components/admin/HeaderStats';
import PendingApprovals from '../components/admin/PendingApprovals';
import RecentActivity from '../components/admin/RecentActivity';
import RecentSubmissions from '../components/admin/RecentSubmissions';
import QuickAction from '../components/common/QuickAction';
import { useUser } from '../context/UserContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    // STATE FOR LIVE DATA
    const [activeUsers, setActiveUsers] = useState(0);
    const [loading, setLoading] = useState(true);

    // FETCH ACTIVE USERS
    useEffect(() => {
        const fetchActiveUsers = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:5100/api/user/count-active",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setActiveUsers(res.data.activeUsers);
            } catch (err) {
                console.error("Error fetching active users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchActiveUsers();
    }, []);

    // HEADER CARDS DATA (DYNAMIC)
    const headerData = [
        { title: 'Event Created', value: 24, icon: Calendar, color: 'bg-blue-100/50 text-blue-800' },
        { title: 'Announcements', value: 5, icon: Megaphone, color: 'bg-pink-100/50 text-pink-800' },
        { title: 'Pending Reviews', value: 18, icon: CheckCircle, color: 'bg-green-100/50 text-green-800' },
        { title: 'Active Users', value: loading ? "..." : activeUsers, icon: Users, color: 'bg-red-100/50 text-red-800' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Hello {user ? `${user.firstname} ${user.lastname}` : "Admin Name"}!
                </h1>
                <p className="text-gray-500 mb-8">Here's what's happening with your events today.</p>

                {/* Header Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {headerData.map((data, index) => (
                        <div
                            key={index}
                            onClick={() => data.title === "Active Users" && navigate("/admin/userpage")}
                            className="cursor-pointer"
                        >
                            <HeaderStats {...data} />
                        </div>
                    ))}
                </div>

                {/* Pending Approvals and Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2">
                        <PendingApprovals />
                    </div>
                    <div className="lg:col-span-1">
                        <RecentActivity />
                    </div>
                </div>

                <RecentSubmissions />

                <div className="mt-6">
                    <QuickAction />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
