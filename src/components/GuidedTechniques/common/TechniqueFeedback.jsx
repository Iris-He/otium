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
    <BackgroundWithLemons className="space-y-4 sm:space-y-6 backdrop-blur-md rounded-lg p-4 sm:p-6 max-w-md mx-auto">
      <div className="text-center space-y-4">
        <h3 className="text-lg sm:text-xl font-serif text-gray-800">
          Did it help you feel better?
        </h3>
        <div className="flex justify-center space-x-1 sm:space-x-2">
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

        <div className="mt-4">
          <h4 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
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

        <div className="mt-4">
          <h4 className="text-lg sm:text-xl font-serif text-gray-800 mb-2">
            What triggered your anxiety? (optional)
          </h4>
          <textarea
            value={anxietyContext}
            onChange={(e) => setAnxietyContext(e.target.value)}
            placeholder="Work stress, social situation, etc."
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            rows="2"
          />
        </div>

        {!isAlreadyFavorited && (
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`mt-4 flex items-center justify-center space-x-2 mx-auto px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
              isFavorite
                ? "bg-pink-50 text-pink-500"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100"
            }`}
          >
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                isFavorite ? "scale-110" : "scale-100"
              }`}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-sm sm:text-base font-medium">
              {isFavorite ? "Added to favorites" : "Add to favorites"}
            </span>
          </button>
        )}
      </div>
      <div className="flex justify-center space-x-3">
        <Button onClick={handleSubmit} variant="lime">
          Save
        </Button>
        <Button onClick={onSkip} variant="secondary">
          Skip
        </Button>
      </div>
    </BackgroundWithLemons>
  );
};

export default TechniqueFeedback;
