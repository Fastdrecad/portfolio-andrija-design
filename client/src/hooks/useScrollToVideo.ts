import { useCallback } from "react";

// Use React.MouseEvent instead of MouseEvent
const useScrollToVideo = () => {
  const scrollToVideo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const videoElement = document.getElementById("video");
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;

      if (videoElement) {
        const videoPosition =
          videoElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;
        window.scrollTo({ top: videoPosition, behavior: "smooth" });
      }
    },
    []
  );

  return scrollToVideo; // Return the function directly
};

export default useScrollToVideo;
