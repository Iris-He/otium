import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 right-0 z-10 flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-md shadow-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
