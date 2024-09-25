import { useEffect } from "react";

const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);
};

export default useViewportHeight;
