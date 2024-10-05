import { Variants } from "framer-motion";

export const slideUp: Variants = {
  initial: { top: 0 },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};

export const textVariants: Variants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export const pathVariants: Variants = {
  initial: {
    pathLength: 0
  },
  visible: {
    pathLength: 1,
    transition: { duration: 2, ease: "easeInOut" }
  }
};
