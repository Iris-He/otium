import React from "react";
import { CompletionButtons } from "./TechniqueComponents";

const TechniqueSummary = ({
  title,
  description,
  onReset,
  onReturnToSpinner,
  children,
}) => (
  <div className="space-y-6">
    <div className="text-center space-y-4">
      <h3 className="text-xl font-serif text-gray-800">{title}</h3>
      {Array.isArray(description) ? (
        description.map((text, i) => (
          <p key={i} className="text-gray-600">
            {text}
          </p>
        ))
      ) : (
        <p className="text-gray-600">{description}</p>
      )}
    </div>
    {children}
    <CompletionButtons
      onReset={onReset}
      onReturnToSpinner={onReturnToSpinner}
    />
  </div>
);

export default TechniqueSummary;
