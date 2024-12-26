import Image from "@/components/common/Image";

import aboutHero from "@/assets/images/about-hero.jpg";
import aboutProfileImg from "@/assets/images/andrija-about-page.webp";

const AboutHeroSection: React.FC = () => {
  return (
    <div className="about-hero-section">
      <div className="about-hero-section__profile-image">
        <div className="about-hero-section__profile-image-inner">
          <Image
            src={aboutProfileImg}
            alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
            loading="eager"
            useLoader={false}
            className="about-profile-image"
          />
        </div>
      </div>
      <div className="about-hero-section__content">
        <div className="about-hero-section__background">
          <Image
            src={aboutHero}
            alt="3D CAD drawings and technical modeling of furniture designs, showcasing precision and detail in the design process."
            loading="eager"
            useLoader={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;
