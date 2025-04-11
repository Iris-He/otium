import React from "react";
import Button from "../../common/Button";

export const ReflectionStage = ({ inputs, handleInputChange, handleNext }) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h3 className="text-xl font-serif text-gray-800">
        Time's up! How do you feel?
      </h3>
      <p className="text-sm text-gray-400">
        Take a moment to write down your thoughts (optional)
      </p>
    </div>

    <textarea
      value={inputs[0]?.[0] || ""}
      onChange={(e) => handleInputChange(0, e.target.value)}
      placeholder="Share your experience..."
      className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    <div className="flex justify-center">
      <Button onClick={handleNext}>Complete</Button>
    </div>
  </div>
);
