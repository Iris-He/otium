import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../common/Button";
import supabase from "../../lib/supabaseClient";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      toast.success("Password updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-serif text-center mb-6">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-yellow-600 hover:text-yellow-500 text-sm w-full"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
