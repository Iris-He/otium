import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import groundingTechniques from "../../data/groundingTechniques";
import Dropdown from "../common/Dropdown";
import { getFavoriteTechniques } from "../../lib/supabaseClient";
import { RiLeafFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Spinner = ({
  onSpin,
  rotationDegree,
  spinning,
  dropdownValue,
  setDropdownValue,
  onSelectTechnique, // Add this prop
}) => {
  const { user } = useAuthContext();
  const [groupedTechniques, setGroupedTechniques] = useState(null);
  const navigate = useNavigate();

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

  const handleSelectTechnique = (techniqueId) => {
    if (!techniqueId) {
      setDropdownValue?.("");
      return;
    }

    const technique = groundingTechniques.find(
      (t) => t.id === parseInt(techniqueId)
    );

    if (technique) {
      setDropdownValue?.(techniqueId);
      onSelectTechnique?.(technique);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4 sm:mb-8">
      {/* Reduce spinner size on mobile */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-2 sm:mb-4">
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

        {/* Center Button - adjust size for mobile */}
        <button
          className="absolute top-1/2 left-1/2 w-16 h-16 sm:w-20 sm:h-20 -mt-8 -ml-8 sm:-mt-10 sm:-ml-10 rounded-full bg-white bg-opacity-40 border-none shadow-md flex items-center justify-center cursor-pointer transition-shadow font-serif text-gray-600 text-base sm:text-lg disabled:cursor-not-allowed disabled:opacity-70"
          onClick={onSpin}
          disabled={spinning}
        >
          <span>Spin</span>
        </button>

        {/* Lemon Indicator - adjust size for mobile */}
        <div
          className="absolute top-0 left-1/2 -ml-3 sm:-ml-4 w-6 h-6 sm:w-8 sm:h-8"
          style={{
            backgroundImage: "url('/indicator.png')",
            backgroundSize: "550% 145%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.15))",
          }}
        />
      </div>

      {/* Dropdown - adjust width for mobile */}
      <div className="w-full max-w-[250px] sm:max-w-xs mt-2 sm:mt-4">
        <Dropdown
          groupedOptions={groupedTechniques}
          onChange={handleSelectTechnique}
          placeholder="Or choose a technique..."
          className="w-full"
          value={dropdownValue || ""}
          key={dropdownValue}
        />
      </div>
    </div>
  );
};

export default Spinner;
