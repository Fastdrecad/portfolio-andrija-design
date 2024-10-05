/* Main navigation for all screen sizes */
import ToggleSwitch from "@/components/common/ToggleSwitch";
import MainGifLogo from "@/components/layout/Header/MainGifLogo";
import Navigation from "@/components/layout/Header/Navigation";

interface MobileHeaderProps {
  navClass: string;
  isChecked: boolean;
  toggle: () => void;
  isDesktop?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  navClass,
  isDesktop,
  isChecked,
  toggle
}) => {
  return (
    <nav
      className={`mobile-header ${navClass} ${
        isDesktop && navClass === "top" ? "hidden" : ""
      }`}
    >
      <div className="mobile-header__container">
        <MainGifLogo />
        <div className="mobile-header__nav-content">
          <Navigation />
          <ToggleSwitch />
        </div>
        <label className="mobile-header__hamburger-menu">
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
  );
};

export default MobileHeader;
