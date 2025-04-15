import React from "react";
import Button from "../../../common/Button";
import InputSection from "./InputSection";

const Progress = ({
  step,
  currentStep,
  totalSteps,
  inputs,
  onInputChange,
  onNext,
  hasValidInputs,
}) => {
  const handleInputChange = (index, value) => {
    onInputChange(currentStep, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-serif text-gray-800">{step.title}</h3>
        <div className="text-sm text-gray-400">
          {step.instructions.map((instruction, i) => (
            <p key={i}>{instruction}</p>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <InputSection
          step={step}
          inputs={inputs}
          onInputChange={handleInputChange}
        />

        <div className="flex justify-center">
          <Button
            onClick={onNext}
            disabled={!hasValidInputs()}
            className="px-8"
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Progress;
