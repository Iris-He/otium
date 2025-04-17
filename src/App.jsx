import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./components/AppContent";
import { Toaster } from "react-hot-toast";

function App() {
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
      </AuthProvider>
    </Router>
  );
}

export default App;
