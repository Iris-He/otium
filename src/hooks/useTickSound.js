import { useEffect, useRef } from "react";
import { createTickSound } from "../utils/soundEffects";

export const useTickSound = (isActive) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Play initial tick
    createTickSound();

    // Set up interval for subsequent ticks - exactly 1000ms
    intervalRef.current = setInterval(() => {
      createTickSound();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive]);

  return {
    stopTicks: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
  };
};
