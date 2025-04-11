import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleProceedAsGuest = () => {
    setUser({ isGuest: true });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    handleSignIn,
    handleProceedAsGuest,
    handleSignOut
  };
};
