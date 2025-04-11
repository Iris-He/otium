import { useState } from "react";

export const useInputCollection = (initialItems = []) => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(initialItems);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim()) {
      setItems((prev) => [...prev, input.trim()]);
      setInput("");
      return true;
    }
    return false;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return {
    input,
    items,
    handleSubmit,
    handleInputChange,
    setItems,
  };
};
