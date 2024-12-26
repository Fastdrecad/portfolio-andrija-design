import { createContext } from "react";

interface RouteNameContextType {
  currentRouteName: string;
  setRouteName: (name: string) => void;
}

export const RouteNameContext = createContext<RouteNameContextType | undefined>(
  undefined
);
