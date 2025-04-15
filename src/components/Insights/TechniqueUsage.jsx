import React from "react";

const TechniqueUsage = ({ usageByTechnique }) => {
  if (!usageByTechnique || Object.keys(usageByTechnique).length === 0) {
    return null;
  }

  // Sort techniques by usage count in descending order
  const sortedTechniques = Object.entries(usageByTechnique).sort(
    ([, a], [, b]) => b.count - a.count
  );

  // Find the maximum count for percentage calculation
  const maxCount = Math.max(...sortedTechniques.map(([, data]) => data.count));

  return (
    <div className="bg-green-50 p-4 rounded-lg mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Technique Usage
      </h3>

      <div className="space-y-4">
        {sortedTechniques.map(([techniqueName, data]) => (
          <div key={techniqueName}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">
                {techniqueName}
              </span>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">
                  {data.count} uses
                </span>
                {data.averageRating && (
                  <span className="text-sm text-gray-600">
                    ({parseFloat(data.averageRating)} avg rating)
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{
                  width: `${Math.min(100, (data.count / maxCount) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechniqueUsage;
