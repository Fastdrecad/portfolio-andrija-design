import { useLocation } from "react-router-dom";
import { routeTransitionConfig } from "@/components/app/PageTransition/config";
import { useSelector } from "react-redux";
import { selectIsModalNavigation } from "@/redux/modalSlice";
import { useMemo } from "react";

export const useRouteTransition = () => {
  const location = useLocation();
  const isModalNavigation = useSelector(selectIsModalNavigation);

  const { shouldUseTransition, transitionType } = useMemo(() => {
    const currentConfig = routeTransitionConfig.find((config) => {
      if (config.path.includes(":")) {
        const pathPattern = new RegExp(
          "^" + config.path.replace(/:[\w-]+/g, "[\\w-]+") + "$"
        );
        return pathPattern.test(location.pathname);
      }
      return config.path === location.pathname;
    });

    // Don't use transition if it's modal navigation or route doesn't have transition
    const shouldUseTransition =
      !isModalNavigation &&
      !location.state?.isModalNavigation &&
      currentConfig?.useTransition;

    return {
      shouldUseTransition,
      transitionType: currentConfig?.transitionType || "none"
    };
  }, [location.pathname, location.state, isModalNavigation]);

  return { shouldUseTransition, transitionType };
};
