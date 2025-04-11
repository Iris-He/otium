import React from "react";
import BaseTechnique from "./common/BaseTechnique";
import { useInputCollection } from "../../hooks/useInputCollection";
import InputCollectionProgress from "./common/InputCollectionProgress";
import TechniqueSummary from "./common/TechniqueSummary";

const GuidedTechnique = ({ technique, onClose, onReturnToSpinner }) => {
  if (technique.id !== 4) return null;

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
        title="List Items in Your Category"
        description={[
          "Add items one at a time",
          "Click Complete when you're done",
        ]}
        items={currentItems}
        input={input}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onNext={handleNext}
        placeholder="Enter an item..."
        bubbleColorClasses="bg-green-100 text-green-800"
        buttonTheme="green"
      />
    );
  };

  const renderCustomSummary = () => (
    <TechniqueSummary
      title="Great job organizing your thoughts!"
      description="You can use this categorization technique anytime you need to bring order to your thoughts"
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
          prompt: "categories",
          summaryTitle: "Your categories",
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
