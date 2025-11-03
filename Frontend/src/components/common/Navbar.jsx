import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Button from "./Button";
import {
  Search,
  Bell,
  LogOut,
  Contact,
  UserRound,
  Calendar,
  X,
} from "lucide-react";

export default function Navbar({ showSearchBar = false }) {
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false); // 👈 for mobile overlay
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    if (window.innerWidth < 768) {
      // If on mobile, open overlay search
      setShowMobileSearch(true);
    } else {
      navigate("/search");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    navigate("/search");
    setShowMobileSearch(false);
  };

  const handleProfile = () => navigate("/profile");
  const handleAboutus = () => navigate("/about");
  const handleLogout = () => navigate("/login");
  const handleNotification = () => navigate("/notificationpage");

  return (
    <>
      <header className="w-full bg-[#d64553] text-white py-2 px-4 sm:px-6 flex items-center justify-between shadow-md relative">
        <Link to="/homepage" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-base sm:text-lg">
            CEH<span className="hidden sm:inline"> - Crimson Events Hub</span>
          </span>
          <span className="text-[10px] sm:text-xs tracking-wide text-[#ffdada]">
            WMSU EVENT MANAGEMENT
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3 sm:gap-4 relative" ref={menuRef}>
        <Link
          to="/events"
          className="flex items-center gap-2 text-white bg-red-700 hover:bg-red-800 px-3 py-1 rounded-md font-medium transition"
        >
          <Calendar size={18} />
          <span className="hidden sm:inline">Events</span> {/* text hides, icon stays */}
        </Link>

        {showSearchBar ? (
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center bg-white rounded-full px-3 py-1 w-48 sm:w-64"
          >
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
            />
          </form>
        ) : (
          <Button
            onClick={handleSearchClick}
            className="bg-white text-[#d64553] p-2 rounded-full hover:bg-[#ffe6e9] transition"
          >
            <Search size={18} />
          </Button>
        )}

        <Button
          onClick={handleNotification}
          className="bg-white text-[#d64553] p-2 rounded-full hover:bg-[#ffe6e9] transition"
        >
          <Bell size={18} />
        </Button>

        <Button
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-semibold cursor-pointer hover:bg-gray-700 transition"
        >
          M
        </Button>

          {showMenu && (
            <div className="absolute right-0 top-12 bg-white text-gray-800 shadow-lg rounded-xl w-40 py-2 z-50">
              <p className="px-4 py-2 text-sm border-b">
                Logged in as <span className="font-semibold">Marie</span>
              </p>
              <Button
                onClick={handleProfile}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-100 transition"
              >
                <UserRound size={16} /> Profile
              </Button>
              <Button
                onClick={handleAboutus}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-100 transition"
              >
                <Contact size={16} /> About Us
              </Button>
              <Button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left hover:bg-gray-100 transition"
              >
                <LogOut size={16} /> Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {showMobileSearch && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-6 z-50">
          <div className="bg-white rounded-full flex items-center w-full max-w-md px-4 py-2 shadow-lg animate-slideDown">
            <Search size={18} className="text-gray-500 mr-2" />
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events..."
                className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-base"
              />
            </form>
            <button
              onClick={() => setShowMobileSearch(false)}
              className="ml-3 text-gray-600 hover:text-red-500"
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
