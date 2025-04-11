import React from "react";

const BubbleDisplay = ({
  items = [],
  colorClasses = "bg-purple-100 text-purple-800",
  containerHeight = "h-48",
}) => {
  // Ensure items is an array and filter out any non-string/number values
  const safeItems = (Array.isArray(items) ? items : [])
    .filter((item) => item !== null && item !== undefined)
    .map((item) => String(item));

  return (
    <div className={`relative ${containerHeight} mb-4`}>
      {safeItems.map((item, index) => {
        const top = Math.random() * 70;
        const left = Math.random() * 70;

        return (
          <div
            key={index}
            className={`absolute inline-block px-3 py-1 ${colorClasses} rounded-full 
                     shadow-sm transform transition-all duration-300 hover:scale-110`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${index * 0.1}s`,
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default BubbleDisplay;
