import { createContext } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggle: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggle: () => {}
});
