import React from "react";
import Button from "../../common/Button";
import BubbleDisplay from "../../common/BubbleDisplay";

const InputCollectionProgress = ({
  title,
  description,
  items,
  input,
  onInputChange,
  onSubmit,
  onNext,
  placeholder,
  bubbleColorClasses,
  buttonTheme,
  isLastStep,
}) => {
  const descriptions = Array.isArray(description) ? description : [description];

  return (
    <div className="flex flex-col h-full">
      {/* Header section */}
      <div className="text-center space-y-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-serif text-gray-800">
          {title}
        </h2>
        <div className="space-y-2">
          {descriptions.map((desc, index) => (
            <p key={index} className="text-sm sm:text-base text-gray-500">
              {desc}
            </p>
          ))}
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[40vh] mb-4">
        <BubbleDisplay items={items} colorClasses={bubbleColorClasses} />
      </div>

      {/* Fixed bottom section with input and buttons */}
      <div className="mt-auto space-y-3">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Button type="submit" variant={buttonTheme || "lime"}>
            Add
          </Button>
        </form>

        {items.length > 0 && (
          <Button
            onClick={onNext}
            variant={buttonTheme || "primary"}
            className="w-full py-3"
          >
            {isLastStep ? "Complete" : "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InputCollectionProgress;
