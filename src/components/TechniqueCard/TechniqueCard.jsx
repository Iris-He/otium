import React, { useState, lazy, Suspense } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";

// Use Vite's glob import to dynamically load all technique components
const techniqueModules = import.meta.glob(
  "../GuidedTechniques/Techniques/GuidedTechniqueId*.jsx",
  { eager: false }
);

// Create a mapping of technique IDs to their lazy-loaded components
const guidedTechniqueComponents = Object.entries(techniqueModules).reduce(
  (acc, [path, importFn]) => {
    // Extract the technique ID from the filename
    const techniqueId = parseInt(path.match(/GuidedTechniqueId(\d+)\.jsx$/)[1]);
    acc[techniqueId] = lazy(importFn);
    return acc;
  },
  {}
);

const TechniqueCard = ({
  technique,
  onNewTechnique,
  onReturnToSpinner,
  onFeedbackSubmit,
  visible,
}) => {
  const [showGuided, setShowGuided] = useState(false);
  const { user } = useAuthContext();

  const handleFeedbackSubmit = (feedback) => {
    console.log("TechniqueCard - Received feedback:", feedback);

    if (onFeedbackSubmit) {
      const enrichedFeedback = {
        ...feedback,
        techniqueName: feedback.techniqueName || technique.title,
      };

      console.log(
        "TechniqueCard - Forwarding enriched feedback:",
        enrichedFeedback
      );
      onFeedbackSubmit(enrichedFeedback);
    }
  };

  const handleReturnToSpinner = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowGuided(false); // Reset guided state
    onReturnToSpinner(); // Call parent handler which includes dropdown reset
  };

  if (!technique) return null;

  const GuidedTechnique = guidedTechniqueComponents[technique.id];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-transparent ${
        visible ? "block" : "hidden"
      }`}
    >
      {showGuided && GuidedTechnique && (
        <Suspense fallback={<LoadingSpinner message="Loading technique..." />}>
          <div className="absolute inset-x-0 top-20 bottom-16 z-50 bg-transparent rounded-lg mx-4 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <GuidedTechnique
                technique={technique}
                onClose={() => setShowGuided(false)}
                onReturnToSpinner={handleReturnToSpinner}
                onFeedbackSubmit={handleFeedbackSubmit}
              />
            </div>
          </div>
        </Suspense>
      )}
      <div
        className={`relative w-full max-w-xl bg-white bg-opacity-65 rounded-xl shadow-lg p-6 flex flex-col justify-between z-10 transition-all duration-400 ease-in-out m-4
          ${
            !showGuided && visible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }`}
      >
        <h2 className="font-serif text-2xl text-gray-800 text-center mb-4">
          {technique.title}
        </h2>
        <p className="text-gray-600 text-center mb-6 flex-grow flex items-center justify-center px-4">
          {technique.description}
        </p>

        <div className="flex flex-col gap-3 justify-center mt-auto">
          <Button
            variant="lime"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowGuided(true);
            }}
          >
            Try It Now
          </Button>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNewTechnique();
              }}
            >
              New Technique
            </Button>
            <Button variant="secondary" onClick={handleReturnToSpinner}>
              Return to Spinner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechniqueCard;
