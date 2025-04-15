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
      <InputCollectionProgress
        title="Mental Categories Exercise"
        description={[
          "Choose a category (like animals, cities, or foods)",
          "List as many items as you can think of",
          "Continue until you feel more grounded",
        ]}
        items={currentItems}
        input={input}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onNext={handleNext}
        placeholder="Enter an item in your chosen category..."
        bubbleColorClasses="bg-purple-100 text-purple-800"
        buttonTheme="purple"
      />
    );
  };

  const renderCustomSummary = ({ resetForm }) => (
    <TechniqueSummary
      title="Mental Categories Complete!"
      description="Great job focusing your mind through categorization"
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
          prompt: "items in your category",
          summaryTitle: "Your category items",
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
