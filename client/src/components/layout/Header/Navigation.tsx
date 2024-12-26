import { NavLink } from "react-router-dom";
import { links } from "@/data";
import { useRouteName } from "@/context/routeNameContext";
import { formatRouteName } from "@/utils/routeUtils";

const Navigation: React.FC = () => {
  const { setRouteName } = useRouteName();

  const handleClick = (url: string) => {
    const routeName = formatRouteName(url);
    setRouteName(routeName);
  };

  return (
    <nav className="navigation">
      <ul className="navigation__menu-list">
        {links.map((link) => {
          const { id, text, url } = link;
          return (
            <li className="navigation__menu-list-item" key={id}>
              <NavLink
                key={id}
                to={url}
                className="navigation__link"
                onClick={() => handleClick(url)}
              >
                {text}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
