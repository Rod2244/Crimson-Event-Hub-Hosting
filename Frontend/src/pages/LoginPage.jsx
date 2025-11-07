import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthCard from "../components/common/AuthCard";
import LoginForm from "../components/common/LoginForm";
import SignupForm from "../components/common/SignupForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isFlipped, setIsFlipped] = useState(location.pathname === "/signup");

  useEffect(() => {
    if (location.pathname === "/signup") setIsFlipped(true);
    else setIsFlipped(false);
  }, [location.pathname]);

  // Smoothly flip first, then navigate
  const handleFlip = (path) => {
    setIsFlipped(path === "/signup"); // trigger animation
    setTimeout(() => {
      navigate(path); // navigate after flip animation
    }, 500); // match your CSS transition duration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C8102E] to-[#a00e25] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-20"
        style={{ backgroundImage: "url('/bg-logo.png')" }}
      ></div>

      <div className="flex w-[900px] h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="w-1/2 relative perspective-1000">
          <div
            className={`absolute inset-0 transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            <div className="absolute inset-0 backface-hidden flex items-center justify-center">
              <AuthCard title="Crimson Event Hub">
                <p className="text-gray-600 mb-5">Login to your Account</p>
                <LoginForm onFlip={() => handleFlip("/signup")} />
              </AuthCard>
            </div>

            <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center">
              <AuthCard title="Crimson Event Hub">
                <p className="text-gray-600 mb-5">Create your Account</p>
                <SignupForm onFlip={() => handleFlip("/login")} />
              </AuthCard>
            </div>
          </div>
        </div>

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
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
