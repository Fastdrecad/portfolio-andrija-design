import { useEffect, useState } from "react";

const useParallaxScroll = (elementId: string, speed: number = 0.35) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    const parallax = document.getElementById(elementId);
    window.addEventListener("scroll", handleScroll);

    if (parallax) {
      parallax.style.backgroundPositionY = `${offsetY * speed}px`;
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetY, elementId, speed]);
};

export default useParallaxScroll;
