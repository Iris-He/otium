import React, { useState, useEffect } from "react";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";
import TechniqueCard from "./components/TechniqueCard/TechniqueCard";
import Footer from "./components/Footer/Footer";
import Auth from "./components/Auth/Auth";
import { useTechniqueSelection } from "./hooks/useTechniqueSelection";
import {
  saveFavoriteTechnique,
  saveTechniqueUsage,
  getUserInsights,
  getFavoriteTechniques,
} from "./lib/supabaseClient";
import UserInsights from "./components/Insights/UserInsights";
import groundingTechniques from "./data/groundingTechniques";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const {
    user,
    isEmailConfirmed,
    handleSignOut,
    handleSignIn,
    handleProceedAsGuest,
  } = useAuthContext();
  const {
    spinning,
    selectedTechnique,
    rotationDegree,
    showCard,
    handleSpin,
    handleNewTechnique,
    handleReturnToSpinner,
    handleSelectTechnique,
  } = useTechniqueSelection();

  const [showInsights, setShowInsights] = useState(false);
  const [insightsData, setInsightsData] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [groupedTechniques, setGroupedTechniques] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [isGuidedTechniqueActive, setIsGuidedTechniqueActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (user) {
          const favorites = user.isGuest
            ? []
            : await getFavoriteTechniques(user.id);

          const favoritesOptions = favorites.map((fav) => ({
            value: fav.technique_id.toString(),
            label: fav.technique_name,
          }));

          const allOptions = groundingTechniques.map((technique) => ({
            value: technique.id.toString(),
            label: technique.title,
          }));

          setGroupedTechniques({
            favorites: favoritesOptions,
            all: allOptions,
          });
        } else {
          const allOptions = groundingTechniques.map((technique) => ({
            value: technique.id.toString(),
            label: technique.title,
          }));

          setGroupedTechniques({
            all: allOptions,
          });
        }
      } catch (error) {
        // Keep error handling without console.log
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [user]);

  const handleTechniqueSelect = (value) => {
    handleSelectTechnique(value);
    setDropdownValue("");
    setIsGuidedTechniqueActive(true); // Set to true when technique is selected
  };

  const handleReturnToSpinnerWithReset = () => {
    handleReturnToSpinner();
    setDropdownValue("");
    setIsGuidedTechniqueActive(false); // Set to false when returning to spinner
  };

  const handleTechniqueFeedback = async (feedback) => {
    if (!user || user.isGuest) {
      return;
    }

    try {
      // Save technique usage data
      await saveTechniqueUsage({
        userId: feedback.userId,
        techniqueId: feedback.techniqueId,
        techniqueName: feedback.techniqueName,
        rating: feedback.rating || null,
        anxietyLevel: feedback.anxietyLevel || null,
        anxietyContext: feedback.anxietyContext || null,
      });

      // If it's also a favorite, save that too
      if (feedback.isFavorite) {
        const { userId, techniqueId, techniqueName } = feedback;
        await saveFavoriteTechnique(userId, techniqueId, techniqueName);
      }
    } catch (error) {
      console.error("Error saving technique feedback:", error);
    }
  };

  const handleViewInsights = async () => {
    if (!user || user.isGuest) return;

    setIsLoadingInsights(true);
    try {
      const insights = await getUserInsights(user.id);
      setInsightsData(insights);
      setShowInsights(true);
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleCloseInsights = () => {
    setShowInsights(false);
  };

  // Show auth screen if no user or email not confirmed
  if (!user || (user && !user.isGuest && !isEmailConfirmed)) {
    return (
      <div className="relative min-h-screen w-full bg-[url('/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-yellow-100/80">
          <div className="relative flex flex-col min-h-screen p-6 w-full text-gray-700 font-sans">
            <Header />
            <div className="flex-1 flex items-center justify-center">
              {!user ? (
                <Auth
                  onSignIn={handleSignIn}
                  onProceedAsGuest={handleProceedAsGuest}
                />
              ) : (
                <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                  <h2 className="text-2xl font-serif text-center mb-6">
                    Email Verification Required
                  </h2>
                  <p className="text-center text-gray-600 mb-4">
                    Please check your email and click the verification link to
                    access your account.
                  </p>
                  <Button onClick={handleSignOut} className="w-full">
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative min-h-screen w-full bg-[url('/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          <LoadingSpinner message="Loading application..." />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[url('/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="absolute inset-0 bg-white/60">
        <div className="relative flex flex-col min-h-screen w-full text-gray-700 font-sans">
          <Header onSignOut={handleSignOut} />
          <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16">
            {showInsights ? (
              <UserInsights
                insights={insightsData}
                onClose={handleCloseInsights}
                isLoading={isLoadingInsights}
                userId={user.id}
              />
            ) : (
              <>
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="spinner-container relative w-48 sm:w-64 h-48 sm:h-64 mb-12">
                    <Spinner
                      onSpin={handleSpin}
                      rotationDegree={rotationDegree}
                      spinning={spinning}
                      onSelectTechnique={handleTechniqueSelect}
                      dropdownValue={dropdownValue}
                      setDropdownValue={setDropdownValue}
                    />
                  </div>
                </div>

                {selectedTechnique && (
                  <TechniqueCard
                    technique={selectedTechnique}
                    onNewTechnique={handleNewTechnique}
                    onReturnToSpinner={handleReturnToSpinnerWithReset}
                    onFeedbackSubmit={handleTechniqueFeedback}
                    visible={showCard}
                  />
                )}
              </>
            )}
          </main>
          {!isGuidedTechniqueActive && !selectedTechnique && (
            <Footer onViewInsights={handleViewInsights} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
