import useDocumentTitle from "@/hooks/useDocumentTitle";

import { Hero } from "@/components/home/HeroSection";
import { Video } from "@/components/home/VideoSection";
import { LatestWorks } from "@/components/home/LatestWorksSection";
import { TimeIsNow } from "@/components/home/TimeIsNowSection";
import { Testimonials } from "@/components/home/TestimonialsSection";
import pageTransition from "@/components/animations/pageTransition";
import SEO from "@/components/common/seo/SEO";
import JsonLd from "@/components/common/seo/JsonLd";

const Home: React.FC = () => {
  useDocumentTitle("Andrija Mićunović Design");

  return (
    <>
      <SEO
        title="Home | Andrija Mićunović - Furniture Designer & 3D Artist"
        description="Explore top-tier Furniture Design and 3D Rendering services by Andrija Mićunović."
        url="https://www.portfolio.andrijadesign.com"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com"
      />

      <JsonLd pageType="home" pageData={null} />

      <main className="home-sections">
        <Hero />
        <Video />
        <LatestWorks />
        <TimeIsNow />
        <Testimonials />
      </main>
    </>
  );
};

const HomeWithTransition = pageTransition(Home);
export default HomeWithTransition;
