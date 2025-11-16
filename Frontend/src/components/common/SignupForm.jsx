import { UserRound, Mail, KeyRound, Phone, IdCard, BookOpen, GraduationCap, Building } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { FcGoogle } from "react-icons/fc";  
import axios from "axios";

export default function SignupForm({ onFlip }) {
  const [form, setForm] = useState({
    student_id: "",
    firstname: "",
    lastname: "",
    email: "",
    course: "",
    department: "",
    year_level: "",
    phone: "",
    password: "",
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
      {/* 2-column grid layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Student ID */}
        <div className="relative">
          <IdCard className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={form.student_id}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* First Name */}
        <div className="relative">
          <UserRound className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
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
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Email */}
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

        {/* Course */}
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Department */}
        <div className="relative">
          <Building className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Year Level */}
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 text-gray-500" size={20} />

          <input
            list="yearLevels"
            type="text"
            name="year_level"
            placeholder="Year Level"
            value={form.year_level}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />

          <datalist id="yearLevels">
            <option value="1st Year" />
            <option value="2nd Year" />
            <option value="3rd Year" />
            <option value="4th Year" />
            <option value="5th Year" />
            <option value="6th Year" />
          </datalist>
        </div>

        {/* Phone */}
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
          />
        </div>

        {/* Password (Full Width) */}
        <div className="col-span-2 relative">
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
      </div>

      {/* Submit Button */}
      <Button
        label="Sign Up"
        type="submit"
        className="w-full bg-[#C8102E] text-white py-2 rounded-lg font-semibold hover:bg-[#a00e25] transition"
      />

      {message && <p className="text-sm text-gray-700 text-center">{message}</p>}
    </form>
  );
}
