import React, { useState } from "react";
import BaseTechnique from "../common/BaseTechnique";
import { useGuidedTimer } from "../../../hooks/useGuidedTimer";
import { TimerSetup } from "../TimerStages/TimerSetup";
import { CountdownTimer } from "../TimerStages/CountdownTimer";
import { ReflectionStage } from "../TimerStages/ReflectionStage";
import TechniqueSummary from "../common/TechniqueSummary";
import BackgroundWithLemons from "../../common/BackgroundWithLemons";

const GuidedTechnique = ({
  technique,
  onClose,
  onReturnToSpinner,
  onFeedbackSubmit,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const {
    stage,
    totalSeconds,
    handleTimerStart,
    handleTimerComplete,
    resetTimer,
  } = useGuidedTimer();

  const renderCustomProgress = ({
    inputs,
    handleInputChange: updateInputs,
    handleNext,
  }) => {
    switch (stage) {
      case "setup":
        return (
          <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
            <div className="text-center space-y-2 sm:space-y-3 mb-4 sm:mb-5">
              <h3 className="text-lg sm:text-xl font-serif text-gray-800">
                Mindful Object Observation
              </h3>
              <p className="text-sm text-gray-500">
                Choose a small object that has personal significance for you,
                hold it and focus on its texture, weight, and meaning. It could
                be a photo, a gift, or any item that carries personal
                significance.
              </p>
            </div>
            <TimerSetup onStart={handleTimerStart} />
          </BackgroundWithLemons>
        );

      case "countdown":
        return (
          <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
            <CountdownTimer
              totalSeconds={totalSeconds}
              onComplete={handleTimerComplete}
            />
          </BackgroundWithLemons>
        );

      case "reflection":
        return (
          <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
            <ReflectionStage
              inputs={inputs}
              handleInputChange={updateInputs}
              handleNext={handleNext}
            />
          </BackgroundWithLemons>
        );

      default:
        return null;
    }
  };

  const renderCustomSummary = ({ resetForm }) => (
    <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
      <TechniqueSummary
        title="Great job with your mindful observation!"
        description="Remember that meaningful objects can help ground you in the present moment whenever you need support."
        onReset={() => {
          resetTimer();
          resetForm();
        }}
        onReturnToSpinner={onReturnToSpinner}
        showFeedbackOption={true}
        onShowFeedback={() => setShowFeedback(true)}
      />
    </BackgroundWithLemons>
  );

  return (
    <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4">
      <BaseTechnique
        technique={technique}
        steps={[
          {
            count: 1,
            prompt: "reflection",
            summaryTitle: "Your reflection",
            inputType: "textarea",
            placeholder:
              "How did this exercise make you feel? What did you notice about your chosen object?",
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
    </BackgroundWithLemons>
  );
};

export default GuidedTechnique;
