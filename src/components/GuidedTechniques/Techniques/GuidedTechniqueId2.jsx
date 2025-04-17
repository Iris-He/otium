import React, { useState } from "react";
import BaseTechnique from "../common/BaseTechnique";
import { useInputCollection } from "../../../hooks/useInputCollection";
import InputCollectionProgress from "../common/InputCollectionProgress";
import BackgroundWithLemons from "../../common/BackgroundWithLemons";

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
  currentStep,
  onNext,
  onReturnToSpinner,
  onFeedbackSubmit,
  showFeedback,
  setShowFeedback,
}) => {
  const [input, setInput] = useState("");

  const renderCustomProgress = ({
    inputs,
    handleInputChange: updateInputs,
    handleNext,
  }) => {
    const step = STEPS[currentStep];
    const currentItems = inputs[currentStep] || [];

    const handleSubmit = (e) => {
      e.preventDefault();
      if (input.trim()) {
        updateInputs(currentStep, [...currentItems, input.trim()]);
        setInput("");
      }
    };

    const isComplete = currentItems.length >= step.count;

    return (
      <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
        <InputCollectionProgress
          title={`Try to name ${step.count} ${step.prompt}`}
          description={step.instructions}
          items={currentItems}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onNext={onNext}
          placeholder={`${step.inputPrompt}...`}
          bubbleColorClasses="bg-blue-100 text-blue-800"
          buttonTheme="lime"
          isLastStep={currentStep === STEPS.length - 1}
          showNextButton={true}
        />
      </BackgroundWithLemons>
    );
  };

  return (
    <BaseTechnique
      technique={technique}
      steps={STEPS}
      currentStep={currentStep}
      onNext={onNext}
      onReturnToSpinner={onReturnToSpinner}
      onFeedbackSubmit={onFeedbackSubmit}
      renderCustomProgress={renderCustomProgress}
      showFeedback={showFeedback}
      setShowFeedback={setShowFeedback}
    />
  );
};

export default GuidedTechnique;
