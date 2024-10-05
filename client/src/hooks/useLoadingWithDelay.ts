import { useEffect, useState } from "react";

const useLoadingWithDelay = (
  loadingDuration: number,
  additionalDelay: number
) => {
  const [isLoadingWithDelay, setIsLoadingWithDelay] = useState(true);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout | null = null;

    // Start loading duration
    const loadingTimer = setTimeout(() => {
      // Start additional delay timer
      delayTimer = setTimeout(() => {
        setIsLoadingWithDelay(false);
      }, additionalDelay);
    }, loadingDuration);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      clearTimeout(loadingTimer);
    };
  }, [loadingDuration, additionalDelay]);

  useEffect(() => {
    // Manage scroll behavior during loading and additional delay
    if (isLoadingWithDelay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoadingWithDelay]);

  return isLoadingWithDelay;
};

export default useLoadingWithDelay;
