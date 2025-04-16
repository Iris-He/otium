import React, { useState } from "react";
import BaseTechnique from "../common/BaseTechnique";
import { BreathingAnimation } from "../common/BreathingAnimation";
import TechniqueSummary from "../common/TechniqueSummary";
import BackgroundWithLemons from "../../common/BackgroundWithLemons";

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

const GuidedTechnique = ({
  technique,
  onClose,
  onReturnToSpinner,
  onFeedbackSubmit,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);

  if (technique.id !== 1) return null;

  const renderCustomProgress = ({ handleNext }) => (
    <BackgroundWithLemons className="space-y-3 sm:space-y-4">
      <div className="text-center space-y-1 sm:space-y-2">
        <h3 className="text-lg sm:text-xl font-serif text-gray-800">
          {BREATHING_EXERCISE.title}
        </h3>
        {BREATHING_EXERCISE.instructions.map((instruction, i) => (
          <p key={i} className="text-xs sm:text-sm text-gray-400">
            {instruction}
          </p>
        ))}
      </div>
      <BreathingAnimation
        cycles={BREATHING_EXERCISE.cycles}
        onComplete={handleNext}
        compact={true}
      />
    </BackgroundWithLemons>
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
      showFeedbackOption={true}
      onShowFeedback={() => setShowFeedback(true)}
    />
  );

  return (
    <BaseTechnique
      technique={technique}
      steps={[BREATHING_EXERCISE]}
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
