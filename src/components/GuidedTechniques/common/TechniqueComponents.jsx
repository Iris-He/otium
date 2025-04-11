import React from "react";
import Button from "../../common/Button";

export const InputFields = ({ step, inputs, onInputChange }) => {
  const currentInputs = inputs || {};
  return Array(step.count)
    .fill(0)
    .map((_, index) => (
      <input
        key={index}
        type="text"
        value={currentInputs[index] || ""}
        onChange={(e) => onInputChange(index, e.target.value)}
        placeholder={`${step.inputPrompt} ${index + 1}${
          step.inputSuffix || ""
        }`}
        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    ));
};

export const CompletionButtons = ({ onReset, onReturnToSpinner }) => (
  <div className="flex justify-center gap-4 mt-6 sticky bottom-0 bg-white py-4">
    <Button variant="secondary" onClick={onReturnToSpinner}>
      Return to Spinner
    </Button>
  </div>
);

export const StepProgress = ({ currentStep, totalSteps }) =>
  totalSteps > 1 && (
    <p className="text-gray-500">
      Step {currentStep + 1} of {totalSteps}
    </p>
  );
