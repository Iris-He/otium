import React, { useState } from "react";
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
} from "./lib/supabaseClient";
import UserInsights from "./components/Insights/UserInsights";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, handleSignOut, handleSignIn, handleProceedAsGuest } =
    useAuthContext();
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

  // Show auth screen if no user
  if (!user) {
    return (
      <div className="flex flex-col min-h-screen p-6 w-full bg-gray-50 text-gray-700 font-sans">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Auth
            onSignIn={handleSignIn}
            onProceedAsGuest={handleProceedAsGuest}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 w-full bg-gray-50 text-gray-700 font-sans">
      <Header onSignOut={handleSignOut} onViewInsights={handleViewInsights} />
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 mb-16">
        {showInsights ? (
          <UserInsights
            insights={insightsData}
            onClose={handleCloseInsights}
            isLoading={isLoadingInsights}
            userId={user.id}
          />
        ) : (
          <div className="relative w-64 h-64">
            <Spinner
              onSpin={handleSpin}
              rotationDegree={rotationDegree}
              spinning={spinning}
              onSelectTechnique={handleSelectTechnique}
            />
            <TechniqueCard
              technique={selectedTechnique}
              onNewTechnique={handleNewTechnique}
              onReturnToSpinner={handleReturnToSpinner}
              onFeedbackSubmit={handleTechniqueFeedback}
              visible={showCard}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
