import React from "react";
import { CompletionButtons } from "./TechniqueComponents";

const TechniqueSummary = ({
  title,
  description,
  onReset,
  onReturnToSpinner,
  children,
}) => (
  <div className="space-y-4 sm:space-y-6">
    <div className="text-center space-y-2 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-serif text-gray-800">{title}</h3>
      <div className="text-sm sm:text-base">
        {Array.isArray(description) ? (
          description.map((text, i) => (
            <p key={i} className="text-gray-600 mb-2">
              {text}
            </p>
          ))
        ) : (
          <p className="text-gray-600">{description}</p>
        )}
      </div>
    </div>
    {children}
    <CompletionButtons
      onReset={onReset}
      onReturnToSpinner={onReturnToSpinner}
    />
  </div>
);

export default TechniqueSummary;
