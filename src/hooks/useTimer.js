import { useState, useRef, useCallback } from "react";

export const useTimer = (duration = 57) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const startTime = useRef(null);

  const updateTimer = useCallback(
    (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsedTotal = timestamp - startTime.current;

      const newTimeLeft = Math.max(
        duration - Math.floor(elapsedTotal / 1000),
        0
      );
      if (newTimeLeft !== timeLeft) {
        setTimeLeft(newTimeLeft);
        if (newTimeLeft === 0) {
          setIsActive(false);
          return true; // Timer completed
        }
      }
      return false; // Timer still running
    },
    [timeLeft, duration]
  );

  const reset = useCallback(() => {
    setTimeLeft(duration);
    setIsActive(true);
    startTime.current = null;
  }, [duration]);

  return { timeLeft, isActive, updateTimer, reset };
};
