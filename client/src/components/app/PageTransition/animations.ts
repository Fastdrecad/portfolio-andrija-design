import { Transition } from "framer-motion";
import { TransitionConfig, TransitionVariants } from "./types";

export const transitionConfig: TransitionConfig = {
  duration: {
    enter: 0.4,
    exit: 0.4
  },
  ease: [0.25, 1, 0.5, 1]
};

const defaultTransition: Transition = {
  duration: transitionConfig.duration.exit,
  ease: transitionConfig.ease
};

export const transitionVariants: TransitionVariants = {
  slideInRed: {
    initial: { scaleX: 0 },
    animate: { scaleX: 0 },
    exit: { scaleX: 1 },
    transition: defaultTransition
  },
  slidePageName: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { ...defaultTransition, delay: 0.5, duration: 0.6 }
  },
  slideInBlack: {
    initial: { x: "-100%", scaleX: 1 },
    animate: {
      x: "0%",
      scaleX: 0.0015
    },
    exit: { scaleX: 1 },
    transition: { ...defaultTransition, delay: 0.1, duration: 0.8 }
  },
  slideOutBlack: {
    initial: { scaleX: 1 },
    animate: { scaleX: 0 },
    exit: { scaleX: 0 },
    transition: defaultTransition
  },
  pageTitle: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: defaultTransition
  }
};
