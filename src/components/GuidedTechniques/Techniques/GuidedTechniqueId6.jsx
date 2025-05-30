import React, { useState } from "react";
import BaseTechnique from "../common/BaseTechnique";
import { useInputCollection } from "../../../hooks/useInputCollection";
import InputCollectionProgress from "../common/InputCollectionProgress";
import TechniqueSummary from "../common/TechniqueSummary";
import BackgroundWithLemons from "../../common/BackgroundWithLemons";

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
    const currentEmotions = inputs[0] || [];

    const onSubmit = (e) => {
      e.preventDefault();
      if (handleSubmit(e)) {
        updateInputs(0, [...currentEmotions, input]);
      }
    };

    return (
      <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
        <InputCollectionProgress
          title="Name Your Emotions"
          description={[
            "Take a moment to identify what you're feeling right now",
            "You can add multiple emotions - there's no right or wrong",
            "Click Complete when you're ready to move on",
          ]}
          items={currentEmotions}
          input={input}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
          onNext={handleNext}
          placeholder="Enter how you're feeling..."
          bubbleColorClasses="bg-purple-100 text-purple-800"
          buttonTheme="lime"
          isLastStep={true} // Single step exercise
        />
      </BackgroundWithLemons>
    );
  };

  const renderCustomSummary = ({ resetForm }) => (
    <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
      <TechniqueSummary
        title="Emotional Awareness Complete!"
        description="Great job identifying and acknowledging your emotions"
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
      steps={[
        {
          count: 1,
          prompt: "emotions you're feeling",
          summaryTitle: "Your emotional awareness check-in",
        },
      ]}
      onClose={onClose}
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
