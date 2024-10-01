import useViewportHeight from "@/hooks/useViewportHeight";

import Image from "@/components/common/Image";

import aboutHero from "@/assets/images/about-hero.jpg";
import aboutProfileImg from "@/assets/images/andrija-about-page.png";

const AboutHeroSection: React.FC = () => {
  useViewportHeight();

  return (
    <div className="hero-section">
      <div className="hero-section__profile-image">
        <div className="hero-section__profile-image-inner">
          <Image
            src={aboutProfileImg}
            alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
          />
        </div>
      </div>
      <div className="hero-section__content">
        <div className="hero-section__background">
          <Image
            src={aboutHero}
            alt="3D CAD drawings and technical modeling of furniture designs, showcasing precision and detail in the design process."
          />
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
