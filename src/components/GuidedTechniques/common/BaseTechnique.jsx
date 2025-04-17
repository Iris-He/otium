import React from "react";
import { useNavigate } from "react-router-dom";
import { useGuidedTechniqueForm } from "../../../hooks/useGuidedTechniqueForm";
import { useAuthContext } from "../../../contexts/AuthContext";
import Progress from "./components/Progress";
import TechniqueFeedback from "./TechniqueFeedback"; // Fix the import path
import Button from "../../common/Button";

const BaseTechnique = ({
  technique,
  steps,
  currentStep,
  onNext,
  onReturnToSpinner,
  renderCustomProgress,
  renderCustomSummary,
  onFeedbackSubmit,
  showFeedback,
  setShowFeedback,
}) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const showFeedbackOption = user && !user.isGuest;

  const { inputs, isComplete, handleInputChange, hasValidInputs, resetForm } =
    useGuidedTechniqueForm(steps, currentStep);

  const handleNext = () => {
    if (hasValidInputs()) {
      onNext();
    }
  };

  const handleFeedbackSubmit = (feedback) => {
    if (onFeedbackSubmit) {
      onFeedbackSubmit(feedback);
    }
  };

  const handleReset = () => {
    resetForm();
    navigate(`/techniques/${technique.id}`, { replace: true });
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
          resetForm: handleReset,
          showFeedbackOption,
          onShowFeedback: () => setShowFeedback(true),
        }) || (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-serif">Exercise Complete!</h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleReset}>Start Over</Button>
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

    return (
      renderCustomProgress?.({
        inputs,
        handleInputChange,
        handleNext,
        currentStep,
        hasValidInputs,
      }) || (
        <Progress
          step={steps[currentStep]}
          currentStep={currentStep}
          totalSteps={steps.length}
          inputs={inputs[currentStep]}
          onInputChange={handleInputChange}
          onNext={handleNext}
          hasValidInputs={hasValidInputs}
        />
      )
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default BaseTechnique;
