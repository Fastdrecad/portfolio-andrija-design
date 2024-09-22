import AboutSection from "@components/AboutSection";
import HeroSection from "@components/HeroSection";
import pageTransition from "@components/pageTransition";
import { useEffect } from "react";

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | Andrija Mićunović Design";
    return () => {
      document.title = "Default Title";
    };
  }, []);

  return (
    <article className="about-page">
      <HeroSection />
      <AboutSection />
    </article>
  );
};

const AboutPageWithTransition = pageTransition(AboutPage);

export default AboutPageWithTransition;
