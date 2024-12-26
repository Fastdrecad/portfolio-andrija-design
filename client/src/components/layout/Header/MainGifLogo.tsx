import { Link } from "react-router-dom";
import Image from "@/components/common/Image";
import gifLogo from "@/assets/images/am-3d-logo.gif";
import { useRouteName } from "@/context/routeNameContext";
import { formatRouteName } from "@/utils/routeUtils";

const MainGifLogo: React.FC = () => {
  const { setRouteName } = useRouteName();

  const handleClick = (url: string) => {
    const routeName = formatRouteName(url);
    setRouteName(routeName);
  };

  return (
    <Link to="/" onClick={() => handleClick("/")}>
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
