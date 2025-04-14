import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import groundingTechniques from "../../data/groundingTechniques";
import Dropdown from "../common/Dropdown";
import { getFavoriteTechniques } from "../../lib/supabaseClient";

const Spinner = ({ onSpin, rotationDegree, spinning, onSelectTechnique }) => {
  const { user } = useAuthContext();
  const [groupedTechniques, setGroupedTechniques] = useState(null);

  useEffect(() => {
    const loadTechniques = async () => {
      if (user && !user.isGuest) {
        const favorites = await getFavoriteTechniques(user.id);

        const favoritesOptions = favorites.map((fav) => ({
          value: fav.technique_id.toString(),
          label: fav.technique_name,
        }));

        const allOptions = groundingTechniques.map((technique) => ({
          value: technique.id.toString(),
          label: technique.title,
        }));

        setGroupedTechniques({
          favorites: favoritesOptions,
          all: allOptions,
        });
      }
    };

    loadTechniques();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-8">
        {/* Wheel Background */}
        <div
          className="absolute w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-yellow-50 shadow-md"
          style={{
            transform: `rotate(${rotationDegree}deg)`,
            transition: spinning
              ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
          }}
        >
          {/* Wheel Segments */}
          {groundingTechniques.map((technique, index) => {
            const segmentAngle = 360 / groundingTechniques.length;
            const rotation = index * segmentAngle;

            return (
              <div
                key={technique.id}
                className="absolute w-2 h-2 rounded-full bg-yellow-400 opacity-60"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${rotation}deg) translateX(120px) translateY(-50%)`,
                  marginLeft: "-4px", // Half of the width to center
                  marginTop: "-4px", // Half of the height to center
                }}
              />
            );
          })}
        </div>

        {/* Center Button */}
        <button
          className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-white border-none shadow-md flex items-center justify-center cursor-pointer transition-shadow font-serif text-gray-600 text-lg disabled:cursor-not-allowed disabled:opacity-70"
          onClick={onSpin}
          disabled={spinning}
        >
          <span>Spin</span>
        </button>

        {/* Indicator */}
        <div className="absolute top-0 left-1/2 -ml-2 w-4 h-8 bg-orange-500 rounded-b-full" />
      </div>

      {/* Technique Selector - only show for authenticated users */}
      {user && !user.isGuest && (
        <div className="w-64 mb-8">
          <p className="text-sm text-gray-500 mb-2 text-center">
            Or choose a specific technique:
          </p>
          <Dropdown
            groupedOptions={groupedTechniques}
            onChange={onSelectTechnique}
            placeholder="Choose a technique"
          />
        </div>
      )}
    </div>
  );
};

export default Spinner;
