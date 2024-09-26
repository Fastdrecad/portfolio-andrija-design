import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setCurrentRoute } from "@/redux/routeSlice";
import { MenuContext } from "@/context/navContext";
import MainLogo from "@/components/MainLogo";
import Navigation from "@/components/Navigation";
import ToggleSwitch from "@/components/ToggleSwitch";
import { RootState } from "@/redux/store";

const Header: React.FC = () => {
  const { toggle, isChecked } = useContext(MenuContext);
  const dispatch = useDispatch();
  const { calendly, youtube, project } = useSelector(
    (state: RootState) => state.modal
  );

  const isAnyModalOpen = calendly || youtube || project !== null;

  const [navClass, setNavClass] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1200);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1200);
  };

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown =
        currentScrollY > lastScrollY && currentScrollY > 100;

      if (currentScrollY <= 70) {
        // Always show the navbar if within 70px of the top
        setNavClass("top");
      } else if (isScrollingDown) {
        // Hide navbar when scrolling down beyond 100px
        setNavClass("hidden");
      } else {
        // Show navbar when scrolling up

        setNavClass("scrolled-up");
      }

      // Update last scroll position for next comparison
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, navClass]);

  if (isAnyModalOpen) {
    return null;
  }

  return (
    <header className="header">
      {/* Main navigation for all screen sizes */}
      <nav
        className={`header__main ${navClass} ${
          isDesktop && navClass === "top" ? "hidden" : ""
        }`}
      >
        <div className="header__container">
          <MainLogo />
          <div className="header__nav-content">
            <Navigation />
            <ToggleSwitch />
          </div>
          <label className="header__hamburger-menu">
            <input
              type="checkbox"
              checked={isChecked}
              readOnly
              onClick={() => {
                toggle();
              }}
            />
          </label>
        </div>
      </nav>

      {/* Fixed desktop header for screens larger than 1200px */}
      {isDesktop && (
        <nav className={`header__desktop-fixed ${navClass}`}>
          <div
            style={{
              position: "absolute",
              width: "60px",
              top: "50%",
              transform: "translateY(-50%)",
              left: "50px"
            }}
          >
            <MainLogo />
          </div>
          <div className="header__switch">
            <ToggleSwitch />
          </div>
          <div className="header__link-name">
            <Link to="/" onClick={() => handleNavLinkClick("/")}>
              <h2 className="header__link-name-main">
                Andrija<span>Mićunović</span>
              </h2>
            </Link>
          </div>
          <h1 className="header__subtitle">
            Furniture & Product Design | 2D/3D CAD | Rendering
          </h1>
          <Navigation />
        </nav>
      )}
    </header>
  );
};

export default Header;
