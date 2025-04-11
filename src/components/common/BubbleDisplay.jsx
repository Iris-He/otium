import React, { useMemo } from "react";

const BubbleDisplay = ({
  items = [],
  colorClasses = "bg-purple-100 text-purple-800",
  containerHeight = "h-48",
}) => {
  // Ensure items is an array and filter out any non-string/number values
  const safeItems = (Array.isArray(items) ? items : [])
    .filter((item) => item !== null && item !== undefined)
    .map((item) => String(item));

  // Generate stable positions for each item based on its index
  // This will only recalculate when the items array length changes
  const positions = useMemo(() => {
    return safeItems.map(() => ({
      top: Math.random() * 70,
      left: Math.random() * 70,
    }));
  }, [safeItems.length]); // Only recalculate when the number of items changes

  return (
    <div className={`relative ${containerHeight} mb-4`}>
      {safeItems.map((item, index) => {
        return (
          <div
            key={index}
            className={`absolute inline-block px-3 py-1 ${colorClasses} rounded-full
                     shadow-sm transform transition-all duration-300 hover:scale-110`}
            style={{
              top: `${positions[index]?.top || 0}%`,
              left: `${positions[index]?.left || 0}%`,
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
