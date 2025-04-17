import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import UpdateProfile from "./Auth/UpdateProfile";
import UpdatePassword from "./Auth/UpdatePassword";
import UpdateEmail from "./Auth/UpdateEmail";
import MainContent from "./MainContent";
import Auth from "./Auth/Auth";
import ResetPassword from "./Auth/ResetPassword";
import UserInsights from "./Insights/UserInsights";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, isEmailConfirmed } = useAuthContext();
  if (!user || (user && !user.isGuest && !isEmailConfirmed)) {
    return <Navigate to="/" />;
  }
  return children;
};

function AppContent() {
  return (
    <div className="min-h-screen w-full bg-[url('/background.png')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen w-full bg-white/60 flex flex-col">
        <div className="flex-grow relative w-full text-gray-700 font-sans">
          <Routes>
            <Route path="/" element={<MainContent />} />
            {/* Auth Routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Profile Management Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/email"
              element={
                <ProtectedRoute>
                  <UpdateEmail />
                </ProtectedRoute>
              }
            />

            {/* Insights Route */}
            <Route
              path="/insights"
              element={
                <ProtectedRoute>
                  <UserInsights />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AppContent;
