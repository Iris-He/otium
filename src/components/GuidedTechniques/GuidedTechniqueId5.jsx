import React from "react";
import BaseTechnique from "./common/BaseTechnique";
import { TimerSetup } from "./TimerStages/TimerSetup";
import { CountdownTimer } from "./TimerStages/CountdownTimer";
import { ReflectionStage } from "./TimerStages/ReflectionStage";
import { useGuidedTimer } from "../../hooks/useGuidedTimer";
import TechniqueSummary from "./common/TechniqueSummary";

const GuidedTechnique = ({
  technique,
  onClose,
  onReturnToSpinner,
  onFeedbackSubmit,
}) => {
  const {
    stage,
    totalSeconds,
    handleTimerStart,
    handleTimerComplete,
    resetTimer,
    setStage,
  } = useGuidedTimer();

  if (technique.id !== 5) return null;

  const renderCustomProgress = ({ inputs, handleInputChange, handleNext }) => {
    if (stage === "setup") {
      return <TimerSetup onStart={handleTimerStart} />;
    }

    if (stage === "countdown") {
      return (
        <CountdownTimer
          totalSeconds={totalSeconds}
          onComplete={handleTimerComplete}
        />
      );
    }

    return (
      <ReflectionStage
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleNext={handleNext}
      />
    );
  };

  const renderCustomSummary = () => (
    <TechniqueSummary
      title="Great job completing your mindful observation!"
      description="Remember that you can practice this technique anytime you need to ground yourself."
      onReset={() => {
        resetTimer();
        onReturnToSpinner();
      }}
      onReturnToSpinner={onReturnToSpinner}
    />
  );

  return (
    <BaseTechnique
      technique={technique}
      steps={[
        {
          count: 1,
          prompt: "reflection",
          summaryTitle: "Your reflection",
        },
      ]}
      onClose={onClose}
      onReturnToSpinner={onReturnToSpinner}
      onFeedbackSubmit={onFeedbackSubmit}
      renderCustomProgress={renderCustomProgress}
      renderCustomSummary={renderCustomSummary}
    />
  );
};

export default GuidedTechnique;
