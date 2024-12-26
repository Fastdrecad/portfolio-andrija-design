import React, { useState, useCallback } from "react";
import { RouteNameContext } from "./routeNameContext";

export const RouteNameProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentRouteName, setCurrentRouteName] = useState("home");

  const setRouteName = useCallback((name: string) => {
    setCurrentRouteName(name);
  }, []);

  return (
    <RouteNameContext.Provider value={{ currentRouteName, setRouteName }}>
      {children}
    </RouteNameContext.Provider>
  );
};
