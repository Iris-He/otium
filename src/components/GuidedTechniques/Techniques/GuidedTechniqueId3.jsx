import React, { useState } from "react";
import BaseTechnique from "../common/BaseTechnique";
import { useInputCollection } from "../../../hooks/useInputCollection";
import InputCollectionProgress from "../common/InputCollectionProgress";
import TechniqueSummary from "../common/TechniqueSummary";
import BackgroundWithLemons from "../../common/BackgroundWithLemons";

const STEPS = [
  {
    count: 5,
    prompt: "objects of the same color",
    inputPrompt: "Object",
    inputSuffix: " and any details",
    instructions: [
      "Write down 5 objects of the same color, noticing their shade and texture",
      "Add items one at a time",
      "Click Complete when you're done",
    ],
    summaryTitle: "Your color scan results",
  },
];

const GuidedTechnique = ({
  technique,
  onClose,
  onReturnToSpinner,
  onFeedbackSubmit,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { input, handleSubmit, handleInputChange } = useInputCollection();

  const renderCustomProgress = ({
    inputs,
    handleInputChange: updateInputs,
    handleNext,
  }) => {
    const currentItems = inputs[0] || [];

    const onSubmit = (e) => {
      e.preventDefault();
      if (handleSubmit(e)) {
        updateInputs(0, [...currentItems, input]);
      }
    };

    return (
      <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
        <InputCollectionProgress
          title="Color Scan Exercise"
          description={STEPS[0].instructions}
          items={currentItems}
          input={input}
          onInputChange={(e) => handleInputChange(e)}
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
    <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
      <BaseTechnique
        technique={technique}
        steps={STEPS}
        onClose={onClose}
        onReturnToSpinner={onReturnToSpinner}
        onFeedbackSubmit={onFeedbackSubmit}
        renderCustomProgress={renderCustomProgress}
        renderCustomSummary={renderCustomSummary}
        showFeedback={showFeedback}
        setShowFeedback={setShowFeedback}
      />
    </BackgroundWithLemons>
  );
};

export default GuidedTechnique;
