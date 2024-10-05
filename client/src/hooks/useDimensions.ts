import { useEffect, useState } from "react";

export const useDimension = () => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const updateWindowDimensions = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowDimensions();

    const handleResize = () => {
      updateWindowDimensions();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function: Remove the "no-scroll" class when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimension;
};
