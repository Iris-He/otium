import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./components/AppContent";
import { Toaster } from "react-hot-toast";

function App() {
  const [platform, setPlatform] = useState(null);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Detect platform and installation status
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone;
    const alreadyPrompted = localStorage.getItem("pwaPrompted");

    setPlatform(isIOSDevice ? "ios" : isAndroid ? "android" : null);

    // Handle Android install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    if (isAndroid) {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    // Show install prompt if not standalone, not already prompted, and not in PWA mode
    if (
      (isIOSDevice || isAndroid) &&
      !isStandalone &&
      !alreadyPrompted &&
      !window.matchMedia("(display-mode: standalone)").matches
    ) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 5000);
      return () => {
        clearTimeout(timer);
        if (isAndroid) {
          window.removeEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
          );
        }
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (platform === "android" && installPromptEvent) {
      installPromptEvent.prompt();
      const { outcome } = await installPromptEvent.userChoice;
      if (outcome === "accepted") {
        localStorage.setItem("pwaPrompted", "true");
      }
    }
    setShowInstallPrompt(false);
    localStorage.setItem("pwaPrompted", "true");
  };
  return (
    <Router>
      {/* Status bar spacer for iOS */}
      <div className="fixed top-0 left-0 right-0 h-[env(safe-area-inset-top)] bg-white/60 z-50"></div>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 2000,
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <AppContent />
        {showInstallPrompt && (
          <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg shadow-sm max-w-xs mx-4 border border-gray-200">
              <p className="text-sm mb-1">
                Add to home screen for quick access
              </p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={handleInstallClick}
                  className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded"
                >
                  {platform === "ios" ? "Show Instructions" : "Install"}
                </button>
                <button
                  onClick={() => {
                    setShowInstallPrompt(false);
                    localStorage.setItem("pwaPrompted", "true");
                  }}
                  className="text-xs text-gray-500"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </div>
        )}
      </AuthProvider>
    </Router>
  );
}

export default App;
