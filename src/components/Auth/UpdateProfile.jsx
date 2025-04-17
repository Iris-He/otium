import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../common/Button";
import supabase from "../../lib/supabaseClient";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName },
      });

      if (error) throw error;

      toast.success("Username updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Failed to update username");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-serif text-center mb-6">
          Update Username
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="New Username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Username"}
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
    </div>
  );
};

export default UpdateProfile;
