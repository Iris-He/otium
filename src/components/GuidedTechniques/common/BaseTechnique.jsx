import React, { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import Modal from "../../common/Modal";
import { useGuidedTechniqueForm } from "../../../hooks/useGuidedTechniqueForm";
import {
  InputFields,
  CompletionButtons,
  StepProgress,
} from "./TechniqueComponents";
import Button from "../../common/Button";
import TechniqueFeedback from "./TechniqueFeedback";

const BaseTechnique = ({
  technique,
  steps,
  onClose,
  onReturnToSpinner,
  renderCustomProgress,
  renderCustomSummary,
  onFeedbackSubmit,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { user } = useAuthContext();
  const showFeedbackOption = user && !user.isGuest;

  const handleFeedbackSubmit = (feedback) => {
    if (onFeedbackSubmit) {
      const enrichedFeedback = {
        ...feedback,
        techniqueId: technique.id,
        techniqueName: feedback.techniqueName || technique.title,
      };
      onFeedbackSubmit(enrichedFeedback);
    }

    setShowFeedback(false);
    onReturnToSpinner();
  };

  const handleFeedbackSkip = () => {
    setShowFeedback(false);
    onReturnToSpinner();
  };

  const {
    currentStep,
    inputs,
    isComplete,
    handleInputChange,
    handleNext,
    hasValidInputs,
    resetForm,
  } = useGuidedTechniqueForm(steps);

  const defaultRenderProgress = () => {
    const step = steps[currentStep];
    return (
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
  };

  const defaultRenderSummary = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Add console.log for debugging */}
      {console.log(
        "Rendering summary, showFeedbackOption:",
        showFeedbackOption
      )}
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
      <div className="mt-6">
        {user && !user.isGuest ? (
          <Button
            onClick={() => setShowFeedback(true)}
            variant="lime"
            className="w-full"
          >
            Continue
          </Button>
        ) : (
          <>
            <CompletionButtons
              onReset={resetForm}
              onReturnToSpinner={onReturnToSpinner}
            />
            <Button
              onClick={onReturnToSpinner}
              variant="lime"
              className="w-full"
            >
              Return to Spinner
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const renderSummaryContent = () => {
    const summaryProps = {
      resetForm,
      // Only pass onReturnToSpinner if user is guest or not logged in
      onReturnToSpinner: !showFeedbackOption ? onReturnToSpinner : undefined,
    };

    if (renderCustomSummary) {
      return renderCustomSummary(summaryProps);
    }
    return defaultRenderSummary(summaryProps);
  };

  return (
    <Modal onClose={onClose}>
      {isComplete ? (
        showFeedback ? (
          <TechniqueFeedback
            techniqueId={technique.id}
            technique={technique} // Pass the full technique object
            onSubmit={handleFeedbackSubmit}
            onSkip={handleFeedbackSkip}
          />
        ) : (
          <div>
            {renderSummaryContent()}
            <div className="mt-6">
              {showFeedbackOption && (
                <Button
                  onClick={() => setShowFeedback(true)}
                  variant="lime"
                  className="w-full"
                >
                  Continue to Feedback
                </Button>
              )}
            </div>
          </div>
        )
      ) : renderCustomProgress ? (
        renderCustomProgress({
          inputs,
          handleInputChange,
          handleNext,
          currentStep,
          hasValidInputs,
        })
      ) : (
        defaultRenderProgress()
      )}
    </Modal>
  );
};

export default BaseTechnique;
