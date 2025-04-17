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
  currentStep,
  onNext,
  onReturnToSpinner,
  onFeedbackSubmit,
  showFeedback,
  setShowFeedback,
}) => {
  const {
    stage,
    totalSeconds,
    handleTimerStart,
    handleTimerComplete,
    resetTimer,
  } = useGuidedTimer();

  const [reflection, setReflection] = useState("");

  const handleReflectionComplete = () => {
    // Handle reflection completion
    // For example, you can save the reflection or perform any other action
    console.log("Reflection completed:", reflection);
    // Then proceed to the next step
    onNext();
  };

  const renderCustomProgress = () => {
    switch (stage) {
      case "setup":
        return (
          <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4 min-h-[calc(100vh-6rem)]">
            <div className="h-full flex flex-col justify-between">
              <div className="text-center space-y-4 sm:space-y-6 flex-grow flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl font-serif text-gray-800">
                  Mindful Object Observation
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                  Choose a small object that has personal significance for you,
                  hold it and focus on its texture, weight, and meaning. It
                  could be a photo, a gift, or any item that carries personal
                  significance.
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <TimerSetup onStart={handleTimerStart} />
              </div>
            </div>
          </BackgroundWithLemons>
        );

      case "countdown":
        return (
          <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4 min-h-[calc(100vh-6rem)]">
            <div className="h-full flex flex-col justify-center">
              <CountdownTimer
                totalSeconds={totalSeconds}
                onComplete={handleTimerComplete}
              />
            </div>
          </BackgroundWithLemons>
        );

      case "reflection":
        return (
          <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4 min-h-[calc(100vh-6rem)]">
            <div className="h-full flex flex-col justify-between">
              <div className="flex-grow">
                <ReflectionStage
                  inputs={[[reflection]]}
                  handleInputChange={(_, value) => setReflection(value)}
                  handleNext={handleReflectionComplete}
                />
              </div>
            </div>
          </BackgroundWithLemons>
        );

      default:
        return null;
    }
  };

  const renderCustomSummary = ({ resetForm }) => (
    <BackgroundWithLemons className="bg-white/95 backdrop-blur-md rounded-lg p-3 sm:p-4 min-h-[calc(100vh-6rem)]">
      <div className="h-full flex flex-col justify-center">
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
      </div>
    </BackgroundWithLemons>
  );

  return (
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
      currentStep={currentStep}
      onNext={onNext}
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
