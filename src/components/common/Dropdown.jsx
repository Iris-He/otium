import React, { useState } from "react";

const Dropdown = ({
  options,
  onChange,
  placeholder = "Select an option",
  className = "",
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-400 text-sm appearance-none cursor-pointer"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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
