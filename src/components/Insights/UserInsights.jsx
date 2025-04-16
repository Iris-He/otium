import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import SummaryStats from "./SummaryStats";
import EffectivenessSection from "./EffectivenessSection";
import AnxietyPatterns from "./AnxietyPatterns";
import TechniqueUsage from "./TechniqueUsage";
import RecentActivity from "./RecentActivity";
import TimeRangeToggle from "./TimeRangeToggle";
import { getUserInsights } from "../../lib/supabaseClient";
import LoadingSpinner from "../common/LoadingSpinner";

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
        <LoadingSpinner message="Loading your insights..." />
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

  return (
    <Modal onClose={onClose}>
      <div className="py-2">
        <h2 className="text-2xl font-serif text-gray-800 mb-2 text-center">
          Your Insights{" "}
          {timeRange === "recent" ? "(Last 14 Days)" : "(All Time)"}
        </h2>

        <TimeRangeToggle
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SummaryStats {...insights} />
          <EffectivenessSection {...insights} />
        </div>

        <AnxietyPatterns
          dayOfWeekDistribution={insights.dayOfWeekDistribution}
          timeOfDayDistribution={insights.timeOfDayDistribution}
          mostAnxiousDay={insights.mostAnxiousDay}
          mostAnxiousTime={insights.mostAnxiousTime}
        />

        <TechniqueUsage usageByTechnique={insights.usageByTechnique} />
        <RecentActivity recentUsage={insights.recentUsage} />

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
