import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useCallback, useRef } from "react";
import { useModal } from "./useModal";

export const usePortfolioModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { closeModal } = useModal();
  const isInitialMount = useRef(true);
  const scrollPosition = useRef(0);

  const handleClose = useCallback(() => {
    // Store current scroll position before navigation
    scrollPosition.current = window.scrollY;

    // Get the selected tab from the current location state
    const selectedTab = location.state?.selectedTab || "all";

    // Always navigate to /portfolio when closing modal
    navigate("/portfolio", {
      state: {
        scrollY: scrollPosition.current,
        isModalNavigation: true,
        selectedTab // Preserve the selected tab
      }
    });

    closeModal();
  }, [navigate, closeModal, location.state?.selectedTab]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleClose]);

  // Restore scroll position when navigating back
  useEffect(() => {
    if (location.state?.scrollY !== undefined) {
      window.scrollTo(0, location.state.scrollY);
    }
  }, [location.state?.scrollY]);

  return {
    handleClose
  };
};
