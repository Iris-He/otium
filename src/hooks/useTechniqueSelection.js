import { useState } from "react";
import groundingTechniques from "../data/groundingTechniques";

export const useTechniqueSelection = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [recentTechniques, setRecentTechniques] = useState([]); // Track recent techniques
  const [dropdownValue, setDropdownValue] = useState(""); // Keep dropdown state

  const getRandomTechnique = () => {
    const availableTechniques = groundingTechniques.filter(
      (technique) => !recentTechniques.includes(technique.id)
    );

    // If all techniques have been shown recently, use full list
    const techniquePool =
      availableTechniques.length === 0
        ? groundingTechniques
        : availableTechniques;

    const randomIndex = Math.floor(Math.random() * techniquePool.length);
    const selectedTechnique = techniquePool[randomIndex];

    // Update recent techniques (keep last 3)
    setRecentTechniques((prev) => {
      const updated = [selectedTechnique.id, ...prev];
      return updated.slice(0, 3);
    });

    return selectedTechnique;
  };

  // Handle spin action
  const handleSpin = () => {
    if (spinning) return;

    setShowCard(false);
    setSpinning(true);
    setSelectedTechnique(null); // Clear current technique
    setDropdownValue(""); // Reset dropdown value

    // Random rotation between 1080 and 1800 degrees (3-5 full spins)
    const spinDegree = 1080 + Math.floor(Math.random() * 720);

    // Start spinning animation
    setRotationDegree((prevDegree) => prevDegree + spinDegree);

    // After animation completes, show the selected technique
    setTimeout(() => {
      const technique = getRandomTechnique();
      setSpinning(false);
      setSelectedTechnique(technique);

      // Update recent techniques
      setRecentTechniques((prev) => {
        const updated = [technique.id, ...prev];
        return updated.slice(0, 3);
      });

      setTimeout(() => {
        setShowCard(true);
      }, 300);
    }, 3000);
  };

  // Handle generating a new technique without spinning
  const handleNewTechnique = () => {
    setShowCard(false);
    setDropdownValue(""); // Reset dropdown value

    // Add a quick small spin for visual feedback
    const quickSpinDegree = 90 + Math.floor(Math.random() * 180); // Smaller rotation
    setSpinning(true);
    setRotationDegree((prevDegree) => prevDegree + quickSpinDegree);

    setTimeout(() => {
      setSpinning(false);
      setSelectedTechnique(getRandomTechnique());
      setShowCard(true);
    }, 800);
  };

  // Handle returning to spinner
  const handleReturnToSpinner = () => {
    setShowCard(false);
    setSpinning(false);
    setSelectedTechnique(null);
    setDropdownValue(""); // Reset dropdown value
    // Force a small rotation to trigger the spinning effect reset
    setRotationDegree((prev) => prev + 1);
  };

  return {
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
  };
};
