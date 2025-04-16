import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "../common/Button";
import { GiCutLemon } from "react-icons/gi";

const Footer = ({ onViewInsights }) => {
  const { user } = useAuthContext();
  const showInsights = user && !user.isGuest;

  return (
    <footer className="w-full py-4 text-center relative z-10 mt-8 sm:mt-4 bg-transparent">
      {showInsights && (
        <div className="mb-4 relative z-20">
          <Button
            onClick={onViewInsights}
            variant="insights"
            className="py-2 px-4 text-sm flex items-center justify-center space-x-2 font-medium text-gray-500 mx-auto max-w-[200px]"
          >
            <GiCutLemon className="h-5 w-5" />
            <span>My Insights</span>
          </Button>
        </div>
      )}
      <p className="text-gray-500 text-sm mx-auto">
        Turning life's lemons into sweet moments of calm
      </p>
    </footer>
  );
};

export default Footer;
