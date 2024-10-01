import { Variants } from "framer-motion";

export const defaultAnimations: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1
    }
  }
};
