import React from "react";

const AnxietyPatterns = ({
  dayOfWeekDistribution,
  timeOfDayDistribution,
  mostAnxiousDay,
  mostAnxiousTime,
}) => {
  // Helper function to get day name
  const getDayName = (day) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[day];
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-8">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Usage Patterns</h3>

      {/* Day of Week Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Day of Week Usage
        </h4>
        <div className="space-y-2">
          {dayOfWeekDistribution?.map((item) => (
            <div key={item.day} className="flex items-center">
              <span className="w-24 text-sm text-gray-600">{item.day}</span>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{
                      width: `${item.count}%`,
                    }}
                  />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{item.count}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time of Day Distribution */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Time of Day Usage
        </h4>
        <div className="space-y-2">
          {timeOfDayDistribution?.map((group) => (
            <div key={group.name} className="flex items-center">
              <span className="w-24 text-sm text-gray-600">{group.name}</span>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-400 h-2 rounded-full"
                    style={{
                      width: `${group.percentage}%`,
                    }}
                  />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {group.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Most Anxious Times */}
      {(mostAnxiousDay || mostAnxiousTime) && (
        <div className="mt-6 p-3 bg-blue-100 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Peak Usage Times
          </h4>
          {mostAnxiousDay && typeof mostAnxiousDay.day === "number" && (
            <div className="text-sm text-gray-600">
              Most active day:{" "}
              <span className="font-medium">
                {getDayName(mostAnxiousDay.day)}
              </span>
            </div>
          )}
          {mostAnxiousTime && typeof mostAnxiousTime.hour === "number" && (
            <div className="text-sm text-gray-600">
              Most active time:{" "}
              <span className="font-medium">{mostAnxiousTime.hour}:00</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnxietyPatterns;
