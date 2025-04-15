import React from "react";

const InputSection = ({ step, inputs, onInputChange }) => {
  if (step.inputType === "textarea") {
    return (
      <textarea
        value={inputs || ""}
        onChange={(e) => onInputChange(0, e.target.value)}
        placeholder={step.placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 min-h-[100px]"
      />
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {Array(step.count)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            value={(inputs && inputs[index]) || ""}
            onChange={(e) => onInputChange(index, e.target.value)}
            placeholder={`${step.inputPrompt} ${index + 1}${
              step.inputSuffix || ""
            }`}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        ))}
    </div>
  );
};

export default InputSection;
