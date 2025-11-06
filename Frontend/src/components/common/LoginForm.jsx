import { Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import googleIcon from "../../assets/google.png"; // add Google icon

export default function LoginForm({ onFlip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="space-y-4">
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

      <Button
        label="Login"
        className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25] transition"
      />

      <div className="flex items-center justify-center gap-2 mt-2">
        <img src={googleIcon} alt="Google" className="w-5 h-5" />
        <span className="text-sm text-gray-600 cursor-pointer hover:underline">
          Login with Google
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-3">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onFlip}
          className="text-[#C8102E] font-medium hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
