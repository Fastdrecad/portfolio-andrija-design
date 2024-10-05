import { useEffect, useState } from "react";

const useLoading = (initialLoad: boolean, duration: number) => {
  const [loaded, setLoaded] = useState<boolean>(initialLoad);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
      window.scrollTo(0, 0);
    }, duration);

    return () => clearTimeout(timer); // Cleanup function to prevent timers from accumulating.
  }, [duration]);

  return loaded;
};

export default useLoading;
