import React from "react";
import Button from "../common/Button";

const TimeRangeToggle = ({ timeRange, onTimeRangeChange }) => {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <Button
        onClick={() => onTimeRangeChange("recent")}
        variant={timeRange === "recent" ? "primary" : "secondary"}
        className="text-sm"
      >
        Last 14 Days
      </Button>
      <Button
        onClick={() => onTimeRangeChange("all")}
        variant={timeRange === "all" ? "primary" : "secondary"}
        className="text-sm"
      >
        All Time
      </Button>
    </div>
  );
};

export default TimeRangeToggle;
