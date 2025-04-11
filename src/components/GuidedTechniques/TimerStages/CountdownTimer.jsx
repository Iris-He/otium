import React, { useState, useEffect } from "react";

export const CountdownTimer = ({ totalSeconds, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-serif text-gray-800">
        Focus on your meaningful object
      </h3>
      <div className="text-4xl font-bold text-gray-700">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <p className="text-sm text-gray-500">
        Notice its texture, weight, and personal significance
      </p>
    </div>
  );
};
