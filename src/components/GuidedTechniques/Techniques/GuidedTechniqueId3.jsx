import React from "react";
import BaseTechnique from "../common/BaseTechnique";
import { useInputCollection } from "../../../hooks/useInputCollection";
import InputCollectionProgress from "../common/InputCollectionProgress";
import TechniqueSummary from "../common/TechniqueSummary";
import BackgroundWithLemons from "../../common/BackgroundWithLemons";

const STEPS = [
  {
    count: 1, // Changed from 5 to 1
    prompt: "objects of the same color",
    inputPrompt: "Object",
    inputSuffix: " and any details",
    instructions: [
      "Look for objects of the same color, noticing their shade and texture",
      "Try to write down 5, but it's okay if you find fewer",
      "Add items one at a time",
      "Click Complete when you're done",
    ],
    summaryTitle: "Your color scan results",
  },
];

const GuidedTechnique = ({
  technique,
  currentStep,
  onNext,
  onReturnToSpinner,
  onFeedbackSubmit,
  showFeedback,
  setShowFeedback,
}) => {
  const {
    input,
    handleSubmit,
    handleInputChange: onInputChange,
  } = useInputCollection();

  const renderCustomProgress = ({ inputs, handleInputChange, handleNext }) => {
    const currentItems = inputs[0] || [];

    const onSubmit = (e) => {
      e.preventDefault();
      if (handleSubmit(e)) {
        handleInputChange(0, [...currentItems, input]);
      }
    };

    return (
      <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
        <InputCollectionProgress
          title="Color Scan Exercise"
          description={STEPS[0].instructions}
          items={currentItems}
          input={input}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onNext={handleNext}
          placeholder={`${STEPS[0].inputPrompt}${STEPS[0].inputSuffix}`}
          bubbleColorClasses="bg-yellow-100 text-yellow-800"
          buttonTheme="yellow"
          isLastStep={true} // Single step exercise
        />
      </BackgroundWithLemons>
    );
  };

  const renderCustomSummary = ({ resetForm }) => (
    <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
      <TechniqueSummary
        title="Great job completing the color scan!"
        description="This exercise helped you focus on the present moment through color observation."
        onReset={resetForm}
        onReturnToSpinner={onReturnToSpinner}
        showFeedbackOption={true}
        onShowFeedback={() => setShowFeedback(true)}
      />
    </BackgroundWithLemons>
  );

  return (
    <BaseTechnique
      technique={technique}
      steps={STEPS}
      currentStep={currentStep}
      onNext={onNext}
      onReturnToSpinner={onReturnToSpinner}
      onFeedbackSubmit={onFeedbackSubmit}
      renderCustomProgress={renderCustomProgress}
      renderCustomSummary={renderCustomSummary}
      showFeedback={showFeedback}
      setShowFeedback={setShowFeedback}
    />
  );
};

export default GuidedTechnique;
