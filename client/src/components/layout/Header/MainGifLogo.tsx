import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCurrentRoute } from "@/redux/routeSlice";

import Image from "@/components/common/Image";

import gifLogo from "@/assets/images/am-3d-logo.gif";

const MainGifLogo: React.FC = () => {
  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <Link to="/" onClick={() => handleNavLinkClick("/")}>
      <div className="main-logo__icon-wrapper">
        <Image
          src={gifLogo}
          alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
          className=""
        />
      </div>
    </Link>
  );
};

export default MainGifLogo;
