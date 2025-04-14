import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { getUserInsights } from "../../lib/supabaseClient";

const UserInsights = ({
  insights: initialInsights,
  onClose,
  isLoading: initialLoading,
  userId,
}) => {
  const [timeRange, setTimeRange] = useState(
    initialInsights?.timeRange || "all"
  );
  const [insights, setInsights] = useState(initialInsights);
  const [isLoading, setIsLoading] = useState(initialLoading);

  const handleTimeRangeChange = async (newTimeRange) => {
    if (newTimeRange === timeRange) return;

    setIsLoading(true);
    try {
      const newInsights = await getUserInsights(userId, newTimeRange);
      setInsights(newInsights);
      setTimeRange(newTimeRange);
    } catch (error) {
      console.error("Error fetching insights for time range:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <Modal onClose={onClose}>
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mb-4"></div>
          <p className="text-gray-600">Loading your insights...</p>
        </div>
      </Modal>
    );
  }

  if (!insights) {
    return (
      <Modal onClose={onClose}>
        <div className="text-center py-8">
          <h2 className="text-2xl font-serif text-gray-800 mb-4">
            No Data Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Try some techniques and provide feedback to see your insights.
          </p>
          <Button onClick={onClose} variant="primary">
            Return to Spinner
          </Button>
        </div>
      </Modal>
    );
  }

  const {
    totalTechniquesUsed,
    uniqueTechniques,
    averageRating,
    topRatedTechnique,
    lowestRatedTechnique,
    mostUsedTechnique,
    dayOfWeekDistribution,
    timeOfDayDistribution,
    recentUsage,
    usageByTechnique,
  } = insights;

  // Find the day with most anxiety
  const mostAnxiousDay = [...dayOfWeekDistribution].sort(
    (a, b) => b.count - a.count
  )[0];

  // Find the time of day with most anxiety
  const mostAnxiousTime = [...timeOfDayDistribution].sort(
    (a, b) => b.count - a.count
  )[0];

  return (
    <Modal onClose={onClose}>
      <div className="py-2">
        <h2 className="text-2xl font-serif text-gray-800 mb-2 text-center">
          Your Insights{" "}
          {timeRange === "recent" ? "(Last 14 Days)" : "(All Time)"}
        </h2>

        {/* Time Range Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => handleTimeRangeChange("recent")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                timeRange === "recent"
                  ? "bg-yellow-300 text-gray-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Last 14 Days
            </button>
            <button
              type="button"
              onClick={() => handleTimeRangeChange("all")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                timeRange === "all"
                  ? "bg-yellow-300 text-gray-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Summary Stats */}
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
                  style={{
                    width: `${Math.min(100, totalTechniquesUsed * 2)}%`,
                  }}
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
                        width: `${Math.min(
                          100,
                          mostUsedTechnique.count * 10
                        )}%`,
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

          {/* Effectiveness */}
          <div className="bg-lime-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Effectiveness
            </h3>

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
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              parseFloat(topRatedTechnique.averageRating) >=
                              star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
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
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${
                              parseFloat(lowestRatedTechnique.averageRating) >=
                              star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {lowestRatedTechnique.averageRating.toFixed(1)}/5
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Anxiety Patterns */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Anxiety Patterns
          </h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Days of week visualization */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Activity by day of week
                </h4>
                <div className="space-y-2">
                  {dayOfWeekDistribution.map((day) => (
                    <div key={day.day} className="flex items-center">
                      <div className="w-24 text-xs text-gray-600">
                        {day.day}
                      </div>
                      <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            day.day === mostAnxiousDay?.day
                              ? "bg-blue-500"
                              : "bg-blue-300"
                          }`}
                          style={{
                            width: `${Math.max(
                              5,
                              (day.count / (mostAnxiousDay?.count || 1)) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-gray-600 text-right ml-2">
                        {day.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time of day visualization */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Activity by time of day
                </h4>
                <div className="space-y-2">
                  {timeOfDayDistribution.map((time) => (
                    <div key={time.name} className="flex items-center">
                      <div className="w-32 text-xs text-gray-600">
                        {time.name}
                      </div>
                      <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            time.name === mostAnxiousTime?.name
                              ? "bg-purple-500"
                              : "bg-purple-300"
                          }`}
                          style={{
                            width: `${Math.max(
                              5,
                              (time.count / (mostAnxiousTime?.count || 1)) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-gray-600 text-right ml-2">
                        {time.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Insight:</span> You tend to use
                anxiety-reducing techniques most on{" "}
                <span className="font-bold text-blue-700">
                  {mostAnxiousDay?.day || "N/A"}
                </span>{" "}
                in the{" "}
                <span className="font-bold text-purple-700">
                  {mostAnxiousTime?.name || "N/A"}
                </span>
                .
              </div>
            </div>
          </div>
        </div>

        {/* Technique Usage */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Technique Usage
          </h3>
          <div className="bg-green-50 p-4 rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Technique</th>
                  <th className="text-center py-2 px-3">Times Used</th>
                  <th className="text-center py-2 px-3">Avg. Rating</th>
                </tr>
              </thead>
              <tbody>
                {usageByTechnique
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((technique, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2 px-3">{technique.techniqueName}</td>
                      <td className="py-2 px-3 text-center">
                        {technique.count}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {technique.averageRating
                          ? `${technique.averageRating}/5`
                          : "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Recent Activity
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Technique</th>
                  <th className="text-left py-2 px-3">Rating</th>
                  <th className="text-left py-2 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentUsage.map((usage, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-2 px-3">{usage.technique_name}</td>
                    <td className="py-2 px-3">
                      {usage.rating ? `${usage.rating}/5` : "-"}
                    </td>
                    <td className="py-2 px-3">
                      {new Date(usage.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button onClick={onClose} variant="primary">
            Return to Spinner
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserInsights;
