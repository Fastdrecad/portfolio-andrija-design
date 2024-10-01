import { useState, useEffect } from "react";

export const useWindowResize = (initialWidth = 1200) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > initialWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > initialWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialWidth]);

  return isDesktop;
};
