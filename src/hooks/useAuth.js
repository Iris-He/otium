import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setIsEmailConfirmed(!!session.user.email_confirmed_at);
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

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
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setIsEmailConfirmed(true); // Reset for next user
      return true; // Indicate successful sign-out
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isEmailConfirmed,
    loading,
    handleSignIn,
    handleProceedAsGuest,
    handleSignOut,
  };
};
