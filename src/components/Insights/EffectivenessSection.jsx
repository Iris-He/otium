import React from "react";
import RatingStars from "./RatingStars";

const EffectivenessSection = ({ topRatedTechnique, lowestRatedTechnique }) => {
  return (
    <div className="bg-lime-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Effectiveness</h3>

      {/* Top rated technique */}
      {topRatedTechnique && (
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Most effective technique
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <div className="font-bold text-gray-800 mb-1">
              {topRatedTechnique.techniqueName}
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <RatingStars rating={topRatedTechnique.averageRating} />
              </div>
              <div className="text-lg font-bold text-gray-800">
                {topRatedTechnique.averageRating.toFixed(1)}/5
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lowest rated technique */}
      {lowestRatedTechnique && (
        <div className="mt-6">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Least effective technique
          </div>
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="font-bold text-gray-800 mb-1">
              {lowestRatedTechnique.techniqueName}
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <RatingStars rating={lowestRatedTechnique.averageRating} />
              </div>
              <div className="text-lg font-bold text-gray-800">
                {lowestRatedTechnique.averageRating.toFixed(1)}/5
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EffectivenessSection;
