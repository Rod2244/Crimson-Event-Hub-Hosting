// PendingApprovals.jsx

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const ApprovalItem = ({ title, department, date }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b last:border-b-0">
            <div>
                <p className="font-medium text-gray-700">{title}</p>
                <p className="text-sm text-gray-500">{department}</p>
                <p className="text-xs text-gray-400 mt-1">Oct 29, 2025</p>
            </div>
            <div className="flex space-x-3">
                <button className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition">
                    <XCircle size={20} />
                </button>
            </div>
        </div>
    );
};

const PendingApprovals = () => {
    const approvals = [
        { title: 'STD Awareness Drive', department: 'CN Department', date: 'Oct 30, 2025' },
        { title: 'Intramurals Registration', department: 'Sports Council', date: 'Oct 30, 2025' },
        { title: 'Career Fair 2025', department: 'Career Services', date: 'Oct 29, 2025' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Pending Approvals</h2>
                <a href="#" className="text-sm font-medium text-red-600 hover:text-red-700">
                    View All
                </a>
            </div>
            {approvals.map((item, index) => (
                <ApprovalItem key={index} {...item} />
            ))}
        </div>
    );
};

export default PendingApprovals;