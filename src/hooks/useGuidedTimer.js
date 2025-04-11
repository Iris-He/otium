import { useState } from "react";

export const useGuidedTimer = () => {
  const [stage, setStage] = useState("setup");
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleTimerStart = (seconds) => {
    setTotalSeconds(seconds);
    setStage("countdown");
  };

  const handleTimerComplete = () => {
    setStage("reflection");
  };

  const resetTimer = () => {
    setStage("setup");
    setTotalSeconds(0);
  };

  return {
    stage,
    totalSeconds,
    handleTimerStart,
    handleTimerComplete,
    resetTimer,
    setStage,
  };
};
