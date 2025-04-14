import React, { useState } from "react";
import SocialButtons from "./SocialButtons";
import Divider from "./Divider";
import AuthForm from "./AuthForm";
import supabase from "../../lib/supabaseClient";

const Auth = ({ onProceedAsGuest, onSignIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              display_name: formData.displayName,
            },
          },
        });

        if (error) throw error;
        onSignIn(data.user);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        onSignIn(data.user);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        onSignIn(data.user);
      }
    } catch (error) {
      setError("Failed to sign in with Google");
      console.error(error);
    }
  };

  // const handleAppleSignIn = async () => {
  //   try {
  //     // Supabase Apple Authentication:
  //     // const { data, error } = await supabase.auth.signInWithOAuth({
  //     //   provider: 'apple',
  //     //   options: {
  //     //     redirectTo: window.location.origin,
  //     //   }
  //     // });
  //     //
  //     // if (error) throw error;
  //     //
  //     // if (data.user) {
  //     //   onSignIn(data.user);
  //     // }

  //     console.log("Apple sign in clicked");
  //   } catch (error) {
  //     setError("Failed to sign in with Apple");
  //   }
  // };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-serif text-center mb-6">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>

      <SocialButtons
        onGoogleSignIn={handleGoogleSignIn}
        // onAppleSignIn={handleAppleSignIn}
      />
      <Divider />
      <AuthForm
        isSignUp={isSignUp}
        formData={formData}
        error={error}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onToggleSignUp={() => setIsSignUp(!isSignUp)}
        onProceedAsGuest={onProceedAsGuest}
      />
    </div>
  );
};

export default Auth;
