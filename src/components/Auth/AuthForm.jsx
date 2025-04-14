import React from "react";
import Button from "../common/Button";

const AuthForm = ({
  isSignUp,
  formData,
  error,
  onSubmit,
  onInputChange,
  onToggleSignUp,
  onProceedAsGuest,
}) => {
  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label htmlFor="displayName" className="sr-only">
              User Name
            </label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              value={formData.displayName || ""}
              onChange={onInputChange}
              placeholder="User Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required={isSignUp}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
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

        <div aria-hidden="true" className="hidden">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={formData.email}
            onChange={onInputChange}
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
            onChange={onInputChange}
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

        <Button type="submit" className="w-full">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={onToggleSignUp}
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
    </>
  );
};

export default AuthForm;
