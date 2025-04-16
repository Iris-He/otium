import React, { useState, lazy, Suspense } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Modal from "../common/Modal";
import LoadingSpinner from "../common/LoadingSpinner";
import Button from "../common/Button";

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

  if (!technique || !visible) return null;

  const GuidedTechnique = guidedTechniqueComponents[technique.id];

  return (
    <Modal onClose={onReturnToSpinner}>
      {showGuided && GuidedTechnique ? (
        <Suspense fallback={<LoadingSpinner message="Loading technique..." />}>
          <div className="w-full max-w-2xl">
            <GuidedTechnique
              technique={technique}
              onClose={() => setShowGuided(false)}
              onReturnToSpinner={handleReturnToSpinner}
              onFeedbackSubmit={handleFeedbackSubmit}
            />
          </div>
        </Suspense>
      ) : (
        <div className="w-full max-w-xl">
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
      )}
    </Modal>
  );
};

export default TechniqueCard;
