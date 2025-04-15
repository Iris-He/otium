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
    <header className="mb-8">
      {/* Mobile layout (flex-col) for small screens, row layout for larger screens */}
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center mb-4 relative">
        {/* Container for greeting and buttons */}
        <div className="flex flex-col sm:absolute sm:left-0">
          {user && (
            <div className="flex items-center">
              <span className="px-4 py-2 text-sm text-gray-700">
                Hello, {displayName}
              </span>
            </div>
          )}
        </div>
        <div className="sm:absolute sm:right-0">
          {showSignOut && (
            <div className="flex justify-end px-4">
              <button
                onClick={onSignOut}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Sign out"
              >
                <HiOutlineLogout className="h-5 w-5" />
              </button>
            </div>
          )}
          {showSignIn && (
            <div className="flex justify-end px-4">
              <button
                onClick={onSignOut} // This will redirect to sign in form since we're clearing the guest session
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Sign in"
              >
                <HiOutlineLogin className="h-5 w-5" />
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
