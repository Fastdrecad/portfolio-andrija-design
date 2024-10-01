import { motion } from "framer-motion";

import { defaultAnimations } from "@/components/animations/variants/animatedText";
import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = React.memo(
  ({ text, className }) => {
    return (
      <p className={className}>
        <span className="visually-hidden">{text}</span>
        <motion.span
          aria-hidden
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delay: 4 }}
        >
          {text.split(" ").map((word, i) => (
            <span key={i} style={{ display: "inline-block" }}>
              {word.split("").map((char, i) => (
                <motion.span key={i} variants={defaultAnimations}>
                  {char}
                </motion.span>
              ))}
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            </span>
          ))}
        </motion.span>
      </p>
    );
  }
);

export default AnimatedText;
