import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import BackgroundWithLemons from "../common/BackgroundWithLemons";

const TechniquePreview = ({ technique, onNewTechnique, onClose }) => {
  const navigate = useNavigate();

  if (!technique) return null;

  const handleTryIt = () => {
    navigate(`/techniques/${technique.id}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30">
      <div className="w-full max-w-md">
        <BackgroundWithLemons className="rounded-lg shadow-xl p-4">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-2xl text-gray-800">
              {technique.title}
            </h2>
            <p className="text-gray-600 px-4">{technique.description}</p>
            <div className="flex flex-col gap-3 mt-6">
              <Button variant="lime" onClick={handleTryIt}>
                Try It Now
              </Button>
              <div className="flex gap-3 justify-center">
                <Button onClick={onNewTechnique}>New Technique</Button>
                <Button variant="secondary" onClick={onClose}>
                  Return to Spinner
                </Button>
              </div>
            </div>
          </div>
        </BackgroundWithLemons>
      </div>
    </div>
  );
};

export default TechniquePreview;
