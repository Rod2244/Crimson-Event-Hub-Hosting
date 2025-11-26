import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const SettingContent = () => {
  const [archivedFilter, setArchivedFilter] = useState("all");
  const [archivedData, setArchivedData] = useState([]);
  const [loadingArchived, setLoadingArchived] = useState(true);
  const [archivedError, setArchivedError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchArchived = async () => {
    try {
      setLoadingArchived(true);
      setArchivedError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setArchivedError("You must be logged in.");
        return;
      }

      const res = await fetch("http://localhost:5100/api/archived", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Server error: " + res.status);

      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setArchivedData(data.items);
      } else {
        setArchivedData([]);
      }
    } catch (err) {
      setArchivedError(err.message);
      setArchivedData([]);
    } finally {
      setLoadingArchived(false);
    }
  };

  useEffect(() => {
    fetchArchived();
  }, []);

  const filteredArchived = archivedData.filter(item =>
    archivedFilter === "all" ? true : item.type === archivedFilter
  );

  // ---------------- Delete Function ----------------
  const handleDelete = async (id, type) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5100/api/archived/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, type }),
      });

      const data = await res.json();
      if (data.success) {
        fetchArchived();
      } else {
        alert(data.message || "Failed to delete item");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setShowModal(false);
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto h-[calc(100vh-2rem)] p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Pending Approvals</h1>

      {/* ---------------- ARCHIVED SECTION ---------------- */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Archived</h2>

        {/* Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 space-y-2 sm:space-y-0">
          <label className="text-gray-700 font-medium">Filter by type:</label>
          <select
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={archivedFilter}
            onChange={e => setArchivedFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Event">Events</option>
            <option value="Announcement">Announcements</option>
          </select>
        </div>

        {/* Loading / Error */}
        {loadingArchived && <p className="text-gray-500">Loading archived items...</p>}
        {archivedError && <p className="text-red-500">{archivedError}</p>}

        {/* Table */}
        {!loadingArchived && !archivedError && (
          <div className="overflow-x-auto">
            <div className="min-w-full rounded-lg border border-gray-200">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 bg-gray-100 p-3 rounded-t-lg">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-3">Date</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-200">
                {filteredArchived.length > 0 ? (
                  filteredArchived.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="grid grid-cols-12 gap-4 items-center p-3 hover:bg-gray-50 transition"
                    >
                      <div className="col-span-5 font-medium text-gray-800">{item.title}</div>
                      <div className="col-span-2 text-gray-600">{item.type}</div>
                      <div className="col-span-3 text-gray-600">{item.date}</div>
                      <div className="col-span-2 flex justify-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setShowModal(true);
                          }}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-gray-500 text-center col-span-12">
                    No archived items found.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ---------------- DELETE CONFIRMATION MODAL ---------------- */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedItem.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                onClick={() => {
                  setShowModal(false);
                  setSelectedItem(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleDelete(selectedItem.id, selectedItem.type)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingContent;
