import React from "react";
import Button from "../../common/Button";
import { ItemInput } from "./ItemInput";
import BubbleDisplay from "../../common/BubbleDisplay";

const InputCollectionProgress = ({
  title,
  description,
  items = [], // Ensure default value is an array
  input,
  onInputChange,
  onSubmit,
  onNext,
  placeholder,
  bubbleColorClasses,
  buttonTheme = "primary",
  showBubbles = true,
}) => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h3 className="text-xl font-serif text-gray-800">{title}</h3>
      <div className="text-sm text-gray-400">
        {Array.isArray(description) ? (
          description.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>

    <div className="space-y-4">
      {showBubbles && items && items.length > 0 && (
        <BubbleDisplay
          items={Array.isArray(items) ? items : []}
          colorClasses={bubbleColorClasses}
        />
      )}
      <ItemInput
        input={input}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        placeholder={placeholder}
        buttonTheme={buttonTheme}
      />
      {items && items.length > 0 && (
        <div className="flex justify-center">
          <Button onClick={onNext} variant={buttonTheme}>
            Complete
          </Button>
        </div>
      )}
    </div>
  </div>
);

export default InputCollectionProgress;
