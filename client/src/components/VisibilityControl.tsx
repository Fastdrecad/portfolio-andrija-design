import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VisibilityControl: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  useEffect(() => {
    if (
      location.pathname !== '/' &&
      location.pathname !== '/portfolio' &&
      location.pathname !== '/design-process' &&
      location.pathname !== '/about' &&
      location.pathname !== '/contact' &&
      location.pathname !== '/success'
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <>{showNavbar && children}</>;
};

export default VisibilityControl;
