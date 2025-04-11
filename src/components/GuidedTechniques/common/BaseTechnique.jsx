import React from "react";
import Modal from "../../common/Modal";
import { useGuidedTechniqueForm } from "../../../hooks/useGuidedTechniqueForm";
import {
  InputFields,
  CompletionButtons,
  StepProgress,
} from "./TechniqueComponents";
import Button from "../../common/Button";

const BaseTechnique = ({
  technique,
  steps,
  onClose,
  onReturnToSpinner,
  renderCustomProgress,
  renderCustomSummary,
}) => {
  const {
    currentStep,
    inputs,
    isComplete,
    handleInputChange,
    handleNext,
    hasValidInputs,
    resetForm,
  } = useGuidedTechniqueForm(steps);

  const step = steps[currentStep];

  const defaultRenderProgress = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg sm:text-xl font-serif text-gray-800">
          {step.title || `Name ${step.count} ${step.prompt}`}
        </h3>
        <StepProgress currentStep={currentStep} totalSteps={steps.length} />
        <div className="space-y-1">
          {step.instructions?.map((instruction, i) => (
            <p key={i} className="text-xs sm:text-sm text-gray-400">
              {instruction}
            </p>
          ))}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <InputFields
          step={step}
          inputs={inputs[currentStep]}
          onInputChange={handleInputChange}
        />
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleNext}
          disabled={!hasValidInputs()}
          className={!hasValidInputs() ? "opacity-50 cursor-not-allowed" : ""}
        >
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );

  const defaultRenderSummary = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-4 sm:space-y-6 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
        <h3 className="text-lg sm:text-xl font-serif text-center text-gray-800 sticky top-0 bg-white py-2 sm:py-4 shadow-sm">
          Great job! Here's your summary:
        </h3>
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
                <h4 className="font-medium">
                  {step.summaryTitle || step.prompt}:
                </h4>
              )}
              {stepInputs.map((item, i) => (
                <div key={i} className="mb-1">
                  <span className="font-medium">Item {i + 1}:</span> {item}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <CompletionButtons
        onReset={resetForm}
        onReturnToSpinner={onReturnToSpinner}
      />
    </div>
  );

  return (
    <Modal onClose={onClose}>
      {isComplete
        ? (renderCustomSummary || defaultRenderSummary)({ resetForm })
        : renderCustomProgress
        ? renderCustomProgress({
            inputs,
            handleInputChange,
            handleNext,
            currentStep,
            hasValidInputs,
          })
        : defaultRenderProgress()}
    </Modal>
  );
};

export default BaseTechnique;
