import React from "react";
import BaseTechnique from "./common/BaseTechnique";
import { useInputCollection } from "../../hooks/useInputCollection";
import InputCollectionProgress from "./common/InputCollectionProgress";
import TechniqueSummary from "./common/TechniqueSummary";

const GuidedTechnique = ({ technique, onClose, onReturnToSpinner }) => {
  if (technique.id !== 6) return null;

  const {
    input,
    handleSubmit,
    handleInputChange: onInputChange,
  } = useInputCollection();

  const renderCustomProgress = ({ inputs, handleInputChange, handleNext }) => {
    // Fix: Access the array directly from inputs[0]
    const currentEmotions = inputs[0] || [];

    const onSubmit = (e) => {
      e.preventDefault();
      if (handleSubmit(e)) {
        handleInputChange(0, [...currentEmotions, input]);
      }
    };

    return (
      <InputCollectionProgress
        title="Name Your Emotions"
        description={[
          "Take a moment to identify what you're feeling right now",
          "You can add multiple emotions - there's no right or wrong",
          "Click Complete when you're ready to move on",
        ]}
        items={currentEmotions}
        input={input}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onNext={handleNext}
        placeholder="Enter how you're feeling..."
        bubbleColorClasses="bg-purple-100 text-purple-800"
        buttonTheme="purple"
      />
    );
  };

  const renderCustomSummary = () => (
    <TechniqueSummary
      title="Thank you for being honest with your emotions"
      description={[
        "Acknowledging our feelings without judgment is an important step in emotional awareness",
        "Remember you can return to this exercise whenever you need to check in with yourself",
      ]}
      onReset={() => onReturnToSpinner()}
      onReturnToSpinner={onReturnToSpinner}
    />
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
      renderCustomProgress={renderCustomProgress}
      renderCustomSummary={renderCustomSummary}
    />
  );
};

export default GuidedTechnique;
