import useViewportHeight from "../hooks/useViewportHeight";
import Image from "./Image";

const HeroSection: React.FC = () => {
  useViewportHeight();

  return (
    <div className="hero-section">
      <div className="hero-section__profile-image">
        <div className="hero-section__profile-image-inner">
          <Image
            src={"/images/andrija-about-page.png"}
            alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
          />
        </div>
      </div>
      <div className="hero-section__content">
        <div className="hero-section__background">
          <div className="shadow"></div>
          <Image
            src={"/images/about-hero.jpg"}
            alt="3D CAD drawings and technical modeling of furniture designs, showcasing precision and detail in the design process."
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
