import { useState, useCallback } from "react";

export const useFadeIn = () => {
  const [fadeInClass, setFadeInClass] = useState("fadeInnn");

  const resetAnimation = useCallback(() => {
    setFadeInClass("");
    setTimeout(() => setFadeInClass("fadeInnn"), 50);
  }, []);

  return { fadeInClass, resetAnimation };
};
