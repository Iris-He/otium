import React, { useState } from "react";
import BaseTechnique from "../common/BaseTechnique";
import { useInputCollection } from "../../../hooks/useInputCollection";
import InputCollectionProgress from "../common/InputCollectionProgress";
import TechniqueSummary from "../common/TechniqueSummary";

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
      <InputCollectionProgress
        title="Mindful Observation"
        description={[
          "Take a moment to observe your surroundings",
          "Notice the details without judgment",
          "Write down what you observe",
        ]}
        items={currentItems}
        input={input}
        onInputChange={handleInputChange}
        onSubmit={onSubmit}
        onNext={handleNext}
        placeholder="What do you notice around you?"
        bubbleColorClasses="bg-purple-100 text-purple-800"
        buttonTheme="lime"
      />
    );
  };

  const renderCustomSummary = ({ resetForm }) => (
    <TechniqueSummary
      title="Great job completing your mindful observation!"
      description="Remember that you can practice this technique anytime you need to ground yourself."
      onReset={resetForm}
      onReturnToSpinner={onReturnToSpinner}
      showFeedbackOption={true}
      onShowFeedback={() => setShowFeedback(true)}
    />
  );

  return (
    <BaseTechnique
      technique={technique}
      steps={[
        {
          count: 1,
          prompt: "reflection",
          summaryTitle: "Your reflection",
          inputType: "textarea",
          placeholder: "What do you notice around you?",
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
