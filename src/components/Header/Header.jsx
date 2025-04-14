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
      <div className="relative flex justify-center items-center mb-4">
        <span className="absolute left-0 px-4 py-2 text-sm text-gray-700">
          Hello, {displayName}
        </span>
        <h1 className="font-serif text-4xl text-gray-800">Lemonaid</h1>
        {showSignOut && (
          <div className="absolute right-0 flex space-x-2">
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
      <div className="text-center">
        <p className="text-gray-500">
          When life gives you lemons, make lemonade 🍋
        </p>
      </div>
    </header>
  );
};

export default Header;
