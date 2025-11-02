import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import { useState } from "react";
import { Camera } from "lucide-react";

export default function EditProfilePage() {
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "Elijah",
    lastName: "Montefalco",
    birthday: "2000-01-01",
    gender: "Male",
    email: "elijah.riley@wmsu.edu.ph",
    studentId: "2023-00123",
    department: "College of Computing Studies",
    yearLevel: "3rd Year",
    course: "BS Information Technology",
    phone: "+63 912 345 6789",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl border border-gray-200 p-10 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Profile
          </h2>

          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profileImage || "https://via.placeholder.com/150?text=Profile"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-sm"
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-red-700 hover:bg-red-800 text-white p-2 rounded-full cursor-pointer transition"
              >
                <Camera size={16} />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Click the camera icon to change your photo
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />

              <InputField type="date" label="Birthday" name="birthday" value={formData.birthday} onChange={handleChange} />

              <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />

              <InputField type="email" label="Email Address" name="email" value={formData.email} onChange={handleChange} />
              <InputField label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} />
              <InputField label="Department" name="department" value={formData.department} onChange={handleChange} />

              <SelectField label="Year Level" name="yearLevel" value={formData.yearLevel} onChange={handleChange}
                options={["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "6th Year"]}
              />

              <InputField label="Course" name="course" value={formData.course} onChange={handleChange} />
              <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div className="border-t mt-8 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Change Password
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  type="password"
                  label="Current Password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
                <InputField
                  type="password"
                  label="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                <InputField
                  type="password"
                  label="Confirm New Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <Button
                label="Cancel"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-md font-medium transition"
                onClick={() => window.history.back()}
              />
              <Button
                label="Save Changes"
                type="submit"
                className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-md font-medium transition"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-600 outline-none"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-600 outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
