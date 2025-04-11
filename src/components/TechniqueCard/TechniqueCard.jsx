import React, { useState, lazy, Suspense } from "react";
import Button from "../common/Button";

// Lazy load all guided technique components
const guidedTechniqueComponents = {};
for (let i = 1; i <= 10; i++) {
  guidedTechniqueComponents[i] = lazy(() =>
    import(`../GuidedTechniques/GuidedTechniqueId${i}.jsx`)
  );
}

const TechniqueCard = ({
  technique,
  onNewTechnique,
  onReturnToSpinner,
  visible,
}) => {
  const [showGuided, setShowGuided] = useState(false);

  if (!technique) return null;

  const GuidedTechnique = guidedTechniqueComponents[technique.id];
  const hasGuidedComponent = !!GuidedTechnique;

  return (
    <>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between z-10 transition-all duration-400 ease-in-out
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <h2 className="font-serif text-2xl text-gray-800 text-center mb-4">
          {technique.title}
        </h2>
        <p className="text-gray-600 text-center mb-6 flex-grow flex items-center justify-center px-4">
          {technique.description}
        </p>

        <div className="flex flex-col gap-3 justify-center mt-auto">
          {hasGuidedComponent && (
            <Button variant="blue" onClick={() => setShowGuided(true)}>
              Try It Now
            </Button>
          )}
          <div className="flex gap-3 justify-center">
            <Button onClick={onNewTechnique}>New Technique</Button>
            <Button variant="secondary" onClick={onReturnToSpinner}>
              Return to Spinner
            </Button>
          </div>
        </div>
      </div>

      {showGuided && GuidedTechnique && (
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <GuidedTechnique
            technique={technique}
            onClose={() => setShowGuided(false)}
            onReturnToSpinner={() => {
              setShowGuided(false);
              onReturnToSpinner();
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default TechniqueCard;
