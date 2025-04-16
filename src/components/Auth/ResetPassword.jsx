import React, { useState } from "react";
import Button from "../common/Button";
import supabase from "../../lib/supabaseClient";

const ResetPassword = ({ onBackToSignIn }) => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      setResetEmailSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-serif text-center mb-6">Reset Password</h2>

      {resetEmailSent ? (
        <div className="text-center">
          <p className="mb-4">Check your email for the password reset link.</p>
          <Button
            variant="secondary"
            onClick={onBackToSignIn}
            className="w-full"
          >
            Return to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>

          <button
            type="button"
            onClick={onBackToSignIn}
            className="text-yellow-600 hover:text-yellow-500 text-sm w-full"
          >
            Back to Sign In
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
