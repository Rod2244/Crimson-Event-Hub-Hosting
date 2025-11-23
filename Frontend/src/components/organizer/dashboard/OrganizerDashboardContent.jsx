import React from 'react';
import StatCard from './StatCard';
import ApprovalItem from './ApprovalItem';
import ActivityItem from './ActivityItem';
import { stats, pendingApprovals, recentActivity } from './dashboardData';

const DashboardContent = () => (
  <main className="p-6 md:p-10 bg-gray-50 min-h-screen">
    <div className="mb-8">
      <h2 className="text-3xl font-extrabold text-gray-900">Organizer Dashboard</h2>
      <p className="text-gray-500 mt-1">Here's what's happening with your events today.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Pending Approvals</h3>
          <button className="text-red-600 font-semibold text-sm hover:text-red-800 transition duration-150">
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {pendingApprovals.map((item, index) => (
            <ApprovalItem key={index} {...item} />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
          <button className="text-red-600 font-semibold text-sm hover:text-red-800 transition duration-150">
            View All
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.map((item, index) => (
            <ActivityItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  </main>
);

export default DashboardContent;
