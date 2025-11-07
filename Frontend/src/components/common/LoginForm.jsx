import { Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";

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

      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full mt-2 border border-gray-300 bg-white py-2 rounded-lg shadow-sm hover:bg-gray-50 transition cursor-pointer"
      >
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium text-gray-700">
          Login with Google
        </span>
      </button>
    </form>
  );
}
