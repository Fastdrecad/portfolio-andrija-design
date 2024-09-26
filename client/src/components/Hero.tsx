import { useContext, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { RedLineIcon } from "./RedLine";
import ScrollToWeb from "./ScrollToWeb ";
import { MenuContext } from "../context/navContext";
import useViewportHeight from "../hooks/useViewportHeight";
import Image from "./Image";

const Hero: React.FC = () => {
  useViewportHeight();
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const isHeroTitleInView = useInView(heroTitleRef);

  const { menuOpen } = useContext(MenuContext);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroContentRef.current) {
      heroContentRef.current.style.zIndex = menuOpen ? "1" : "8";
    }
  }, [menuOpen]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const videoElement = document.getElementById("video");
    if (videoElement) {
      videoElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  };

  return (
    <section className="hero" id="hero">
      <div>
        <div className="hero__wrapper">
          <div className="hero__controller">
            <div className="hero__content" ref={heroContentRef}>
              <Image
                src={"/images/Header-Image.png"}
                alt="Andrija Mićunović at the workplace"
                className="hero__image top"
              />
            </div>

            <motion.div
              className="hero__text"
              ref={heroTitleRef}
              initial={{ x: 250, opacity: 0, filter: "blur(20px)" }}
              animate={
                isHeroTitleInView
                  ? { x: 0, opacity: 1, filter: "blur(0px)" }
                  : {}
              }
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div
                className={`hero__text-wrapper ${
                  isHeroTitleInView ? "side-in" : ""
                }`}
              >
                <div className="hero__heading">
                  <h1 className="heading-title">
                    Andrija<strong>Mićunović</strong>
                  </h1>
                  <motion.div className="red-line-wrapper">
                    <div className="red-line-placeholder">
                      {isHeroTitleInView && <RedLineIcon delay={0.4} />}
                    </div>
                  </motion.div>
                </div>
                <AnimatedText text="Product Design | Development | Rendering" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <ScrollToWeb scrollTo={scrollTo} />
    </section>
  );
};

export default Hero;
