import React from "react";
import Button from "../../../common/Button";

const NextButton = ({ onNext, hasValidInputs, isLastStep }) => (
  <div className="flex justify-center mt-4">
    <Button
      onClick={onNext}
      disabled={!hasValidInputs}
      className={!hasValidInputs ? "opacity-50 cursor-not-allowed" : ""}
    >
      {isLastStep ? "Complete" : "Next"}
    </Button>
  </div>
);

export default NextButton;
