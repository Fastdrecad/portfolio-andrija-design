import { useContext, useEffect, useRef } from "react";

import { MenuContext } from "@/context/navContext";

import useViewportHeight from "@/hooks/useViewportHeight";
import useScrollToVideo from "@/hooks/useScrollToVideo";

import HeroImage from "@/components/home/HeroSection/HeroImage";
import HeroHeading from "@/components/home/HeroSection/HeroHeading";
import ScrollToWeb from "@/components/home/HeroSection/ScrollToWeb ";

const Hero: React.FC = () => {
  useViewportHeight();
  const scrollToVideo = useScrollToVideo();

  const { menuOpen } = useContext(MenuContext);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Update z-index based on menu state
  useEffect(() => {
    if (heroContentRef.current) {
      heroContentRef.current.style.zIndex = menuOpen ? "1" : "8";
    }
  }, [menuOpen]);

  return (
    <section className="hero" id="hero">
      <div className="hero__wrapper">
        <div className="hero__controller">
          <div className="hero__content" ref={heroContentRef}>
            <HeroImage />
          </div>
          <HeroHeading />
        </div>
      </div>
      <ScrollToWeb scrollTo={scrollToVideo} />
    </section>
  );
};

export default Hero;
