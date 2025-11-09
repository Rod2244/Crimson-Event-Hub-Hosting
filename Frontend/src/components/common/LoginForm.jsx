import { Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm({ onFlip, setIsLoading }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5100/api/auth/login", form);
      localStorage.setItem("token", res.data.token);

      setMessage("Login successful! Redirecting to homepage...");

      setTimeout(() => {
        navigate("/homepage");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
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
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          required
        />
      </div>

      <Button
        type="submit"
        label="Login"
        className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25] transition"
      />

      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full mt-2 border border-gray-300 bg-white py-2 rounded-lg shadow-sm hover:bg-gray-50 transition cursor-pointer"
      >
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium text-gray-700">
          Login with Google
        </span>
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
