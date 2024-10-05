import Image from "@/components/common/Image";

import aboutHero from "@/assets/images/about-hero.jpg";
import aboutProfileImg from "@/assets/images/andrija-about-page.png";

const AboutHeroSection: React.FC = () => {
  return (
    <div className="about-hero-section">
      <div className="about-hero-section__profile-image">
        <div className="about-hero-section__profile-image-inner">
          <Image
            src={aboutProfileImg}
            alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
            loading="eager"
          />
        </div>
      </div>
      <div className="about-hero-section__content">
        <div className="about-hero-section__background">
          <Image
            src={aboutHero}
            alt="3D CAD drawings and technical modeling of furniture designs, showcasing precision and detail in the design process."
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
