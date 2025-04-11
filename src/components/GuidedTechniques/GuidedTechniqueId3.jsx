import React from "react";
import BaseTechnique from "./common/BaseTechnique";
import { useInputCollection } from "../../hooks/useInputCollection";
import InputCollectionProgress from "./common/InputCollectionProgress";
import TechniqueSummary from "./common/TechniqueSummary";

const STEPS = [
  {
    count: 5,
    prompt: "objects of the same color",
    inputPrompt: "Object",
    inputSuffix: " and its unique qualities... (optional)",
    instructions: [
      "For each object, describe its shade and texture",
      "Add items one at a time",
      "Click Complete when you're done",
    ],
    summaryTitle: "Your color scan results",
  },
];

const GuidedTechnique = ({ technique, onClose, onReturnToSpinner }) => {
  if (technique.id !== 3) return null;

  const {
    input,
    handleSubmit,
    handleInputChange: onInputChange,
  } = useInputCollection();

  const renderCustomProgress = ({ inputs, handleInputChange, handleNext }) => {
    // Fix: Access the array directly from inputs[0]
    const currentItems = inputs[0] || [];

    const onSubmit = (e) => {
      e.preventDefault();
      if (handleSubmit(e)) {
        handleInputChange(0, [...currentItems, input]);
      }
    };

    return (
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
      />
    );
  };

  const renderCustomSummary = () => (
    <TechniqueSummary
      title="Color Scan Complete!"
      description="Focusing on colors and textures helps ground you in the present moment"
      onReset={() => onReturnToSpinner()}
      onReturnToSpinner={onReturnToSpinner}
    />
  );

  return (
    <BaseTechnique
      technique={technique}
      steps={STEPS}
      onClose={onClose}
      onReturnToSpinner={onReturnToSpinner}
      renderCustomProgress={renderCustomProgress}
      renderCustomSummary={renderCustomSummary}
    />
  );
};

export default GuidedTechnique;
