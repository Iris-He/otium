import React, { useState } from "react";
import Button from "../common/Button";

const Auth = ({ onProceedAsGuest, onSignIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Will be replaced with Supabase auth later
    onSignIn({ email: formData.email });
  };

  const handleGoogleSignIn = async () => {
    try {
      // Will be replaced with Supabase auth later
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: 'google',
      //   options: {
      //     redirectTo: `${window.location.origin}/auth/callback`
      //   }
      // });
      console.log("Google sign in clicked");
    } catch (error) {
      setError("Failed to sign in with Google");
    }
  };

  const handleAppleSignIn = async () => {
    try {
      // Will be replaced with Supabase auth later
      // const { data, error } = await supabase.auth.signInWithOAuth({
      //   provider: 'apple',
      //   options: {
      //     redirectTo: `${window.location.origin}/auth/callback`
      //   }
      // });
      console.log("Apple sign in clicked");
    } catch (error) {
      setError("Failed to sign in with Apple");
    }
  };

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

      {/* Social Sign In Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <button
          onClick={handleAppleSignIn}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.55-2.09-.56-3.24 0-1.44.71-2.23.5-3.08-.35C3.24 15.9 3.9 9.07 8.83 8.7c1.36.07 2.31.82 3.13.82.82 0 2.37-.82 3.97-.7 1.36.12 2.59.68 3.43 1.91-3.19 1.95-2.65 6.22.69 7.55-.59 1.25-1.39 2.39-2.98 3zm-3.26-15.6c-.12 1.86 1.38 3.27 3.01 3.04.17-1.73-1.33-3.25-3.01-3.04z"
            />
          </svg>
          Continue with Apple
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Existing email/password form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
            autoComplete="username"
          />
        </div>

        <div aria-hidden="true" className="hidden">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
        </div>

        {isSignUp && (
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
              autoComplete="new-password"
            />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-yellow-600 hover:text-yellow-500 text-sm"
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
      </div>
      <div className="mt-6">
        <Button
          variant="secondary"
          onClick={onProceedAsGuest}
          className="w-full"
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
};

export default Auth;
