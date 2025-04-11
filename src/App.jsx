import React from "react";
import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";
import TechniqueCard from "./components/TechniqueCard/TechniqueCard";
import Footer from "./components/Footer/Footer";
import Auth from "./components/Auth/Auth";
import { useAuth } from "./hooks/useAuth";
import { useTechniqueSelection } from "./hooks/useTechniqueSelection";

function App() {
  // Use custom hooks
  const { user, handleSignIn, handleProceedAsGuest } = useAuth();
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

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen p-6 w-full bg-gray-50 text-gray-700 font-sans">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Auth
            onSignIn={handleSignIn}
            onProceedAsGuest={handleProceedAsGuest}
          />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-6 w-full bg-gray-50 text-gray-700 font-sans">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 mb-16">
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
            visible={showCard}
          />
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default App;
