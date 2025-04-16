import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import groundingTechniques from "../../data/groundingTechniques";
import Dropdown from "../common/Dropdown";
import { getFavoriteTechniques } from "../../lib/supabaseClient";
import { RiLeafFill } from "react-icons/ri";

const Spinner = ({
  onSpin,
  rotationDegree,
  spinning,
  onSelectTechnique,
  dropdownValue,
  setDropdownValue,
}) => {
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
      } else {
        // For guests, only show all techniques
        const allOptions = groundingTechniques.map((technique) => ({
          value: technique.id.toString(),
          label: technique.title,
        }));

        setGroupedTechniques({
          all: allOptions,
        });
      }
    };

    loadTechniques();
  }, [user]);

  const handleSelectTechnique = (value) => {
    onSelectTechnique(value);
    setDropdownValue(""); // Reset after selection
  };

  return (
    <div className="flex flex-col items-center mb-8 sm:mb-4">
      <div className="relative w-64 h-64 mb-4">
        {/* Wheel Background */}
        <div
          className="absolute w-full h-full rounded-full overflow-hidden"
          style={{
            transform: `rotate(${rotationDegree}deg)`,
            transition: spinning
              ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)"
              : "none",
            background: `url('/lemon.png')`,
            backgroundSize: "285% 155%",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Center Button */}
        <button
          className="absolute top-1/2 left-1/2 w-20 h-20 -mt-10 -ml-10 rounded-full bg-white bg-opacity-40 border-none shadow-md flex items-center justify-center cursor-pointer transition-shadow font-serif text-gray-600 text-lg disabled:cursor-not-allowed disabled:opacity-70"
          onClick={onSpin}
          disabled={spinning}
        >
          <span>Spin</span>
        </button>

        {/* Lemon Indicator */}
        <div
          className="absolute top-0 left-1/2 -ml-4 text-2xl"
          style={{ filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.15))" }}
        >
          <RiLeafFill className="text-lime-400 text-3xl rotate-90" />
        </div>
      </div>

      {/* Dropdown */}
      <div className="w-full max-w-xs mt-4 mb-4 sm:mb-0">
        <Dropdown
          groupedOptions={groupedTechniques}
          onChange={handleSelectTechnique}
          placeholder="Or choose a technique..."
          className="w-full"
          value={dropdownValue}
        />
      </div>
    </div>
  );
};

export default Spinner;
