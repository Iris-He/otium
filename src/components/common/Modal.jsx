import React from "react";
import { HiX } from "react-icons/hi";
import BackgroundWithLemons from "./BackgroundWithLemons";

const Modal = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
      style={{ height: "100%" }}
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl relative max-h-[85vh] overflow-y-auto">
        <BackgroundWithLemons className="rounded-lg shadow-xl">
          <div className="relative p-2 sm:p-4 z-50">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-50"
              aria-label="Close"
            >
              <HiX className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <div className="overflow-y-auto pt-2 pb-4">{children}</div>
        </BackgroundWithLemons>
      </div>
    </div>
  );
};

export default Modal;
