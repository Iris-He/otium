import { useEffect, useRef } from "react";
import { createTickSound } from "../utils/soundEffects";

export const useTickSound = () => {
  const playTick = () => {
    createTickSound();
  };

  return { playTick };
};
