import { Mail, KeyRound } from "lucide-react";
import { useState, useEffect } from "react"; // 💡 Import useEffect
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm({ onFlip, setIsLoading, onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // =========================================================
  // 🔥 GOOGLE LOGIN HANDLER (Callback function)
  // =========================================================
  const handleGoogleResponse = async (response) => {
    try {
      // NOTE: We don't need setIsLoading here because the prompt/button handles the initial UI block
      const { credential } = response; // Google's ID Token

      // Make sure this matches your backend's port and path!
      const res = await axios.post(
        "http://localhost:5100/auth/google/signup",
        { credential }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role_id", user.role_id);

      setMessage("Google login successful! Redirecting...");

      // 💡 Check role IDs and adjust navigation paths as necessary
      if (user.role_id === 3) { 
        navigate("/admin/dashboard");
      } else if (user.role_id === 1 || user.role_id === 2) {
        navigate("/homepage");
      }
    } catch (err) {
      console.error("Google Login Error:", err.response?.data?.message || err);
      // Display the specific error message from the backend (401, 409, 500)
      setMessage(err.response?.data?.message || "Google login failed.");
    }
  };

  // =========================================================
  // 🚀 INITIALIZE AND RENDER GOOGLE BUTTON (Runs once on mount)
  // =========================================================
  useEffect(() => {
    /* global google */
    if (window.google) {
      // 1. Initialize the Google Identity Service
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        // auto_select: true, // You can comment this out if you only want the button, but it enables one-tap
      });

      // 2. Render the Standard Button (The Reliable Fallback)
      // This button will replace the contents of the element with ID 'googleSignInButton'
      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"), 
        { 
            theme: "outline", 
            size: "large", 
            type: "standard", // Use standard type for the look and feel
            width: "360" // Set width to fill container, adjust as needed
        }
      );

      // 3. Display the One-Tap Prompt (Optional: Removed the prompt call 
      // from the onClick handler and place it here to run once.)
      // google.accounts.id.prompt(); 

    } else {
        // Fallback for when the GIS script hasn't loaded
        console.warn("Google Identity Services script not yet loaded.");
    }
  }, []); // Empty dependency array ensures it runs only once

  // =========================================================
  // NORMAL LOGIN (Keep this logic)
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (Your handleSubmit logic remains the same) ...
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5100/api/auth/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role_id", user.role_id);

      setMessage("Login successful! Redirecting...");

      if (user.role_id === 3) {
        navigate("/admin/dashboard");
      } else if (user.role_id === 1) {
        navigate("/homepage");
      } else if (user.role_id === 2) {
        navigate("/organizer/dashboard")
      }
    } catch (err) {
      if (!err.response) {
        setMessage("Server unreachable. Check backend.");
      } else {
        setMessage(err.response.data?.msg || "Login failed. Check credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      {/* ... (EMAIL & PASSWORD INPUTS remain the same) ... */}
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300"
          required
        />
      </div>

      <div className="relative">
        <KeyRound className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300"
          required
        />
      </div>

      {/* 💡 GOOGLE LOGIN BUTTON CONTAINER */}
      {/* This element is now empty. The GIS library will automatically inject the button here when the component mounts. */}
      <div id="googleSignInButton" className="flex justify-center w-full mt-2">
        {/* The Google button will be rendered inside this div */}
      </div>

      {/* NORMAL LOGIN BUTTON */}
      <Button
        type="submit"
        label="Sign In"
        className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25]"
      />

      {message && <p className="text-sm text-center text-red-600">{message}</p>}
    </form>
  );
}