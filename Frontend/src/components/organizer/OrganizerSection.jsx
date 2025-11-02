const OrganizerSection = () => {
  return (
    <div className="bg-white w-full p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Organized By
      </h2>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-gray-100 rounded-lg text-center sm:text-left">
          <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto sm:mx-0 sm:mr-4 mb-3 sm:mb-0">
            <span className="text-white text-xl font-bold">C</span>
          </div>

          <div>
            <p className="text-gray-800 font-medium text-base">
              CCS Student Council
            </p>
            <p className="text-gray-500 text-sm">
              College of Computing Studies
            </p>
          </div>
        </div>

        <button className="w-full mt-4 py-3 text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition duration-150">
          Contact Organizer
        </button>
      </div>
    </div>
  );
};

export default OrganizerSection;
