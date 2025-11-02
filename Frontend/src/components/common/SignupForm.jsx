import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { Mail, KeyRound, User } from "lucide-react";
import { useState } from "react";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/homepage");
  };

  return (
    <form className="space-y-4" onSubmit={handleSignup}>
      <div className="relative">
        <User className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
        />
      </div>

      <div className="relative">
        <KeyRound className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
        />
      </div>

      <Link to="/login">
        <Button
            label ="Sign up"
            className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25] transition"
        >
        </Button>
      </Link>

      <p className="text-sm text-gray-600 mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-[#C8102E] font-medium hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
