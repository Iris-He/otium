import React from "react";

const Instructions = ({ instructions }) => (
  <div className="space-y-1">
    {instructions?.map((instruction, i) => (
      <p key={i} className="text-xs sm:text-sm text-gray-400">
        {instruction}
      </p>
    ))}
  </div>
);

export default Instructions;
