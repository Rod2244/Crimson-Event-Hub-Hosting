import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronRight, X } from 'lucide-react';

const Header = ({ user, toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef();

  const handleProfileClick = () => setIsProfileOpen(!isProfileOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-red-700 shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button className="lg:hidden p-2 mr-4 text-red-700" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      <div className="relative flex items-center space-x-4" ref={profileRef}>
        <div 
          className="flex items-center space-x-3 bg-gray-50 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition duration-150"
          onClick={handleProfileClick}
        >
          <div className="relative">
            <img
              src="https://placehold.co/40x40/c23434/ffffff/png?text=A"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-red-700"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <ChevronRight size={18} className="text-gray-500 hidden sm:block" />
        </div>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-80 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Profile</h2>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <img
                src="https://placehold.co/80x80/c23434/ffffff/png?text=A"
                alt="User Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-red-700"
              />
              <div className="text-center">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-gray-500">{user.email || "admin@example.com"}</p>
                <p className="text-gray-500">{user.contact || "+63 912 345 6789"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
