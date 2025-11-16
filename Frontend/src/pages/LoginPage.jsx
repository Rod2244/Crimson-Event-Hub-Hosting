import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthCard from "../components/common/AuthCard";
import LoginForm from "../components/common/LoginForm";
import SignupForm from "../components/common/SignupForm";
import LoadingSpinner from "../components/common/LoadingSpinner"; 

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFlipped, setIsFlipped] = useState(location.pathname === "/signup");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/signup") setIsFlipped(true);
    else setIsFlipped(false);
  }, [location.pathname]);

  
  const handleFlip = (path) => {
    setIsFlipped(path === "/signup");
    setTimeout(() => {
      navigate(path);
    }, 500); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C8102E] to-[#a00e25] relative overflow-hidden">
      {/* Full-screen loading spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-20"
        style={{ backgroundImage: "url('/bg-logo.png')" }}
      ></div>

      {/* Auth card container */}
      <div className="flex w-[950px] min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="w-1/2 relative perspective-1000">
          <div
            className={`absolute inset-0 transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* LOGIN SIDE */}
            <div className="absolute inset-0 backface-hidden flex items-center justify-center">
              <AuthCard title="Crimson Event Hub">
                <p className="text-gray-600 mb-5">Sign In to your Account</p>
                <LoginForm
                  onFlip={() => handleFlip("/signup")}
                  setIsLoading={setIsLoading}
                  onLoginSuccess={(role_id) => {
                    switch (role_id) {
                      case 1: // user
                        navigate("user");
                        break;
                      case 2: // Organizer
                        navigate("/organizer");
                        break;
                      case 3: // admin
                        navigate("/admin/dashboard"); // Change this to user dashboard when available
                        break;
                      default:
                        navigate("/login"); // fallback
                    }
                  }}
                />
              </AuthCard>
            </div>

            {/* SIGNUP SIDE */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center">
              <AuthCard title="Crimson Event Hub">
                <p className="text-gray-600 mb-5">Create your Account</p>
                <SignupForm onFlip={() => handleFlip("/login")} />
              </AuthCard>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="w-1/2 flex flex-col items-center justify-center text-white p-10 bg-[#C8102E]">
          {!isFlipped ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-6 text-center">
                Don’t have an account yet? Join us today!
              </p>
              <button
                onClick={() => handleFlip("/signup")}
                className="bg-white text-[#C8102E] font-semibold px-6 py-2 rounded-lg hover:bg-[#FFD3D3] transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-6 text-center">
                Already have an account? Log in to continue.
              </p>
              <button
                onClick={() => handleFlip("/login")}
                className="bg-white text-[#C8102E] font-semibold px-6 py-2 rounded-lg hover:bg-[#FFD3D3] transition"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
