import React from "react";
import Button from "../../common/Button";

export const ItemInput = ({
  input,
  onInputChange,
  onSubmit,
  placeholder,
  buttonTheme = "primary",
}) => {
  // Ensure input is a string
  const inputValue = input?.toString() || "";

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        placeholder={placeholder}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <Button type="submit" disabled={!inputValue.trim()} variant={buttonTheme}>
        Add
      </Button>
    </form>
  );
};
