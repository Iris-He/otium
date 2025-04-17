import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Spinner from "./Spinner/Spinner";
import TechniquePreview from "./TechniqueCard/TechniquePreview";
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

  const [showPreview, setShowPreview] = useState(false);

  const handleSelectTechnique = (technique) => {
    if (!technique) return;

    setSelectedTechnique(technique);
    setShowPreview(true);
  };

  // Show preview when selectedTechnique changes (after spinning)
  useEffect(() => {
    if (selectedTechnique && !spinning) {
      setShowPreview(true);
    } else if (spinning) {
      // Hide preview during spinning animation
      setShowPreview(false);
    }
  }, [selectedTechnique, spinning]);

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedTechnique(null);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header onSignOut={handleSignOut} />
      <main className="flex-1 container mx-auto px-4 flex flex-col">
        {/* Spinner and Card Section */}
        <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-8 py-2 sm:py-8">
          {/* Spinner Section */}
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

          {/* Technique Preview */}
          {showPreview && selectedTechnique && (
            <TechniquePreview
              technique={selectedTechnique}
              onNewTechnique={handleNewTechnique}
              onClose={handleClosePreview}
            />
          )}

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

      {/* Footer */}
      <div className="mt-auto">
        <Footer onViewInsights={handleViewInsights} />
      </div>
    </div>
  );
};

export default MainContent;
