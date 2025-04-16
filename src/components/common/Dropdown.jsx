import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const Dropdown = ({
  options,
  groupedOptions,
  onChange,
  placeholder = "Select an option",
  className = "",
  value = "",
}) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  // If groupedOptions is null or undefined, show loading state
  if (groupedOptions === null) {
    return (
      <div className={`relative ${className}`}>
        <LoadingSpinner message="Loading options..." />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={handleChange}
        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-sm appearance-none cursor-pointer ${
          value ? "text-gray-800" : "text-gray-400"
        }`}
      >
        <option value="" disabled className="text-gray-400">
          {placeholder}
        </option>

        {groupedOptions ? (
          <>
            {groupedOptions.favorites?.length > 0 && (
              <optgroup label="Favorites">
                {groupedOptions.favorites.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            )}
            {groupedOptions.all?.length > 0 && (
              <optgroup label="All Techniques">
                {groupedOptions.all.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            )}
          </>
        ) : (
          options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
