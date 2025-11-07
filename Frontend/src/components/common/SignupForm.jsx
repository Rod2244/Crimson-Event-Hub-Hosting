import { UserRound, Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";

export default function SignupForm({ onFlip }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-4">
      <div className="relative">
        <UserRound className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
        />
      </div>

      <div className="relative">
        <KeyRound className="absolute left-3 top-3 text-gray-500" size={20} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
        />
      </div>

      <Button
        label="Sign Up"
        
        className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25] transition"
      />

      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full mt-2 border border-gray-300 bg-white py-2 rounded-lg shadow-sm hover:bg-gray-50 transition cursor-pointer"
      >
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium text-gray-700">
          Sign up with Google
        </span>
      </button>
    </form>
  );
}
