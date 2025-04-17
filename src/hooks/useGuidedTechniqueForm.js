import { useState } from "react";

export const useGuidedTechniqueForm = (steps, currentStep = 0) => {
  const [inputs, setInputs] = useState(() => {
    // Initialize with empty arrays for each step
    const initialInputs = {};
    steps.forEach((_, index) => {
      initialInputs[index] = [];
    });
    return initialInputs;
  });

  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (stepIndex, value) => {
    setInputs((prev) => ({
      ...prev,
      [stepIndex]: value,
    }));
  };

  const hasValidInputs = () => {
    const currentInputs = inputs[currentStep] || [];
    const currentStepConfig = steps[currentStep];

    if (!currentStepConfig) return false;

    if (currentStepConfig.count) {
      return currentInputs.length >= currentStepConfig.count;
    }

    return currentInputs.length > 0;
  };

  const resetForm = () => {
    setInputs(() => {
      const initialInputs = {};
      steps.forEach((_, index) => {
        initialInputs[index] = [];
      });
      return initialInputs;
    });
    setIsComplete(false);
  };

  return {
    inputs,
    isComplete,
    handleInputChange,
    hasValidInputs,
    resetForm,
  };
};
