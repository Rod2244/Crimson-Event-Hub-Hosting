// components/organizer/settings/OrganizerSettingsContent.jsx
import React, { useState, useEffect } from "react";
import { Trash2, Edit2, Camera } from "lucide-react";

const OrganizerSettingsContent = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // PROFILE STATE
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  // ARCHIVED STATE
  const [archivedData, setArchivedData] = useState([]);
  const [loadingArchived, setLoadingArchived] = useState(true);
  const [archivedError, setArchivedError] = useState("");
  const [archivedFilter, setArchivedFilter] = useState("all");
  const [deleting, setDeleting] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  /* ============================================
     FETCH PROFILE
  ============================================ */
  const fetchProfile = async () => {
    setLoadingProfile(true);
    setMessage("");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5100/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to fetch profile");
        return;
      }

      setProfile(data);

      setFormData({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        email: data.email || "",
        phone: data.phone || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setProfileImage(
        data.profile_image
          ? `http://localhost:5100${data.profile_image}`
          : null
      );
    } catch (err) {
      console.error(err);
      setMessage("Error loading profile");
    } finally {
      setLoadingProfile(false);
    }
  };

  /* ============================================
     FETCH ARCHIVED ITEMS
  ============================================ */
  const fetchArchived = async () => {
    try {
      setLoadingArchived(true);
      setArchivedError("");

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5100/api/archived/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Server error: " + res.status);

      const data = await res.json();
      setArchivedData(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      setArchivedError(err.message);
      setArchivedData([]);
    } finally {
      setLoadingArchived(false);
    }
  };

  const filteredArchived = archivedData.filter((item) =>
    archivedFilter === "all" ? true : item.type === archivedFilter
  );

  /* ============================================
     DELETE ARCHIVED ITEM
  ============================================ */
  const handleDelete = async (id, type) => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5100/api/archived/user/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, type }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Item deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        alert(data.message || "Failed to delete item");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
      setShowModal(false);
      setSelectedItem(null);
    }
  };

  /* ============================================
     INPUT HANDLERS
  ============================================ */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files[0]) setProfileImage(e.target.files[0]);
  };

  /* ============================================
     UPDATE PROFILE
  ============================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      const form = new FormData();

      form.append("firstname", formData.firstname);
      form.append("lastname", formData.lastname);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      if (formData.currentPassword) form.append("currentPassword", formData.currentPassword);
      if (formData.newPassword) form.append("newPassword", formData.newPassword);
      if (profileImage instanceof File) form.append("profileImage", profileImage);

      const res = await fetch("http://localhost:5100/api/user/profile", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Profile updated successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (err) {
      setMessage("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  /* ============================================
     EFFECTS
  ============================================ */
  useEffect(() => {
    if (activeTab === "profile") fetchProfile();
    if (activeTab === "archives") fetchArchived();
  }, [activeTab]);

  /* ============================================
     RENDER UI
  ============================================ */
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* TABS */}
      <aside className="flex md:flex-col gap-3 mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "profile"
              ? "bg-red-600 text-white"
              : "bg-white border text-gray-700"
          }`}
        >
          Edit Profile
        </button>

        <button
          onClick={() => setActiveTab("archives")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "archives"
              ? "bg-red-600 text-white"
              : "bg-white border text-gray-700"
          }`}
        >
          Completed Events
        </button>
      </aside>

      {/* CONTENT */}
      <div className="flex-1">
        {/* ---------------- PROFILE TAB ---------------- */}
        {activeTab === "profile" && profile && (
          <div className="flex justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Edit2 className="text-red-600" size={28} />
                <h2 className="text-2xl font-bold">Edit Organizer Profile</h2>
              </div>

              {message && <p className="text-red-500 mb-4">{message}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* --- PROFILE IMAGE --- */}
                <div className="relative flex justify-center mb-4">
                  {profileImage ? (
                    <img
                      src={
                        profileImage instanceof File
                          ? URL.createObjectURL(profileImage)
                          : profileImage || "/default-avatar.png"
                      }
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-2 border-red-700"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl border-2 border-red-700">
                      {formData.firstname?.[0] || "U"}
                    </div>
                  )}

                  <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border cursor-pointer hover:bg-gray-200">
                    <Camera className="text-red-600" size={18} />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>

                {/* --- NAME FIELDS --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div>
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>

                {/* --- EMAIL --- */}
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* --- PHONE --- */}
                <div>
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* --- PASSWORD FIELDS --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div>
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 flex justify-center items-center gap-2"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ---------------- ARCHIVES TAB ---------------- */}
        {activeTab === "archives" && (
          <div className="bg-white p-6 rounded-2xl shadow-md max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Archived Items</h2>

            {/* FILTER */}
            <div className="flex gap-4 mb-4">
              <select
                value={archivedFilter}
                onChange={(e) => setArchivedFilter(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="all">All</option>
                <option value="Event">Events</option>
                <option value="Announcement">Announcements</option>
              </select>
            </div>

            {/* TABLE */}
            {loadingArchived ? (
              <p>Loading...</p>
            ) : archivedError ? (
              <p className="text-red-500">{archivedError}</p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                {/* HEADER */}
                <div className="grid grid-cols-12 gap-2 bg-gray-100 p-3 font-semibold">
                  <div className="col-span-5">Title</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-2 text-center">Action</div>
                </div>

                {/* ROWS */}
                {filteredArchived.length > 0 ? (
                  filteredArchived.map((item, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 gap-2 p-3 border-t hover:bg-gray-50"
                    >
                      <div className="col-span-5">{item.title}</div>
                      <div className="col-span-2">{item.type}</div>
                      <div className="col-span-3">{item.date}</div>
                      <div className="col-span-2 text-center">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowModal(true);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-gray-500">
                    No archived items found.
                  </p>
                )}
              </div>
            )}

            {/* DELETE MODAL */}
            {showModal && selectedItem && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                <div className="bg-white p-5 rounded-lg shadow w-80">
                  <h3 className="text-lg font-semibold mb-3">
                    Confirm Deletion
                  </h3>
                  <p className="mb-4">
                    Delete <strong>{selectedItem.title}</strong>?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                      onClick={() => setShowModal(false)}
                      disabled={deleting}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex justify-center items-center gap-2"
                      onClick={() =>
                        handleDelete(selectedItem.id, selectedItem.type)
                      }
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerSettingsContent;
