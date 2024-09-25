import pageTransition from "@components/pageTransition";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentRoute } from "../redux/routeSlice";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Oops! 404 - Page Not Found | Andrija Mićunović Design";
    return () => {
      document.title = "Default Title";
    };
  }, []);
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <div className="not-found">
      <div id="moon">
        <div className="layer layer-1"></div>
        <div className="layer layer-2"></div>
        <div className="layer layer-3"></div>
        <div className="layer layer-4"></div>
        <div className="layer layer-5"></div>
        <div className="layer layer-6"></div>
      </div>
      <div className="not-found-text">
        <h1>
          <strong>404 </strong>
          <br />
          Oops! We can't seem to find the page you're looking for.
        </h1>
        <div>
          <h3>
            You can return to the{" "}
            <NavLink
              to="/design-process"
              onClick={() => handleNavLinkClick("/design-process")}
            >
              Design Process Page
            </NavLink>{" "}
            or explore my{" "}
            <NavLink
              to="/portfolio"
              onClick={() => handleNavLinkClick("/portfolio")}
            >
              Portfolio
            </NavLink>
          </h3>
          <div className="button-wrapper">
            <NavLink to="/" onClick={() => handleNavLinkClick("/")}>
              Go Back
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotFoundWithTransition = pageTransition(NotFound);

export default NotFoundWithTransition;
