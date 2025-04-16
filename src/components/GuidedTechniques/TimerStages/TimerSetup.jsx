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

  const handleNumberInput = (value, setter, max) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Convert to number and clamp between 0 and max
    const parsedValue = Math.min(Math.max(0, parseInt(numericValue) || 0), max);
    setter(parsedValue);
  };

  // Generate options for minutes (0-30) and seconds (0-59)
  const minuteOptions = Array.from({ length: 31 }, (_, i) => i);
  const secondOptions = Array.from({ length: 60 }, (_, i) => i);

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
          <div className="relative">
            <input
              type="number"
              min="0"
              max="30"
              value={minutes}
              onChange={(e) =>
                handleNumberInput(e.target.value, setMinutes, 30)
              }
              className="w-16 sm:w-20 p-2 border border-gray-300 rounded-md text-center appearance-none bg-white"
            />
            <select
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              aria-label="Select minutes"
            >
              {minuteOptions.map((value) => (
                <option key={`min-${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-500 text-center">Minutes</p>
        </div>

        <div className="space-y-1">
          <div className="relative">
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) =>
                handleNumberInput(e.target.value, setSeconds, 59)
              }
              className="w-16 sm:w-20 p-2 border border-gray-300 rounded-md text-center appearance-none bg-white"
            />
            <select
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              aria-label="Select seconds"
            >
              {secondOptions.map((value) => (
                <option key={`sec-${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
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
