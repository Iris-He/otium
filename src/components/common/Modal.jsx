import React from "react";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 z-10 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto pt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
