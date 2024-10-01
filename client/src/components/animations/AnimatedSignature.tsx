import { SVGProps } from "react";

import { motion, Transition } from "framer-motion";

import { useInView } from "react-intersection-observer";

const LETTERS_PATHS = [
  "M4.80371 365.71L150.555 221.358L240.97 126.914L163.885 287.695",
  "M249.41 134.466C245.994 148.758 235.502 186.93 220.87 225.278C206.239 263.627 187.293 310.823 179.649 329.628",
  "M162.802 331.366C162.802 331.366 155.819 341.313 162.286 345.531C168.753 349.749 193.147 336.197 217.057 313.615C235.367 296.32 252.543 272.798 252.693 254.89C252.837 237.638 245.643 228.712 232.137 222.347C207.017 210.509 183.75 211.884 158.165 219.792C133.544 227.402 119.159 232.446 93.0301 242.175C56.9838 255.596 0.999918 279.201 0.999918 279.201L151.48 225.024C151.48 225.024 275.952 179.109 278.356 180.88C280.76 182.651 270.846 200.244 273.97 201.174C283.043 203.879 293.365 183.956 297.768 176.593C293.154 185.572 289.254 192.04 293.065 194.8C296.408 197.221 300.533 193.884 303.865 190.691C307.196 187.498 315.386 172.506 315.386 172.506C313.346 176.258 306.372 186.252 311.422 189.569C314.081 191.316 317.596 188.825 319.573 186.51C323.295 182.15 325.042 176.682 327.18 170.046C326.132 175.853 325.119 187.445 329.445 187.365C333.772 187.285 338.492 176.97 340.312 171.823C339.723 175.064 339.504 181.472 343.338 181.179C347.171 180.886 349.351 175.732 348.663 170.557C350.171 176.656 359.834 191.471 371.007 195.582C389.941 202.551 407.441 200.854 424.894 191.084C442.59 181.179 451.374 164.249 459.281 145.964",
  "M228.41 302.283C228.41 302.283 234.781 305.211 239.006 305.299"
];

const AnimatedSignature = (props: SVGProps<SVGSVGElement>) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 }
  };

  const pathTransition = (index: number): Transition => ({
    pathLength: { delay: index * 1.25, type: "tween", duration: 1.25 },
    opacity: { delay: index * 1.25, duration: 0.01 }
  });

  return (
    <svg
      ref={ref}
      // width={461}
      // height={426}
      viewBox="0 0 461 426"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "100%", minHeight: "100px" }}
      {...props}
    >
      <motion.g id="signature">
        {LETTERS_PATHS.map((path, idx) => (
          <motion.path
            key={idx}
            id="Vector"
            d={path}
            stroke="black"
            strokeWidth="4"
            custom={idx}
            variants={pathVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={pathTransition(idx)}
          />
        ))}
      </motion.g>
    </svg>
  );
};

export default AnimatedSignature;
