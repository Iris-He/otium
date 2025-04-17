import React, { useState, lazy, Suspense, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import LoadingSpinner from "../common/LoadingSpinner";
import PageTransition from "../common/PageTransition";
import groundingTechniques from "../../data/groundingTechniques";

// Use Vite's glob import to dynamically load all technique components
const techniqueModules = import.meta.glob(
  "./Techniques/GuidedTechniqueId*.jsx",
  { eager: false }
);

// Create a mapping of technique IDs to their lazy-loaded components
const guidedTechniqueComponents = Object.entries(techniqueModules).reduce(
  (acc, [path, importFn]) => {
    const techniqueId = parseInt(path.match(/GuidedTechniqueId(\d+)\.jsx$/)[1]);
    acc[techniqueId] = lazy(importFn);
    return acc;
  },
  {}
);

const TechniquePage = () => {
  const { techniqueId, stepNumber } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const technique = groundingTechniques.find(
    (t) => t.id === parseInt(techniqueId)
  );

  // Get the correct component for this technique
  const GuidedTechnique = technique
    ? guidedTechniqueComponents[technique.id]
    : null;

  // Set default step to 1 if stepNumber is not provided
  const currentStep = stepNumber ? parseInt(stepNumber) : 0;

  useEffect(() => {
    if (!technique) {
      navigate("/", { replace: true });
    }
  }, [technique, navigate]);

  if (!technique || !GuidedTechnique) {
    return null;
  }

  const handleBack = () => {
    if (currentStep > 1) {
      navigate(`/techniques/${techniqueId}/p/${currentStep - 1}`);
    } else {
      // When on step 1, return to spinner instead of using navigate(-1)
      navigate("/", { replace: true });
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      if (currentStep < technique.totalSteps - 1) {
        navigate(`/techniques/${techniqueId}/p/${currentStep + 1}`);
      } else {
        // Handle completion
        setShowFeedback(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToSpinner = () => {
    navigate("/", { replace: true });
  };

  const handleFeedbackSubmit = async (feedback) => {
    setIsLoading(true);
    try {
      // Handle feedback submission
      console.log("Feedback submitted:", feedback);
      navigate("/", { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col min-h-[100dvh] bg-white">
        {/* Status bar spacer for iOS/Android notch */}
        <div className="fixed top-0 left-0 right-0 h-[env(safe-area-inset-top)] bg-white z-50"></div>

        {/* Fixed Header - adjusted for safe areas */}
        <header className="sticky top-[env(safe-area-inset-top)] bg-white/95 backdrop-blur-sm border-b z-20">
          <div className="container mx-auto px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
              >
                <IoArrowBack className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-serif text-gray-800 ml-2">
                {technique.title}
              </h1>
            </div>
            {technique.totalSteps > 1 && (
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {technique.totalSteps}
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content - adjusted for safe areas */}
        <main className="flex-1 container mx-auto px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[env(safe-area-inset-bottom)] py-4 relative">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner message="Loading technique..." />
              </div>
            }
          >
            <GuidedTechnique
              technique={technique}
              currentStep={currentStep}
              onNext={handleNext}
              onReturnToSpinner={handleReturnToSpinner}
              onFeedbackSubmit={handleFeedbackSubmit}
              showFeedback={showFeedback}
              setShowFeedback={setShowFeedback}
            />
          </Suspense>
        </main>

        {/* Loading Overlay - adjusted for safe areas */}
        {isLoading && (
          <div className="fixed inset-[env(safe-area-inset-top)] inset-x-0 bottom-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
            <LoadingSpinner message="Processing..." />
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default TechniquePage;
