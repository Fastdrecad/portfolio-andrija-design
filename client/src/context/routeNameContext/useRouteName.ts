import { useContext } from "react";
import { RouteNameContext } from "./routeNameContext";

export const useRouteName = () => {
  const context = useContext(RouteNameContext);
  if (!context) {
    throw new Error("useRouteName must be used within a RouteNameProvider");
  }
  return context;
};
