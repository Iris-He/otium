import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsEmailConfirmed(!!session.user.email_confirmed_at);
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsEmailConfirmed(!!session.user.email_confirmed_at);
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = (userData) => {
    setIsEmailConfirmed(!!userData.email_confirmed_at);
    setUser(userData);
  };

  const handleProceedAsGuest = () => {
    setUser({ isGuest: true });
    setIsEmailConfirmed(true); // Guests don't need email confirmation
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsEmailConfirmed(true); // Reset for next user
  };

  return {
    user,
    isAuthenticated: !!user,
    isEmailConfirmed,
    handleSignIn,
    handleProceedAsGuest,
    handleSignOut,
  };
};
