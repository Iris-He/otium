import React from "react";

const SummaryStats = ({
  totalTechniquesUsed,
  uniqueTechniques,
  averageRating,
  mostUsedTechnique,
}) => {
  return (
    <div className="bg-yellow-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Summary</h3>

      {/* Total techniques visualization */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Total techniques used
          </span>
          <span className="text-sm font-bold text-gray-800">
            {totalTechniquesUsed}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-yellow-400 h-2.5 rounded-full"
            style={{ width: `${Math.min(100, totalTechniquesUsed * 2)}%` }}
          ></div>
        </div>
      </div>

      {/* Unique techniques visualization */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Unique techniques tried
          </span>
          <span className="text-sm font-bold text-gray-800">
            {uniqueTechniques}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-orange-400 h-2.5 rounded-full"
            style={{ width: `${Math.min(100, uniqueTechniques * 10)}%` }}
          ></div>
        </div>
      </div>

      {/* Average rating visualization */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Average rating
          </span>
          <span className="text-sm font-bold text-gray-800">
            {averageRating} / 5
          </span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`flex-1 h-6 rounded ${
                parseFloat(averageRating) >= star
                  ? "bg-yellow-400"
                  : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Most used technique */}
      {mostUsedTechnique && (
        <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Most used technique
          </div>
          <div className="font-bold text-gray-800">
            {mostUsedTechnique.techniqueName}
          </div>
          <div className="flex items-center mt-2">
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
                style={{
                  width: `${Math.min(100, mostUsedTechnique.count * 10)}%`,
                }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {mostUsedTechnique.count} times
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryStats;
