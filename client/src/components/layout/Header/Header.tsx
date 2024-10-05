import { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { MenuContext } from "@/context/navContext";

import { useScrollHandler } from "@/hooks/useNavigationScroll";

import DesktopHeader from "@/components/layout/Header/DesktopHeader";
import MobileHeader from "@/components/layout/Header/MobileHeader";
import { useLocation } from "react-router-dom";
import { useDimension } from "@/hooks/useDimensions";

const Header: React.FC = () => {
  const { toggle, isChecked } = useContext(MenuContext);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { calendly, youtube, project } = useSelector(
    (state: RootState) => state.modal
  );
  const isAnyModalOpen = calendly || youtube || project !== null;

  const navClass = useScrollHandler(); // Get scroll state from useScrollHandler hook
  const { width } = useDimension(); // Get viewport width from useDimension hook

  // Determine visibility of headers
  const showDesktopHeader = isHomePage && width > 1200;

  const [activeHeader, setActiveHeader] = useState<"desktop" | "mobile">(
    isHomePage ? "desktop" : "mobile"
  );

  useEffect(() => {
    setActiveHeader(isHomePage ? "desktop" : "mobile");
  }, [isHomePage]);

  if (isAnyModalOpen) {
    return null;
  }

  return (
    <header className="header">
      <MobileHeader navClass={navClass} isChecked={isChecked} toggle={toggle} />

      <div
        className={`header__desktop ${
          activeHeader === "desktop" && showDesktopHeader
            ? "header--visible"
            : "header--hidden"
        }`}
      >
        <DesktopHeader navClass={navClass} />
      </div>
    </header>
  );
};

export default Header;
