import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setCurrentRoute } from "@/redux/routeSlice";
import { RootState } from "@/redux/store";
import { MenuContext } from "@/context/navContext";

import { useWindowResize } from "@/hooks/useWindowResize";
import { useScrollHandler } from "@/hooks/useNavigationScroll";

import DesktopHeader from "@/components/layout/Header/DesktopHeader";
import MobileHeader from "@/components/layout/Header/MobileHeader";

const Header: React.FC = () => {
  const { toggle, isChecked } = useContext(MenuContext);
  const dispatch = useDispatch();
  const { calendly, youtube, project } = useSelector(
    (state: RootState) => state.modal
  );

  const isAnyModalOpen = calendly || youtube || project !== null;

  const isDesktop = useWindowResize(1200);
  const navClass = useScrollHandler();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  if (isAnyModalOpen) {
    return null;
  }

  return (
    <header className="header">
      <MobileHeader
        isDesktop={isDesktop}
        navClass={navClass}
        isChecked={isChecked}
        toggle={toggle}
      />

      {isDesktop && (
        <DesktopHeader
          navClass={navClass}
          handleNavLinkClick={handleNavLinkClick}
        />
      )}
    </header>
  );
};

export default Header;
