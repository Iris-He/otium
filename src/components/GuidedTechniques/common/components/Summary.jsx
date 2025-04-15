import React from "react";
import Button from "../../../common/Button";
import { CompletionButtons } from "../TechniqueComponents";
import SummarySteps from "./SummarySteps";

const Summary = ({
  steps,
  inputs,
  resetForm,
  onReturnToSpinner,
  showFeedbackOption,
  onShowFeedback,
}) => (
  <div className="space-y-4 sm:space-y-6">
    <div className="space-y-4 sm:space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
      <h3 className="text-lg sm:text-xl font-serif text-center text-gray-800 sticky top-0 bg-white py-2 sm:py-4 shadow-sm">
        Great job! Here's your summary:
      </h3>
      <SummarySteps steps={steps} inputs={inputs} />
    </div>

    <CompletionButtons
      onReset={resetForm}
      onReturnToSpinner={onReturnToSpinner}
    />

    {showFeedbackOption && (
      <Button onClick={onShowFeedback} variant="lime" className="w-full">
        Continue to Feedback
      </Button>
    )}
  </div>
);

export default Summary;
