import React, { useState } from "react";
import BaseTechnique from "../common/BaseTechnique";
import { useInputCollection } from "../../../hooks/useInputCollection";
import InputCollectionProgress from "../common/InputCollectionProgress";
import TechniqueSummary from "../common/TechniqueSummary";

const STEPS = [
  {
    count: 5,
    prompt: "things you can see",
    inputPrompt: "I can see",
    instructions: ["Look around and identify things you can see"],
  },
  {
    count: 4,
    prompt: "things you can touch",
    inputPrompt: "I can touch",
    instructions: [
      "Reach out and touch objects around you",
      "Describe their texture or temperature",
      "Add items one at a time",
    ],
    summaryTitle: "Things you touched",
  },
  {
    count: 3,
    prompt: "things you can hear",
    inputPrompt: "I can hear",
    instructions: [
      "Focus on the sounds in your environment",
      "List both loud and quiet sounds",
      "Add items one at a time",
    ],
    summaryTitle: "Things you heard",
  },
  {
    count: 2,
    prompt: "things you can smell",
    inputPrompt: "I can smell",
    instructions: [
      "Take a deep breath through your nose",
      "Notice any scents in the air",
      "Add items one at a time",
    ],
    summaryTitle: "Things you smelled",
  },
  {
    count: 1,
    prompt: "thing you can taste",
    inputPrompt: "I can taste",
    instructions: [
      "Focus on any tastes in your mouth",
      "Or describe the last thing you ate/drank",
      "Add items one at a time",
    ],
    summaryTitle: "Thing you tasted",
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
    currentStep,
  }) => {
    const step = STEPS[currentStep];
    const currentItems = inputs[currentStep] || [];

    const onSubmit = (e) => {
      e.preventDefault();
      if (handleSubmit(e)) {
        updateInputs(currentStep, [...currentItems, input]);
      }
    };

    return (
      <InputCollectionProgress
        title={`Try to name ${step.count} ${step.prompt}`}
        description={step.instructions}
        items={currentItems}
        input={input}
        onInputChange={handleInputChange}
        onSubmit={onSubmit}
        onNext={handleNext}
        placeholder={`${step.inputPrompt}...`}
        bubbleColorClasses="bg-blue-100 text-blue-800"
        buttonTheme="lime"
      />
    );
  };

  const renderCustomSummary = ({ resetForm }) => (
    <TechniqueSummary
      title="Great job completing the 5-4-3-2-1 exercise!"
      description="Using your senses to ground yourself can help bring you back to the present moment."
      onReset={resetForm}
      onReturnToSpinner={onReturnToSpinner}
      showFeedbackOption={true}
      onShowFeedback={() => setShowFeedback(true)}
    />
  );

  return (
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
  );
};

export default GuidedTechnique;
