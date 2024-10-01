// Hook for managing the loader state.
// Ensures that the loader is visible for a minimum of the specified duration.
// Cleans up the timer to avoid memory leaks.
import { useEffect, useState } from "react";

const useLoading = (initialLoad: boolean, duration: number) => {
  const [loaded, setLoaded] = useState<boolean>(initialLoad);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
      // Reset the cursor and scroll position once the loader is hidden.
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, duration);

    return () => clearTimeout(timer); // Cleanup function to prevent timers from accumulating.
  }, [duration]);

  return loaded;
};

export default useLoading;
