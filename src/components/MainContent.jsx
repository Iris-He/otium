import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Spinner from "./Spinner/Spinner";
import TechniqueCard from "./TechniqueCard/TechniqueCard";
import UserInsights from "./Insights/UserInsights";
import Modal from "./common/Modal";
import { useTechniqueSelection } from "../hooks/useTechniqueSelection";
import {
  saveFavoriteTechnique,
  saveTechniqueUsage,
  getUserInsights,
  getFavoriteTechniques,
} from "../lib/supabaseClient";

const MainContent = () => {
  const { user } = useAuthContext();
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const {
    spinning,
    selectedTechnique,
    rotationDegree,
    showCard,
    handleSpin,
    handleNewTechnique,
    handleReturnToSpinner,
    handleSelectTechnique,
    dropdownValue,
    setDropdownValue,
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Spinner Section */}
        <div className="spinner-container">
          <Spinner
            onSpin={handleSpin}
            rotationDegree={rotationDegree}
            spinning={spinning}
            onSelectTechnique={handleSelectTechnique}
            dropdownValue={dropdownValue}
            setDropdownValue={setDropdownValue}
          />
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
      </main>

      {/* Only show footer when no technique is active */}
      {!showCard && <Footer onViewInsights={handleViewInsights} />}
    </div>
  );
};

export default MainContent;
