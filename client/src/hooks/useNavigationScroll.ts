import { useState, useEffect } from "react";

export const useScrollHandler = () => {
  const [navClass, setNavClass] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown =
        currentScrollY > lastScrollY && currentScrollY > 100;

      if (currentScrollY <= 70) {
        setNavClass("top");
      } else if (isScrollingDown) {
        setNavClass("hidden");
      } else {
        setNavClass("scrolled-up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return navClass;
};
