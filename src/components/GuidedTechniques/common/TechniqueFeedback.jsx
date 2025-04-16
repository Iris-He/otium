import React, { useState, useEffect } from "react";
import Button from "../../common/Button";
import BackgroundWithLemons from "../../common/BackgroundWithLemons";
import { useAuthContext } from "../../../contexts/AuthContext";
import { checkFavoriteTechnique } from "../../../lib/supabaseClient";

const TechniqueFeedback = ({ onSubmit, onSkip, techniqueId, technique }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAlreadyFavorited, setIsAlreadyFavorited] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState(0);
  const [hoveredAnxietyLevel, setHoveredAnxietyLevel] = useState(0);
  const [anxietyContext, setAnxietyContext] = useState("");
  const { user } = useAuthContext();

  useEffect(() => {
    const checkIfFavorited = async () => {
      if (user && !user.isGuest && techniqueId) {
        const isFavorited = await checkFavoriteTechnique(
          user.id,
          Number(techniqueId)
        );
        setIsAlreadyFavorited(isFavorited);
        setIsFavorite(isFavorited);
      }
    };

    checkIfFavorited();
  }, [user, techniqueId]);

  const handleSubmit = () => {
    if (!user || user.isGuest) return;

    const feedbackData = {
      rating,
      anxietyLevel,
      anxietyContext: anxietyContext.trim() || null,
      isFavorite: isFavorite && !isAlreadyFavorited,
      techniqueId: Number(techniqueId),
      techniqueName: technique?.title,
      userId: user.id,
    };

    if (
      feedbackData.isFavorite &&
      (!feedbackData.techniqueName || !feedbackData.techniqueId)
    ) {
      return;
    }

    onSubmit(feedbackData);
  };

  if (!user || user.isGuest) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-600">
          Please log in to save favorites and provide feedback.
        </p>
        <Button onClick={onSkip} variant="secondary">
          Return to Spinner
        </Button>
      </div>
    );
  }

  return (
    <BackgroundWithLemons className="space-y-4 backdrop-blur-md rounded-lg p-3 sm:p-4 max-w-md mx-auto">
      <div className="flex flex-col space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-serif text-gray-800">
            Did it help you feel better?
          </h3>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className={`text-xl sm:text-2xl transition-colors duration-200 p-1 sm:p-2 ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-base sm:text-lg font-serif text-gray-800">
            How anxious were you before trying this technique?
          </h4>
          <div className="flex justify-center space-x-1 sm:space-x-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setAnxietyLevel(level)}
                onMouseEnter={() => setHoveredAnxietyLevel(level)}
                onMouseLeave={() => setHoveredAnxietyLevel(0)}
                className={`text-xl sm:text-2xl transition-colors duration-200 p-1 sm:p-2 ${
                  level <= (hoveredAnxietyLevel || anxietyLevel)
                    ? "text-blue-400"
                    : "text-gray-300"
                }`}
              >
                ●
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {anxietyLevel === 1
              ? "Barely noticeable"
              : anxietyLevel === 2
              ? "Mild"
              : anxietyLevel === 3
              ? "Moderate"
              : anxietyLevel === 4
              ? "High"
              : anxietyLevel === 5
              ? "Severe"
              : "Select a level"}
          </p>
        </div>

        <textarea
          className="w-full p-2 border rounded-md h-24 sm:h-32"
          placeholder="Any additional feedback? (optional)"
          value={anxietyContext}
          onChange={(e) => setAnxietyContext(e.target.value)}
        />

        <div className="flex gap-2 mt-2">
          <Button onClick={handleSubmit} variant="lime" className="flex-1">
            Submit
          </Button>
          <Button onClick={onSkip} variant="secondary" className="flex-1">
            Skip
          </Button>
        </div>
      </div>
    </BackgroundWithLemons>
  );
};

export default TechniqueFeedback;
