import React, { useState, useEffect, useRef } from "react";
import { useTickSound } from "../../../hooks/useTickSound";

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
  const [isActive, setIsActive] = useState(true);

  const switchPhase = (newPhase) => {
    setPhase(newPhase);
    return PHASES[newPhase].duration;
  };

  // Sound management
  const { playTick } = useTickSound();
  const lastTickRef = useRef(0);

  // Handle animation and sound
  useEffect(() => {
    if (currentCycle >= cycles) {
      setIsActive(false);
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 100;

        // Calculate elapsed time in current phase
        const phaseDuration = PHASES[phase].duration;
        const elapsed = phaseDuration - newTime;

        // Play tick every 1000ms relative to phase start
        if (elapsed - lastTickRef.current >= 1000) {
          playTick();
          lastTickRef.current = elapsed;
        }

        if (newTime <= 0) {
          lastTickRef.current = 0; // Reset tick counter for new phase
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
        return newTime;
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
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
    <div className="flex flex-col items-center justify-center h-auto py-6 sm:py-8 space-y-4 sm:space-y-6">
      <div className="text-l sm:text-xl text-gray-700">
        Cycle {currentCycle + 1} of {cycles}
      </div>
      <div className="relative flex flex-col items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
        <div
          className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full
              bg-gradient-to-br from-yellow-200 to-yellow-50
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)]
              transition-transform duration-100"
          style={{ transform: `scale(${getScale()})` }}
        />
        <div className="absolute text-3xl sm:text-4xl font-bold text-gray-600">
          {getDisplayNumber()}
        </div>
      </div>
      <div className="text-lg sm:text-xl font-medium text-gray-600">
        {PHASES[phase].text}
      </div>
    </div>
  );
};
