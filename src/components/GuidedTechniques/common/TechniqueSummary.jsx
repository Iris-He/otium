import React from "react";
import Button from "../../common/Button";

const TechniqueSummary = ({
  title,
  description,
  onReset,
  showFeedbackOption,
  onShowFeedback,
}) => {
  const descriptions = Array.isArray(description) ? description : [description];

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <h2 className="text-2xl font-serif text-gray-800">{title}</h2>
      <div className="space-y-2">
        {descriptions.map((desc, index) => (
          <p key={index} className="text-gray-600">
            {desc}
          </p>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mt-4">
        {showFeedbackOption && (
          <Button
            onClick={onShowFeedback}
            variant="lime"
            className="w-full sm:w-auto px-8"
          >
            Share Feedback
          </Button>
        )}
        {onReset && (
          <Button
            onClick={onReset}
            variant="secondary"
            className="w-full sm:w-auto px-8"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default TechniqueSummary;
