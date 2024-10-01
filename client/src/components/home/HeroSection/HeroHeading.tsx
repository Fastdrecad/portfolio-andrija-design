import { useRef } from "react";

import { motion, useInView } from "framer-motion";

import RedLine from "@/components/common/RedLine";
import AnimatedText from "@/components/animations/AnimatedText";

const HeroHeading: React.FC = () => {
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const isHeroTitleInView = useInView(heroTitleRef);

  return (
    <motion.div
      className="hero__text"
      ref={heroTitleRef}
      initial={{ x: 250, opacity: 0, filter: "blur(20px)" }}
      animate={
        isHeroTitleInView ? { x: 0, opacity: 1, filter: "blur(0px)" } : {}
      }
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div
        className={`hero__text-wrapper ${isHeroTitleInView ? "side-in" : ""}`}
      >
        <div className="hero__heading">
          <RedLine
            iconVariant="center"
            isVisible={isHeroTitleInView}
            delay={0.6}
          >
            <h1 className="heading-title">
              Andrija<strong>Mićunović</strong>
            </h1>
          </RedLine>
        </div>
        <AnimatedText text="Product Design | Development | Rendering" />
      </div>
    </motion.div>
  );
};

export default HeroHeading;
