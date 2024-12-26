import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../redux/authSlice";

const CHECK_INTERVAL = 60 * 1000; // Check every minute

export const useAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check immediately on mount
    dispatch(checkAuth());

    // Set up periodic checks
    const interval = setInterval(() => {
      dispatch(checkAuth());
    }, CHECK_INTERVAL);

    // Clean up on unmount
    return () => clearInterval(interval);
  }, [dispatch]);
};
