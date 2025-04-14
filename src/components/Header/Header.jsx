import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import Button from "../common/Button";

const Header = ({ onSignOut, onViewInsights }) => {
  const { user } = useAuthContext();
  const displayName = user?.isGuest
    ? "guest"
    : user?.user_metadata?.display_name ||
      user?.identities?.[0]?.identity_data?.full_name ||
      "User";
  const showSignOut = user && !user.isGuest;
  const showInsights = user && !user.isGuest;

  return (
    <header className="mb-8">
      {/* Mobile layout (flex-col) for small screens, row layout for larger screens */}
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center mb-4 relative">
        {/* Container for greeting and buttons */}
        <div className="flex justify-between items-center w-full sm:absolute sm:left-0 sm:right-0">
          {user && (
            <span className="px-4 py-2 text-sm text-gray-700">
              Hello, {displayName}
            </span>
          )}
          {showSignOut && (
            <div className="flex space-x-2 px-4">
              {showInsights && (
                <Button
                  onClick={onViewInsights}
                  variant="secondary"
                  className="py-1 px-3 text-xs"
                >
                  My Insights
                </Button>
              )}
              <button
                onClick={onSignOut}
                className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
        {/* Title centered on both layouts */}
        <h1 className="font-serif text-4xl text-gray-800 text-center mt-4 sm:mt-0">
          Lemonaid
        </h1>
      </div>
      <div className="text-center">
        <p className="text-gray-500">
          When life gives you lemons, make lemonade 🍋
        </p>
      </div>
    </header>
  );
};

export default Header;
