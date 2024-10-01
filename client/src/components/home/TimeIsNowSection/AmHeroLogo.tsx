import React, { useRef } from "react";

import { motion, useInView } from "framer-motion";

import { AmHeroBanner } from "@/components/common/AmHeroBanner";

const AmHeroLogo: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(logoRef, { once: true });

  return (
    <motion.div
      className="time-is-now__logo-container"
      ref={logoRef}
      initial={{ scale: 0, opacity: 0, filter: "blur(20px)", rotate: 360 }}
      animate={
        isInView ? { scale: 1, opacity: 1, filter: "blur(0px)", rotate: 0 } : {}
      }
      transition={{ duration: 0.5 }}
    >
      <AmHeroBanner />
    </motion.div>
  );
};

export default React.memo(AmHeroLogo);
