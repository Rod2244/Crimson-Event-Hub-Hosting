import { UserRound, Mail, KeyRound, Phone, Building } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";

export default function SignupForm({ onFlip }) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    phone: "",
    password: "",
    role_id: "1", // default Student
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5100/api/auth/signup", form);
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Account Type Radio */}
      <div className="flex items-center gap-6 mb-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="role_id"
            value="1"
            checked={form.role_id === "1"}
            onChange={handleChange}
          />
          Student
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="role_id"
            value="2"
            checked={form.role_id === "2"}
            onChange={handleChange}
          />
          Organizer
        </label>
      </div>

      {/* Organizer approval note */}
      {form.role_id === "2" && (
        <p className="text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 p-2 rounded">
          Organizer accounts require admin approval — you’ll get an email when approved.
        </p>
      )}

      {/* Form inputs */}
      <div className="grid grid-cols-2 gap-4">

        {/* First Name */}
        <div className="relative">
          <UserRound className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Last Name */}
        <div className="relative">
          <UserRound className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Email */}
        <div className="relative col-span-2">
          <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Department / Organization */}
        <div className="relative col-span-2">
          <Building className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="department"
            placeholder={form.role_id === "1" ? "Department" : "Organization Name"}
            value={form.department}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Phone */}
        <div className="relative col-span-2">
          <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Password */}
        <div className="relative col-span-2">
          <KeyRound className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        label="Sign Up"
        type="submit"
        className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25] transition"
      />

      {message && <p className="text-sm text-gray-700 text-center">{message}</p>}
    </form>
  );
}
