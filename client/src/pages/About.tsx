import useDocumentTitle from "@/hooks/useDocumentTitle";

import { AboutDetailsSection, AboutHeroSection } from "@/components/about";
import pageTransition from "@/components/animations/pageTransition";
import SEO from "@/components/common/seo/SEO";
import JsonLd from "@/components/common/seo/JsonLd";

const About: React.FC = () => {
  useDocumentTitle("About");

  return (
    <>
      <SEO
        title="About | Andrija Mićunović - Furniture Designer & 3D Artist"
        description="Learn more about Andrija Mićunović, a skilled furniture and product designer, and 3D artist."
        url="https://www.portfolio.andrijadesign.com/about"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com/about"
      />

      <JsonLd pageType="about" pageData={null} />

      <article className="about-page">
        <AboutHeroSection />
        <AboutDetailsSection />
      </article>
    </>
  );
};

const AboutPageWithTransition = pageTransition(About);
export default AboutPageWithTransition;
