import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "../redux/routeSlice";
import Image from "./Image";

const MainLogo: React.FC = () => {
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <Link to="/" onClick={() => handleNavLinkClick("/")}>
      <div className="main-logo__icon-wrapper">
        <Image
          src={"/images/am-3d-logo.gif"}
          alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
          className=""
        />
      </div>
    </Link>
  );
};

export default MainLogo;
