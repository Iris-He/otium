import React from "react";

const BackgroundWithLemons = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Semi-transparent backdrop with blurred lemons */}
      <div className="absolute inset-0 -z-10 bg-[url('/background.png')] bg-contain bg-center bg-repeat bg-fixed">
        <div className="absolute inset-0 bg-gray-100/30 backdrop-blur-sm" />
      </div>
      {children}
    </div>
  );
};

export default BackgroundWithLemons;
