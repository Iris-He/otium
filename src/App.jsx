import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./components/AppContent";
import { Toaster } from "react-hot-toast";

function App() {
  const [isIOS, setIsIOS] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Detect iOS
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );

    // Show install prompt for iOS after delay
    if (isIOS) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isIOS]);
  return (
    <Router>
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
          <div className="fixed bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-white text-black p-4 rounded-lg shadow-lg max-w-md mx-4">
              <p className="mb-2">Install Lemonaid for a better experience:</p>
              <p>
                Tap <span className="font-bold">Share</span> then "Add to Home
                Screen"
              </p>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="mt-2 text-blue-500"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </AuthProvider>
    </Router>
  );
}

export default App;
