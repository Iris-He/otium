import React from "react";

const VARIANTS = {
  primary: "bg-green-500 text-white hover:bg-green-400",
  secondary: "bg-gray-200 text-gray-600 hover:bg-gray-100",
  blue: "bg-blue-500 text-white hover:bg-blue-400",
};

const Button = ({ variant = "primary", onClick, children, className = "" }) => {
  return (
    <button
      className={`
        py-2 px-4 
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
