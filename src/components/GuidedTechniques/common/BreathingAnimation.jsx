import React, { useState, useEffect, useRef } from "react";
import { createTickSound } from "../../../utils/soundEffects";

const PHASES = {
  INHALE: { duration: 4000, text: "Inhale" },
  HOLD: { duration: 7000, text: "Hold" },
  EXHALE: { duration: 8000, text: "Exhale" },
};

const CIRCLE_SCALES = {
  INHALE: { start: 0.6, end: 1.3 },
  HOLD: { start: 1.3, end: 1.3 },
  EXHALE: { start: 1.3, end: 0.6 },
};

export const BreathingAnimation = ({ cycles = 3, onComplete }) => {
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phase, setPhase] = useState("INHALE");
  const [timeLeft, setTimeLeft] = useState(PHASES.INHALE.duration);
  const lastSecondRef = useRef(Math.ceil(PHASES.INHALE.duration / 1000));

  const switchPhase = (newPhase) => {
    setPhase(newPhase);
    createTickSound(); // Play sound on phase change
    lastSecondRef.current = Math.ceil(PHASES[newPhase].duration / 1000);
    return PHASES[newPhase].duration;
  };

  useEffect(() => {
    if (currentCycle >= cycles) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const currentSecond = Math.ceil(prev / 1000);
        // Play sound when second changes
        if (currentSecond !== lastSecondRef.current && currentSecond > 0) {
          createTickSound();
          lastSecondRef.current = currentSecond;
        }

        if (prev <= 0) {
          switch (phase) {
            case "INHALE":
              return switchPhase("HOLD");
            case "HOLD":
              return switchPhase("EXHALE");
            case "EXHALE":
              setCurrentCycle((prev) => prev + 1);
              return switchPhase("INHALE");
            default:
              return 0;
          }
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [phase, currentCycle, cycles, onComplete]);

  const getScale = () => {
    const { start, end } = CIRCLE_SCALES[phase];
    const progress =
      (PHASES[phase].duration - timeLeft) / PHASES[phase].duration;
    return start + (end - start) * progress;
  };

  const getDisplayNumber = () => {
    const seconds = Math.ceil(timeLeft / 1000);
    return seconds > 0 ? seconds : "";
  };

  return (
    <div className="flex flex-col items-center justify-center h-[500px] space-y-8">
      <div className="text-2xl text-gray-700">
        Cycle {currentCycle + 1} of {cycles}
      </div>
      <div className="relative flex flex-col items-center justify-center w-64 h-64">
        <div
          className="w-48 h-48 rounded-full 
            bg-gradient-to-br from-green-200 to-green-50
            shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] 
            transition-transform duration-100"
          style={{ transform: `scale(${getScale()})` }}
        />
        <div className="absolute text-4xl font-bold text-gray-600">
          {getDisplayNumber()}
        </div>
      </div>
      <div className="text-xl font-medium text-gray-600">
        {PHASES[phase].text}
      </div>
    </div>
  );
};
