import React, { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useGuidedTechniqueForm } from "../../../hooks/useGuidedTechniqueForm";
import Button from "../../common/Button";
import TechniqueFeedback from "../common/TechniqueFeedback";

const BaseTechnique = ({
  technique,
  steps,
  onClose,
  onReturnToSpinner,
  renderCustomProgress,
  renderCustomSummary,
  onFeedbackSubmit,
  showFeedback,
  setShowFeedback,
}) => {
  const { user } = useAuthContext();
  const showFeedbackOption = user && !user.isGuest;

  const {
    currentStep,
    inputs,
    isComplete,
    handleInputChange,
    handleNext,
    hasValidInputs,
    resetForm,
  } = useGuidedTechniqueForm(steps);

  const handleFeedbackSubmit = (feedback) => {
    if (onFeedbackSubmit) {
      onFeedbackSubmit(feedback);
    }
    onReturnToSpinner();
  };

  const renderContent = () => {
    if (showFeedback) {
      return (
        <TechniqueFeedback
          onSubmit={handleFeedbackSubmit}
          onSkip={onReturnToSpinner}
          techniqueId={technique.id}
          technique={technique}
        />
      );
    }

    if (isComplete) {
      return (
        renderCustomSummary?.({
          resetForm,
          showFeedbackOption,
          onShowFeedback: () => setShowFeedback(true),
        }) || (
          <div className="text-center">
            <h3 className="text-xl font-serif mb-4">Exercise Complete!</h3>
            <div className="flex justify-center gap-4">
              <Button onClick={resetForm}>Start Over</Button>
              {showFeedbackOption && (
                <Button variant="lime" onClick={() => setShowFeedback(true)}>
                  Share Feedback
                </Button>
              )}
              <Button onClick={onReturnToSpinner} variant="secondary">
                Return to Spinner
              </Button>
            </div>
          </div>
        )
      );
    }

    if (renderCustomProgress) {
      return renderCustomProgress({
        inputs,
        handleInputChange,
        handleNext,
        currentStep,
        hasValidInputs,
      });
    }

    return (
      <Progress
        step={steps[currentStep]}
        currentStep={currentStep}
        totalSteps={steps.length}
        inputs={inputs[currentStep]}
        onInputChange={handleInputChange}
        onNext={handleNext}
        hasValidInputs={hasValidInputs}
      />
    );
  };

  return (
    <div
      className="relative flex flex-col rounded-lg p-3 sm:p-4 max-h-[90vh] overflow-hidden"
    >
      {/* Add max-width to prevent too wide content on large screens */}
      <div
        className="relative flex-1 overflow-y-auto max-w-2xl mx-auto w-full"
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default BaseTechnique;
