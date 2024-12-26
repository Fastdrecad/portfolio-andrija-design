import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { MenuContext } from "@/context/navContext";
import { selectModalType, selectIsModalOpen } from "@/redux/modalSlice";

import { useScrollHandler } from "@/hooks/useNavigationScroll";
import { useDimension } from "@/hooks/useDimensions";

import DesktopHeader from "@/components/layout/Header/DesktopHeader";
import MobileHeader from "@/components/layout/Header/MobileHeader";

const Header: React.FC = () => {
  const { toggle, isChecked } = useContext(MenuContext);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const modalType = useSelector(selectModalType);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isAnyModalOpen = isModalOpen && modalType !== null;

  const navClass = useScrollHandler();
  const { width } = useDimension();

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
