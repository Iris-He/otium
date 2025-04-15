import React from "react";

const SummarySteps = ({ steps, inputs }) => (
  <>
    {steps.map((step, stepIndex) => {
      const stepInputs = Object.values(inputs[stepIndex] || {})
        .map((value) => (Array.isArray(value) ? value : [value]))
        .flat()
        .filter((value) =>
          typeof value === "string" ? value.trim() !== "" : value
        );

      if (stepInputs.length === 0) return null;

      return (
        <div key={stepIndex} className="text-gray-600 text-sm sm:text-base">
          {steps.length > 1 && (
            <h4 className="font-medium">{step.summaryTitle || step.prompt}:</h4>
          )}
          {stepInputs.map((item, i) => (
            <div key={i} className="mb-1">
              <span className="font-medium">Item {i + 1}:</span> {item}
            </div>
          ))}
        </div>
      );
    })}
  </>
);

export default SummarySteps;
