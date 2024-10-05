/* Fixed desktop header for screens larger than 1200px */
import { Link } from "react-router-dom";

import MainGifLogo from "@/components/layout/Header/MainGifLogo";
import Navigation from "@/components/layout/Header/Navigation";
import ToggleSwitch from "@/components/common/ToggleSwitch";
import { setCurrentRoute } from "@/redux/routeSlice";
import { useDispatch } from "react-redux";

interface DesktopHeaderProps {
  navClass: string;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ navClass }) => {
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <nav className={`desktop-header ${navClass}`}>
      <div className="desktop-header__logo-container">
        <MainGifLogo />
      </div>
      <div className="desktop-header__switch">
        <ToggleSwitch />
      </div>
      <div className="desktop-header__link-name">
        <Link to="/" onClick={() => handleNavLinkClick("/")}>
          <h2 className="desktop-header__link-name-main">
            Andrija<span>Mićunović</span>
          </h2>
        </Link>
      </div>
      <h1 className="desktop-header__subtitle">
        Furniture & Product Design | 2D/3D CAD | Rendering
      </h1>
      <Navigation />
    </nav>
  );
};

export default DesktopHeader;
