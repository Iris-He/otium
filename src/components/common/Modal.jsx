import React from "react";
import { HiX } from "react-icons/hi";
import BackgroundWithLemons from "./BackgroundWithLemons";

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <BackgroundWithLemons className="rounded-lg shadow-xl">
          <div className="relative p-4">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto pt-6">{children}</div>
        </BackgroundWithLemons>
      </div>
    </div>
  );
};

export default Modal;
