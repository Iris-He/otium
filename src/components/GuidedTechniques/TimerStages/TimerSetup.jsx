import React, { useState } from "react";
import Button from "../../common/Button";

export const TimerSetup = ({ onStart }) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      onStart(totalSeconds);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-serif text-gray-800">Set Your Timer</h3>
        <p className="text-sm text-gray-400">
          Choose how long you'd like to practice this technique
        </p>
      </div>

      <div className="flex justify-center gap-4 items-center">
        <div className="space-y-1">
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) =>
              setMinutes(Math.max(0, parseInt(e.target.value) || 0))
            }
            className="w-20 p-2 border border-gray-300 rounded-md text-center"
          />
          <p className="text-sm text-gray-500 text-center">Minutes</p>
        </div>

        <div className="space-y-1">
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) =>
              setSeconds(Math.max(0, parseInt(e.target.value) || 0))
            }
            className="w-20 p-2 border border-gray-300 rounded-md text-center"
          />
          <p className="text-sm text-gray-500 text-center">Seconds</p>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleStart} disabled={minutes === 0 && seconds === 0}>
          Start Timer
        </Button>
      </div>
    </div>
  );
};
