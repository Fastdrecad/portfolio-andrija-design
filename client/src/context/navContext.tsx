import { createContext, useState, ReactNode, useEffect } from "react";

interface MenuContextType {
  menuOpen: boolean;
  toggle: () => void;
  isChecked: boolean;
}

export const MenuContext = createContext<MenuContextType>({
  menuOpen: false,
  toggle: () => {},
  isChecked: false
});

interface MenuContextProviderProps {
  children: ReactNode;
}

export const MenuContextProvider: React.FC<MenuContextProviderProps> = ({
  children
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    // Add or remove the no-scroll class based on the menuOpen state
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to remove no-scroll when component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  const toggle = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    setIsChecked((prevIsChecked) => !prevIsChecked);
  };

  return (
    <MenuContext.Provider value={{ menuOpen, toggle, isChecked }}>
      {children}
    </MenuContext.Provider>
  );
};
