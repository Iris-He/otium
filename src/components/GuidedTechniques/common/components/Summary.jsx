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
  <div className="flex flex-col h-full max-h-[80vh] space-y-4">
    <h3 className="text-lg sm:text-xl font-serif text-center text-gray-800 sticky top-0 bg-white py-2 z-10">
      Great job! Here's your summary:
    </h3>

    <div className="flex-1 overflow-y-auto pr-2">
      <SummarySteps steps={steps} inputs={inputs} />
    </div>

    <div className="sticky bottom-0 bg-white pt-3 space-y-3">
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
  </div>
);

export default Summary;
