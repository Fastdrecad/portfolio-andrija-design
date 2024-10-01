import React, { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";

import AnimatedDots from "@/components/animations/AnimatedDots";

// Utility function to create reusable transition objects
const createTransition = (
  duration: number,
  ease: number[] = [0.25, 1, 0.5, 1]
) => ({
  duration,
  ease
});

// HOC that adds page transition animations
const pageTransition = (OriginalComponent: React.FC) => {
  // Wrapped component to apply transition
  const PageTransitionComponent: React.FC = () => {
    // Access the current route from Redux store to display the current page name during the transition
    const { currentRoute } = useSelector((state: RootState) => state.route);

    const isPortfolioDetailPage = useMemo(() => {
      const portfolioPathRegex = /^\/portfolio\/[^/]+$/;
      return portfolioPathRegex.test(currentRoute);
    }, [currentRoute]);

    // On every route change, scroll the window to the top
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    // Memoize the current route name to avoid unnecessary re-renders
    const routeName = useMemo(() => {
      if (currentRoute === "/") {
        return "home";
      }
      return typeof currentRoute === "string"
        ? currentRoute.slice(1)
        : "Unknown Route";
    }, [currentRoute]);

    return (
      <>
        {/* Red sliding transition that appears first */}
        <motion.div
          className="slide-in-red"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={isPortfolioDetailPage ? undefined : { scaleX: 1 }}
          transition={isPortfolioDetailPage ? undefined : createTransition(0.4)}
        >
          {/* Display current page name with a fade-in animation */}
          <motion.div
            className="slide-page-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={isPortfolioDetailPage ? undefined : { opacity: 1 }}
            transition={
              isPortfolioDetailPage
                ? undefined
                : createTransition(0.6, [0.25, 1, 0.5, 1])
            }
          >
            <div className="page-slide-title-content">
              {/* Display the current route name */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {routeName}
              </motion.p>
              {/* Animated dots */}
              <AnimatedDots />
            </div>
          </motion.div>

          {/* Black sliding transition */}
          <motion.div
            className="slide-in-black"
            initial={{ x: "-100%", scaleX: 1 }}
            animate={{ x: "0%", scaleX: [1, 0.0015] }}
            transition={
              isPortfolioDetailPage
                ? undefined
                : createTransition(0.8, [0.25, 1, 0.5, 1])
            }
            exit={isPortfolioDetailPage ? undefined : { scaleX: 1 }}
          />
        </motion.div>

        {/* Black slide-out transition */}
        <motion.div
          className="slide-out-black"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={isPortfolioDetailPage ? undefined : { scaleX: 0 }}
          transition={isPortfolioDetailPage ? undefined : createTransition(0.4)}
        />

        {/* Render the original component passed to the HOC */}
        <OriginalComponent />
      </>
    );
  };

  // Memoize the entire HOC to avoid unnecessary re-renders
  return React.memo(PageTransitionComponent);
};

export default pageTransition;
