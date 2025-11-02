import { File, Download } from "lucide-react";

const AttachmentFile = () => {
  return (
    <div className="bg-white w-full p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Attachments and Resources
      </h2>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-100 rounded-md gap-4 transition">
          <div className="flex items-center flex-1 min-w-0">
            <div className="bg-red-600 p-2 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <File size={16} className="text-white" />
            </div>

            <div className="min-w-0">
              <p className="text-gray-800 font-medium truncate">
                Schedule and Agenda.pdf
              </p>
              <p className="text-gray-500 text-sm">180 KB</p>
            </div>
          </div>

          <button className="bg-red-500 hover:bg-red-600 rounded-full w-9 h-9 flex items-center justify-center mx-auto sm:mx-0 transition cursor-pointer">
            <Download size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttachmentFile;
