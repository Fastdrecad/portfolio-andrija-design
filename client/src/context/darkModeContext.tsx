import { createContext, ReactNode, useEffect, useState } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  toggle: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggle: () => {}
});

interface DarkModeContextProviderProps {
  children: ReactNode;
}

export const DarkModeContextProvider = ({
  children
}: DarkModeContextProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem('darkMode') || 'false')
  );

  const toggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      <div className={`theme ${darkMode ? 'dark' : 'light'}`}>{children}</div>
    </DarkModeContext.Provider>
  );
};
