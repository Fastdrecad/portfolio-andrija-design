import { Target, Transition } from "framer-motion";

export interface PageTransitionProps {
  children: React.ReactNode;
}

export interface TransitionConfig {
  duration: {
    enter: number;
    exit: number;
  };
  ease: [number, number, number, number];
}

export interface CustomVariant {
  initial: Target;
  animate: Target;
  exit?: Target;
  transition?: Transition;
}

export interface TransitionVariants {
  slideInRed: CustomVariant;
  slidePageName: CustomVariant;
  slideInBlack: CustomVariant;
  slideOutBlack: CustomVariant;
  pageTitle: CustomVariant;
}

export type TransitionType = "slide" | "fade" | "none";

export interface RouteTransitionConfig {
  path: string;
  useTransition: boolean;
  transitionType: TransitionType;
}
