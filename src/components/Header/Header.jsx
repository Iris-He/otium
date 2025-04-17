import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { HiOutlineLogin } from "react-icons/hi";
import { GoShare } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = ({ onSignOut }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    // Detect platform
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    setIsIOS(isIOSDevice);

    if (isInstalled) {
      setShowInstallButton(false);
      return;
    }

    // Handle Android install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    if (!isIOSDevice) {
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    } else {
      // Show install button for iOS only if not installed
      setShowInstallButton(true);
    }
  }, []);

  // Add listener for display mode changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e) => {
      if (e.matches) {
        setShowInstallButton(false);
      }
    };

    mediaQuery.addListener(handleDisplayModeChange);
    return () => mediaQuery.removeListener(handleDisplayModeChange);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
    } else if (deferredPrompt) {
      const result = await deferredPrompt.prompt();
      if (result.outcome === "accepted") {
        setShowInstallButton(false);
      }
      setDeferredPrompt(null);
    }
  };
  const { user } = useAuthContext();
  const displayName = user?.isGuest
    ? "guest"
    : user?.user_metadata?.display_name ||
      user?.identities?.[0]?.identity_data?.full_name ||
      "User";
  const showSignIn = user?.isGuest;
  const showUserMenu = user && !user.isGuest;

  return (
    <header className="mb-8 px-4 pt-[env(safe-area-inset-top)]">
      <div className="flex flex-row flex-wrap justify-between items-center mb-4 relative gap-2">
        <div className="flex-shrink-0">
          {user && (
            <span className="text-base text-gray-700">
              Hello, {displayName}
            </span>
          )}
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          {showInstallButton && (
            <>
              <button
                onClick={handleInstallClick}
                className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-full transition-colors border border-yellow-200"
                aria-label="Install app"
              >
                Install
              </button>

              {showIOSInstructions && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
                  <div className="w-full max-w-sm rounded bg-white p-6">
                    <h2 className="font-bold text-lg mb-2">
                      Add to Home Screen
                    </h2>
                    <div className="text-gray-700 mb-4">
                      To install this app:
                      <ol className="list-decimal pl-5 mt-2 space-y-2">
                        <li>Open the app in Safari</li>
                        <li>
                          Tap the{" "}
                          <GoShare className="inline-block h-4 w-4 align-text-bottom" />{" "}
                          button
                        </li>
                        <li>Scroll to select "Add to Home Screen"</li>
                        <li>Confirm by tapping "Add"</li>
                      </ol>
                    </div>
                    <button
                      onClick={() => setShowIOSInstructions(false)}
                      className="w-full py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          {showUserMenu && <UserMenu user={user} onSignOut={onSignOut} />}
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
