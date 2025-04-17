import React, { useState, useRef, useEffect } from "react";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { MdEmail, MdLock } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

const UserMenu = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await onSignOut();
      setIsOpen(false); // Close the menu
      navigate("/auth", { replace: true }); // Force a replace navigation
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="User menu"
      >
        <HiOutlineUser className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <Link
              to="/profile"
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <HiOutlineUser className="h-4 w-4" />
              Update Username
            </Link>
            <Link
              to="/profile/email"
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <MdEmail className="h-4 w-4" />
              Update Email
            </Link>
            <Link
              to="/profile/password"
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <MdLock className="h-4 w-4" />
              Update Password
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <HiOutlineLogout className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
