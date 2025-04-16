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
    <div className="relative h-full flex flex-col rounded-lg p-6">
      <div className="relative flex-grow flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex-grow flex flex-col justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BaseTechnique;
