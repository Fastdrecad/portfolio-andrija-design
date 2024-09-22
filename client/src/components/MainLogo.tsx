import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoIcon } from "./common/Icons";
import { setCurrentRoute } from "../redux/routeSlice";

const MainLogo: React.FC = () => {
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <Link to="/" onClick={() => handleNavLinkClick("/")}>
      <div className="main-logo__icon-wrapper">
        <LogoIcon />
      </div>
    </Link>
  );
};

export default MainLogo;
