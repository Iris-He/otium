import React from "react";
import BaseTechnique from "./common/BaseTechnique";
import { BreathingAnimation } from "./common/BreathingAnimation";
import TechniqueSummary from "./common/TechniqueSummary";

const BREATHING_EXERCISE = {
  count: 1,
  prompt: "breathing exercise",
  title: "4-7-8 Breathing Exercise",
  instructions: [
    "Find a comfortable position",
    "Inhale for 4 seconds, hold for 7, exhale for 8",
    "Stop immediately if you feel dizzy or lightheaded",
  ],
  cycles: 3,
  summaryTitle: "Breathing Exercise Complete",
};

const GuidedTechnique = ({ technique, onClose, onReturnToSpinner }) => {
  if (technique.id !== 1) return null;

  const renderCustomProgress = ({ handleNext }) => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-serif text-gray-800">
          {BREATHING_EXERCISE.title}
        </h3>
        {BREATHING_EXERCISE.instructions.map((instruction, i) => (
          <p key={i} className="text-sm text-gray-400">
            {instruction}
          </p>
        ))}
      </div>
      <BreathingAnimation
        cycles={BREATHING_EXERCISE.cycles}
        onComplete={handleNext}
      />
    </div>
  );

  const renderCustomSummary = ({ resetForm }) => (
    <TechniqueSummary
      title="Great job completing the breathing exercise!"
      description={[
        `You completed ${BREATHING_EXERCISE.cycles} cycles of 4-7-8 breathing.`,
        "Remember, you can practice this technique anytime you need to calm down.",
      ]}
      onReset={resetForm}
      onReturnToSpinner={onReturnToSpinner}
    />
  );

  return (
    <BaseTechnique
      technique={technique}
      steps={[BREATHING_EXERCISE]}
      onClose={onClose}
      onReturnToSpinner={onReturnToSpinner}
      renderCustomProgress={renderCustomProgress}
      renderCustomSummary={renderCustomSummary}
    />
  );
};

export default GuidedTechnique;
