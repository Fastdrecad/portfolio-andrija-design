import { useContext } from "react";
import { NavLink } from "react-router-dom";

import Socials from "@/components/layout/Socials";
import { MenuContext } from "@/context/navContext";
import { links } from "@/data";
import { formatRouteName } from "@/utils/routeUtils";
import { useRouteName } from "@/context/routeNameContext";

const Sidebar: React.FC = () => {
  const { toggle, menuOpen } = useContext(MenuContext);
  const { setRouteName } = useRouteName();

  const handleNavClick = (url: string) => {
    toggle();
    const routeName = formatRouteName(url);
    setRouteName(routeName);
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
                  onClick={() => handleNavClick(url)}
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
