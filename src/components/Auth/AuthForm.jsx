import React, { useState } from "react";
import Button from "../common/Button";
import supabase from "../../lib/supabaseClient";

const AuthForm = ({
  isSignUp,
  formData,
  error,
  onSubmit,
  onInputChange,
  onToggleSignUp,
  onProceedAsGuest,
}) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/update-password`,
        }
      );

      if (error) throw error;
      setResetEmailSent(true);
    } catch (error) {
      alert(error.message);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="space-y-4">
        {resetEmailSent ? (
          <div className="text-center">
            <p className="mb-4">
              Check your email for the password reset link.
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setIsForgotPassword(false);
                setResetEmailSent(false);
              }}
              className="w-full"
            >
              Return to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="text-yellow-600 hover:text-yellow-500 text-sm w-full"
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="space-y-4 md:space-y-6 max-w-md mx-auto"
      >
        {isSignUp && (
          <div>
            <input
              id="displayName"
              type="text"
              name="displayName"
              value={formData.displayName || ""}
              onChange={onInputChange}
              placeholder="User Name"
              className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required={isSignUp}
            />
          </div>
        )}

        <div>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
            autoComplete="username"
          />
        </div>

        <div>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={onInputChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
        </div>

        {isSignUp && (
          <div>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
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

        {!isSignUp && (
          <div className="flex flex-row justify-between items-center gap-2">
            <Button type="submit" className="w-full mb-0">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Button
              type="submit"
              onClick={() => setIsForgotPassword(true)}
              className="w-full mb-0"
            >
              Forgot Password?
            </Button>
          </div>
        )}

        {!isSignUp && (
          <Button
            variant="lime"
            onClick={onToggleSignUp}
            className="w-full mt-0 text-sm"
          >
            Don't have an account? <span className="font-medium">Sign up</span>
          </Button>
        )}
      </form>

      {!isSignUp && (
        <div className="mt-4 mb-4 sm:mt-6">
          <Button
            variant="secondary"
            onClick={onProceedAsGuest}
            className="w-full text-sm"
          >
            Continue as Guest
          </Button>
        </div>
      )}
    </>
  );
};

export default AuthForm;
