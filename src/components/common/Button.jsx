import React from "react";

const VARIANTS = {
  primary: "bg-yellow-300 text-gray-600 hover:bg-yellow-300",
  secondary: "bg-gray-200 text-gray-600 hover:bg-gray-100",
  blue: "bg-blue-500 text-white hover:bg-blue-400",
  yellow: "bg-yellow-400 text-white hover:bg-yellow-300",
  green: "bg-green-500 text-white hover:bg-green-400",
  lime: "bg-lime-400 text-gray-600 hover:bg-lime-400",
  insights:
    "bg-lime-400 text-white hover:bg-lime-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200",
};

const Button = ({ variant = "primary", onClick, children, className = "" }) => {
  return (
    <button
      className={`
        px-4
        py-2
        rounded-md
        text-sm
        cursor-pointer
        transition-colors
        duration-200
        transform
        active:translate-y-px
        border-none
        ${VARIANTS[variant]}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
