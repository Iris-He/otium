import { useCallback, useRef, useState } from "react";

export const useBreathingAnimation = (initialSize = 100) => {
  const [phase, setPhase] = useState("inhale");
  const [size, setSize] = useState(initialSize);
  const phaseStartTime = useRef(null);

  const animate = useCallback(
    (timestamp) => {
      if (!phaseStartTime.current) phaseStartTime.current = timestamp;
      const elapsedPhase = timestamp - phaseStartTime.current;

      // Phase durations in ms
      const inhaleDuration = 4000; // 4s
      const holdDuration = 7000; // 7s
      const exhaleDuration = 8000; // 8s

      // Calculate current phase and progress
      let progress;
      if (phase === "inhale") {
        progress = elapsedPhase / inhaleDuration;
        if (elapsedPhase >= inhaleDuration) {
          setPhase("hold");
          phaseStartTime.current = timestamp;
        }
        setSize(100 + 100 * progress); // Grows from 100 to 200
      } else if (phase === "hold") {
        progress = elapsedPhase / holdDuration;
        if (elapsedPhase >= holdDuration) {
          setPhase("exhale");
          phaseStartTime.current = timestamp;
        }
        setSize(200); // Maintain maximum size during hold
      } else if (phase === "exhale") {
        progress = elapsedPhase / exhaleDuration;
        if (elapsedPhase >= exhaleDuration) {
          setPhase("inhale");
          phaseStartTime.current = timestamp;
        }
        setSize(200 - 80 * progress); // Shrinks from 200 to 120 instead of 100
      }
    },
    [phase]
  );

  const reset = useCallback(() => {
    setPhase("inhale");
    setSize(initialSize);
    phaseStartTime.current = null;
  }, [initialSize]);

  return { phase, size, animate, reset };
};
