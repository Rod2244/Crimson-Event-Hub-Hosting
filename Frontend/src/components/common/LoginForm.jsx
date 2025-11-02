import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { Mail, KeyRound } from "lucide-react";
import { useState } from "react";



export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/homepage");
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
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

      <div className="text-right">
        <Link to="#" className="text-sm text-[#C8102E] hover:underline">
          Forgot Password?
        </Link>
      </div>

      <Link to="/homepage">
        <Button
            label ="Login"
            className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25] transition"
        >
        </Button>
      </Link>

      <p className="text-sm text-gray-600 mt-3">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#C8102E] font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
