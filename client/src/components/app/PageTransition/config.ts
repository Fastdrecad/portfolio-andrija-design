import { RouteTransitionConfig } from "./types";

export const routeTransitionConfig: RouteTransitionConfig[] = [
  {
    path: "/",
    useTransition: true,
    transitionType: "slide"
  },
  {
    path: "/design-process",
    useTransition: true,
    transitionType: "slide"
  },
  {
    path: "/about",
    useTransition: true,
    transitionType: "slide"
  },
  {
    path: "/contact",
    useTransition: true,
    transitionType: "slide"
  },
  {
    path: "/portfolio",
    useTransition: true,
    transitionType: "slide"
  },
  {
    path: "/portfolio/:slug",
    useTransition: false,
    transitionType: "none"
  },
  {
    path: "/success",
    useTransition: false,
    transitionType: "none"
  },
  {
    path: "/admin",
    useTransition: false,
    transitionType: "none"
  }
];
