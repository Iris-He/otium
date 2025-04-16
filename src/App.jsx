import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import Header from "./components/Header/Header";
import UpdateProfile from "./components/Auth/UpdateProfile";
import UpdatePassword from "./components/Auth/UpdatePassword";
import UpdateEmail from "./components/Auth/UpdateEmail";
import MainContent from "./components/MainContent";
import { Toaster } from "react-hot-toast";

function App() {
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
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { user, isEmailConfirmed } = useAuthContext();

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user || (user && !user.isGuest && !isEmailConfirmed)) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div className="relative min-h-screen w-full bg-[url('/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="absolute inset-0 bg-white/60">
        <div className="relative flex flex-col min-h-screen w-full text-gray-700 font-sans">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route
              path="/update-profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-email"
              element={
                <ProtectedRoute>
                  <UpdateEmail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
