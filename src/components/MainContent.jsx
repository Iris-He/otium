import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Spinner from "./Spinner/Spinner";
import TechniqueCard from "./TechniqueCard/TechniqueCard";
import UserInsights from "./Insights/UserInsights";
import { useTechniqueSelection } from "../hooks/useTechniqueSelection";
import {
  saveFavoriteTechnique,
  saveTechniqueUsage,
  getUserInsights,
  getFavoriteTechniques,
} from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const { user, handleSignOut } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const {
    spinning,
    selectedTechnique,
    setSelectedTechnique,
    rotationDegree,
    showCard,
    setShowCard,
    dropdownValue,
    setDropdownValue,
    handleSpin,
    handleNewTechnique,
    handleReturnToSpinner,
  } = useTechniqueSelection();
  const [showInsights, setShowInsights] = useState(false);
  const [insightsData, setInsightsData] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

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

  const handleSelectTechnique = (technique) => {
    if (!technique) return;

    setSelectedTechnique(technique);
    setShowCard(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSignOut={handleSignOut} />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 container mx-auto px-4 flex flex-col">
          {/* Adjust vertical spacing based on screen size */}
          <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-8 py-2 sm:py-8">
            {/* Spinner Section - reduce size on mobile */}
            <div className="spinner-container flex items-center justify-center">
              <div className="w-[85%] sm:w-full max-w-md">
                <Spinner
                  onSpin={handleSpin}
                  rotationDegree={rotationDegree}
                  spinning={spinning}
                  onSelectTechnique={handleSelectTechnique}
                  dropdownValue={dropdownValue}
                  setDropdownValue={setDropdownValue}
                />
              </div>
            </div>

            {/* Technique Card */}
            <TechniqueCard
              technique={selectedTechnique}
              onNewTechnique={handleNewTechnique}
              onReturnToSpinner={handleReturnToSpinner}
              visible={showCard}
            />

            {/* Insights Modal */}
            {showInsights && (
              <UserInsights
                insights={insightsData}
                onClose={() => setShowInsights(false)}
                isLoading={isLoadingInsights}
                userId={user?.id}
              />
            )}
          </div>
        </main>

        {/* Reduce footer padding on mobile */}
        {!showCard && (
          <footer className="py-2 sm:py-4 mt-auto">
            <Footer onViewInsights={handleViewInsights} />
          </footer>
        )}
      </div>
    </div>
  );
};

export default MainContent;
