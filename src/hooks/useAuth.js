import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleProceedAsGuest = () => {
    setUser({ isGuest: true });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    handleSignIn,
    handleProceedAsGuest,
    handleSignOut,
  };
};
