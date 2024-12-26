import React from "react";
import { motion, SVGMotionProps } from "framer-motion";

type IconVariant = "start" | "center" | "end";

interface RedLineProps extends SVGMotionProps<SVGSVGElement> {
  delay?: number;
  stroke?: string;
  strokeWidth?: number;
  iconVariant?: IconVariant; // Controls the alignment of the red line
  children: React.ReactNode; // Accepts elements like h1, h2, p, etc.
  isVisible: boolean; // Controls the visibility of the red line
}

const RedLine: React.FC<RedLineProps> = ({
  delay = 0,
  stroke = "#ED2024",
  strokeWidth = 10,
  iconVariant = "center", // Default to center variant
  children,
  isVisible,
  ...props
}) => {
  // Return the correct flex alignment based on the iconVariant
  const alignItems = () => {
    switch (iconVariant) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      default:
        return "center";
    }
  };

  return (
    <div className="redline-wrapper" style={{ alignItems: alignItems() }}>
      <div className="redline-content">{children}</div>
      <div className="redline-placeholder">
        <motion.svg
          viewBox="0 0 97 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="redline-svg"
          {...props}
        >
          <motion.path
            d="M5 6.59001C6.46 6.29001 8.79 5.86001 11.67 5.52001C33.61 2.94001 45.21 10.78 63.66 11.68C70.07 11.99 79.55 11.57 91.34 7.68001"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeMiterlimit={10}
            strokeLinecap="round"
            initial={{
              pathLength: 0,
              opacity: 0
            }}
            animate={{
              pathLength: isVisible ? 1 : 0,
              opacity: isVisible ? 1 : 0
            }}
            transition={{
              pathLength: { duration: 1, ease: "easeInOut", delay },
              opacity: { duration: 0.1, delay }
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default React.memo(RedLine);
