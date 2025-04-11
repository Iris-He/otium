import React from "react";

const Header = ({ user }) => {
  return (
    <header className="mb-8 text-center">
      <h1 className="font-serif text-4xl text-gray-800 mb-2">Lemonaid</h1>
      <p className="text-gray-500 text-base">
        When life gives you lemons, make lemonade
      </p>
      {user && !user.isGuest && (
        <p className="text-sm text-yellow-600 mt-2">
          Signed in as {user.email}
        </p>
      )}
    </header>
  );
};

export default Header;
