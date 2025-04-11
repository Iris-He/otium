import React from "react";
import groundingTechniques from "../../data/groundingTechniques";

const Spinner = ({ onSpin, rotationDegree, spinning }) => {
  return (
    <div className="relative w-64 h-64 mb-8">
      {/* Wheel Background */}
      <div
        className="absolute w-full h-full rounded-full bg-gradient-to-br from-green-200 to-green-50 shadow-md"
        style={{
          transform: `rotate(${rotationDegree}deg)`,
          transition: spinning
            ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)"
            : "none",
        }}
      >
        {/* Wheel Segments */}
        {groundingTechniques.map((technique, index) => {
          const segmentAngle = 360 / groundingTechniques.length;
          const rotation = index * segmentAngle;

          return (
            <div
              key={technique.id}
              className="absolute w-2 h-2 rounded-full bg-green-800 opacity-60 top-1/2 left-1/2"
              style={{
                transform: `rotate(${rotation}deg) translate(120px, 0)`,
              }}
            />
          );
        })}
      </div>

      {/* Center Button */}
      <button
        className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-white border-none shadow-md flex items-center justify-center cursor-pointer transition-shadow font-serif text-gray-600 text-lg disabled:cursor-not-allowed disabled:opacity-70"
        onClick={onSpin}
        disabled={spinning}
      >
        <span>Spin</span>
      </button>

      {/* Indicator */}
      <div className="absolute top-0 left-1/2 -ml-2 w-4 h-8 bg-orange-500 rounded-b-full" />
    </div>
  );
};

export default Spinner;
