import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { links } from '../utils/constants';
import { setCurrentRoute } from '../redux/routeSlice';

const Navigation: React.FC = () => {
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <nav className='navigation'>
      <ul className='navigation__menu-list'>
        {links.map((link) => {
          const { id, text, url } = link;
          return (
            <li className='navigation__menu-list-item' key={id}>
              <NavLink
                key={id}
                to={url}
                className='navigation__link'
                onClick={() => handleNavLinkClick(url)}
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
