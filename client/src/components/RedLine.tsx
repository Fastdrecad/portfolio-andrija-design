import { motion, SVGMotionProps } from "framer-motion";

interface RedLineIconProps extends SVGMotionProps<SVGSVGElement> {
  delay?: number;
}

export const RedLineIcon: React.FC<RedLineIconProps> = ({
  delay = 0,
  ...props
}) => {
  return (
    <motion.svg
      viewBox="0 0 97 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <motion.path
        d="M5 6.59001C6.46 6.29001 8.79 5.86001 11.67 5.52001C33.61 2.94001 45.21 10.78 63.66 11.68C70.07 11.99 79.55 11.57 91.34 7.68001"
        stroke="#ED2024"
        strokeWidth={10}
        strokeMiterlimit={10}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: delay }}
      />
    </motion.svg>
  );
};
