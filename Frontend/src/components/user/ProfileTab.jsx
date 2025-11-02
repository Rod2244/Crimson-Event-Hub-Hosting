export default function ProfileTab() {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Personal Information
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
          <input
            type="text"
            value="Elijah Riley"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
          <input
            type="text"
            value="Montefalco"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Birthday</label>
          <input
            type="text"
            value="January 1, 2000"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
          <input
            type="text"
            value="Male"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
          <input
            type="email"
            value="elijah.riley@wmsu.edu.ph"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Student ID</label>
          <input
            type="text"
            value="2023-00123"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
          <input
            type="text"
            value="College of Computing Studies"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Year Level</label>
          <input
            type="text"
            value="3rd Year"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Course</label>
          <input
            type="text"
            value="BS Information Technology"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
          <input
            type="text"
            value="+63 912 345 6789"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white focus:ring-2 focus:ring-red-600 focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
}
