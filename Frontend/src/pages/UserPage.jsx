import Navbar from "../components/common/Navbar";
import { UserPen } from "lucide-react";
import Button from "../components/common/Button";
import ProfileTab from "../components/user/ProfileTab";
import RegisteredTab from "../components/user/RegisteredTab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto mt-10 pb-10">
          
          <div className="flex justify-between items-center bg-white border border-gray-300 rounded-lg shadow-sm px-8 py-6">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-blue-900">M</span>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Montefalco, Elijah Riley V.
                </h2>
                <p className="text-sm text-gray-600">elijah.riley@wmsu.edu.ph</p>
                <p className="text-sm text-gray-700 mt-1">
                  2023-00123 • 3rd Year • BS Information Technology
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Member since August 15, 2021
                </p>
              </div>
            </div>

            <Button 
              onClick={() => navigate("/profile/editProfile")}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md font-medium transition">
              <UserPen size={16} /> Edit Profile
            </Button>
          </div>

          <div className="flex justify-evenly items-center bg-white border border-gray-200 rounded-xl shadow-md px-8 py-6 mt-8">
            <Button
              label="Profile Information"
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "info"
                  ? "bg-red-700 text-white shadow-md scale-105"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
              }`}
            />

            <Button
              label="Registered Events"
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "settings"
                  ? "bg-red-700 text-white shadow-md scale-105"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
              }`}
            /> 
          </div>

          <div className="mt-8">
            {activeTab === "info" && <ProfileTab />}
            {activeTab === "settings" && <RegisteredTab />}
          </div>
        </div>
      </main>
    </div>
  );
}
