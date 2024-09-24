import { useState, useEffect, useContext } from "react";
import { MenuContext } from "../context/navContext";
import { Link } from "react-router-dom";
import { setCurrentRoute } from "../redux/routeSlice";
import { useDispatch } from "react-redux";
import ToggleSwitch from "./ToggleSwitch";
import Navigation from "./Navigation";
import MainLogo from "./MainLogo";

const Header: React.FC = () => {
  const { toggle, isChecked } = useContext(MenuContext);
  const dispatch = useDispatch();

  const [navClass, setNavClass] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

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

  return (
    <header className={`header ${navClass === "hidden" ? "hidden" : ""}`}>
      <nav className={`header__main ${navClass}`}>
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

      <nav className="header__desktop-fixed">
        <div
          className=""
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
    </header>
  );
};

export default Header;
