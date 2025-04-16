import React, { useState } from "react";
import SocialButtons from "./SocialButtons";
import Divider from "./Divider";
import AuthForm from "./AuthForm";
import ResetPassword from "./ResetPassword";
import Button from "../common/Button";
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
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

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

        if (error) {
          setError(error.message);
          return;
        }

        setConfirmationSent(true);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        if (!data.user.email_confirmed_at) {
          setError("Please confirm your email before signing in");
          return;
        }

        onSignIn(data.user);
      }
    } catch (error) {
      setError(error.message || "An error occurred during authentication");
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

  if (confirmationSent) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-serif text-center mb-6">
          Check Your Email
        </h2>
        <p className="text-center text-gray-600 mb-4">
          We've sent a confirmation link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setConfirmationSent(false);
            setIsSignUp(false);
          }}
          className="w-full"
        >
          Return to Sign In
        </Button>
      </div>
    );
  }

  if (isForgotPassword) {
    return <ResetPassword onBackToSignIn={() => setIsForgotPassword(false)} />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-serif text-center mb-6">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h2>

      <AuthForm
        isSignUp={isSignUp}
        formData={formData}
        error={error}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onToggleSignUp={() => setIsSignUp(!isSignUp)}
        onProceedAsGuest={onProceedAsGuest}
        setIsForgotPassword={setIsForgotPassword}
      />

      {!isForgotPassword && (
        <>
          <Divider className="mt-6" />
          <SocialButtons onGoogleSignIn={handleGoogleSignIn} className="mb-6" />
        </>
      )}
    </div>
  );
};

export default Auth;
