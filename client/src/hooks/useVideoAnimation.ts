import { useRef } from "react";

import { useInView } from "framer-motion";

export const useVideoAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const animation = {
    initial: { y: -200, opacity: 0 },
    animate: isInView ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 },
    transition: { duration: 1.8, ease: "easeOut" }
  };

  return { ref, animation };
};
