import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { HiOutlineLogout } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";

const Header = ({ onSignOut }) => {
  const { user } = useAuthContext();
  const displayName = user?.isGuest
    ? "guest"
    : user?.user_metadata?.display_name ||
      user?.identities?.[0]?.identity_data?.full_name ||
      "User";
  const showSignOut = user && !user.isGuest;
  const showSignIn = user?.isGuest;

  return (
    <header className="mb-8 px-4">
      <div className="flex flex-row flex-wrap justify-between items-center mb-4 relative gap-2">
        {/* User greeting */}
        <div className="flex-shrink-0">
          {user && (
            <span className="text-base text-gray-700">
              Hello, {displayName}
            </span>
          )}
        </div>

        {/* Sign in/out buttons */}
        <div className="flex-shrink-0">
          {showSignOut && (
            <button
              onClick={onSignOut}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors min-w-[40px]"
              aria-label="Sign out"
            >
              <HiOutlineLogout className="h-5 w-5" />
            </button>
          )}
          {showSignIn && (
            <button
              onClick={onSignOut}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Sign in"
            >
              <HiOutlineLogin className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="font-serif text-4xl text-gray-800 mb-4">Lemonaid</h1>
        <p className="text-gray-500">
          When life gives you lemons, make lemonade 🍋
        </p>
      </div>
    </header>
  );
};

export default Header;
