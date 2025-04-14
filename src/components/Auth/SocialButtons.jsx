import React from "react";

const SocialButtons = ({ onGoogleSignIn }) => {
  return (
    <div className="space-y-3 mb-6">
      <button
        onClick={onGoogleSignIn}
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

      {/* <button
        onClick={onAppleSignIn}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.55-2.09-.56-3.24 0-1.44.71-2.23.5-3.08-.35C3.24 15.9 3.9 9.07 8.83 8.7c1.36.07 2.31.82 3.13.82.82 0 2.37-.82 3.97-.7 1.36.12 2.59.68 3.43 1.91-3.19 1.95-2.65 6.22.69 7.55-.59 1.25-1.39 2.39-2.98 3zm-3.26-15.6c-.12 1.86 1.38 3.27 3.01 3.04.17-1.73-1.33-3.25-3.01-3.04z"
          />
        </svg>
        Continue with Apple
      </button> */}
    </div>
  );
};

export default SocialButtons;
