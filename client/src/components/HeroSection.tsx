import ImageKit from "./ImageKit";
import useViewportHeight from "../hooks/useViewportHeight";

const HeroSection: React.FC = () => {
  useViewportHeight();

  return (
    <div className="hero-section">
      <div className="hero-section__profile-image">
        <div className="hero-section__profile-image-inner">
          {/* <img
            src={"/images/andrija-about.png"}
            alt="Andrija Designer"
            loading="lazy"
            // srcSet={`
            //       ${myImage480} 480w,
            //       ${myImage800} 800w,
            //       ${myImage1200} 1200w
            //     `}
            sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
          /> */}
          <ImageKit
            path="/images/andrija-about-page.png"
            alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
            transformation={[{ width: "900" }, { height: "900" }]}
          />
        </div>
      </div>
      <div className="hero-section__content">
        <div className="hero-section__background">
          <ImageKit
            path="/images/about-hero.jpg"
            alt="3D CAD drawings and technical modeling of furniture designs, showcasing precision and detail in the design process."
          />
          {/* <img
            src={aboutHero480}
            srcSet={`
                  ${aboutHero480} 480w,
                  ${aboutHero800} 800w,
                  ${aboutHero1200} 1200w
                `}
            sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
            alt="furniture drafting"
            className="hero-section__background-image"
            loading="lazy"
          /> */}
        </div>
        <div className="hero-section__triangle"></div>
      </div>
    </div>
  );
};

export default HeroSection;
