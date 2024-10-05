import { useEffect } from "react";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import AnimatedDots from "@/components/animations/AnimatedDots";

interface PageTransitionProps {
  children: React.ReactNode;
}

// Utility function to create reusable transition objects
// const createTransition = (
//   duration: number,
//   ease: number[] = [0.25, 1, 0.5, 1]
// ) => ({
//   duration,
//   ease
// });

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { currentRoute } = useSelector((state: RootState) => state.route);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div
        className="slide-in-red"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      >
        <motion.div
          className="slide-page-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="page-slide-title-content">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Customize as needed */}
              {currentRoute.slice(1)}
            </motion.p>
            {/* Add any additional components like <AnimatedDots /> */}
            <AnimatedDots />
          </div>
        </motion.div>

        <motion.div
          className="slide-in-black"
          initial={{ x: "-100%", scaleX: 1 }}
          animate={{
            x: "0%",
            scaleX: [1, 0.0015]
          }}
          transition={{
            delay: 0.1,
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1]
          }}
          exit={{ scaleX: 1 }}
        ></motion.div>
      </motion.div>
      <motion.div
        className="slide-out-black"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      ></motion.div>
      {children}
    </>
  );
};

export default PageTransition;
