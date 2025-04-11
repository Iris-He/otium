import { useEffect, useRef } from "react";
import { createTickSound } from "../utils/soundEffects";

export const useTickSound = (isActive) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // Play initial tick
      createTickSound();

      // Set up interval for subsequent ticks
      intervalRef.current = setInterval(() => {
        createTickSound();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive]);

  const stopTicks = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return { stopTicks };
};
