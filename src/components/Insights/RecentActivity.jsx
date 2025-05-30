import React from "react";

const RecentActivity = ({ recentUsage }) => {
  const formatDate = (dateString) => {
    try {
      // Ensure we're working with a valid date string
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return ""; // Return empty string if date is invalid
      }
      return date.toLocaleDateString();
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  return (
    <div className="bg-purple-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {recentUsage.map((usage, index) => (
          <div key={index} className="border-l-4 border-purple-300 pl-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {usage.techniqueName}
                </h4>
                {usage.anxietyContext && (
                  <p className="text-sm text-gray-600 mt-1">
                    Context: {usage.anxietyContext}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {formatDate(usage.created_at)}{" "}
                  {/* Note: changed from createdAt to created_at */}
                </div>
                {usage.rating && (
                  <div className="text-sm text-purple-600 font-medium">
                    Rating: {usage.rating}/5
                  </div>
                )}
                {usage.anxietyLevel && (
                  <div className="text-sm text-purple-600">
                    Anxiety: {usage.anxietyLevel}/5
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
