import { useState } from "react";

export const useGuidedTechniqueForm = (steps) => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const hasValidInputs = () => {
    const currentInput = inputs[currentStep];
    if (Array.isArray(currentInput)) {
      return currentInput.length > 0;
    }
    // Handle string input (like textarea)
    return currentInput && currentInput.trim().length > 0;
  };

  const resetForm = () => {
    setCurrentStep(0);
    const initialInputs = {};
    steps.forEach((_, index) => {
      initialInputs[index] = [];
    });
    setInputs(initialInputs);
    setIsComplete(false);
  };

  return {
    currentStep,
    inputs,
    isComplete,
    handleInputChange,
    handleNext,
    hasValidInputs,
    resetForm,
  };
};
