import { motion, useReducedMotion } from "framer-motion";

import AnimatedDots from "@/components/animations/AnimatedDots";
import { transitionVariants } from "./animations";
import { PageTransitionProps } from "./types";
import { useRouteTransition } from "@/hooks/useRouteTransition";
import { useRouteName } from "@/context/routeNameContext";

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const { shouldUseTransition, transitionType } = useRouteTransition();
  const { currentRouteName } = useRouteName();

  // If reduced motion is preferred or route doesn't use transition, render children directly
  if (shouldReduceMotion || !shouldUseTransition || transitionType === "none") {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div className="slide-in-red" {...transitionVariants.slideInRed}>
        <motion.div
          className="slide-page-name"
          {...transitionVariants.slidePageName}
        >
          <div className="page-slide-title-content">
            <motion.p {...transitionVariants.pageTitle}>
              {currentRouteName}
            </motion.p>
            <AnimatedDots />
          </div>
        </motion.div>

        <motion.div
          className="slide-in-black"
          {...transitionVariants.slideInBlack}
        />
      </motion.div>
      <motion.div
        className="slide-out-black"
        {...transitionVariants.slideOutBlack}
      />
      {children}
    </>
  );
};

export default PageTransition;
