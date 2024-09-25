import { useContext } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { links } from "../utils/constants";
import { MenuContext } from "../context/navContext";
import { setCurrentRoute } from "../redux/routeSlice";
import Socials from "./Socials";

const Sidebar: React.FC = () => {
  const { toggle, menuOpen } = useContext(MenuContext);
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${menuOpen ? "sidebar--show" : ""}`}>
        <ul className="sidebar__links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id} className="sidebar__item">
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                  }
                  onClick={() => {
                    toggle();
                    handleNavLinkClick(url);
                  }}
                >
                  {text}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Socials containerStyles="social-icons" iconStyles="icon-style" />
      </div>
    </div>
  );
};

export default Sidebar;
