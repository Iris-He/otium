import { useEffect, useRef, useCallback } from "react";
import { useBreathingAnimation } from "./useBreathingAnimation";
import { useTimer } from "./useTimer";
import { useTickSound } from "./useTickSound";

export const useBreathingExercise = (duration = 57, initialSize = 100) => {
  const {
    phase,
    size,
    animate: animateBreathing,
    reset: resetAnimation,
  } = useBreathingAnimation(initialSize);

  const {
    timeLeft,
    isActive,
    updateTimer,
    reset: resetTimer,
  } = useTimer(duration);

  const { stopTicks } = useTickSound(isActive);
  const animationRef = useRef(null);

  const animateFrame = useCallback(
    (timestamp) => {
      const timerCompleted = updateTimer(timestamp);
      if (timerCompleted) {
        stopTicks();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      animateBreathing(timestamp);
      animationRef.current = requestAnimationFrame(animateFrame);
    },
    [updateTimer, animateBreathing, stopTicks]
  );

  useEffect(() => {
    if (isActive) {
      animationRef.current = requestAnimationFrame(animateFrame);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateFrame, isActive]);

  const reset = useCallback(() => {
    resetAnimation();
    resetTimer();
  }, [resetAnimation, resetTimer]);

  return {
    phase,
    size,
    timeLeft,
    isActive,
    reset,
  };
};
