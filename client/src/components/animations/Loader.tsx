import { motion } from "framer-motion";

import { useDimension } from "@/hooks/useDimensions";

import {
  pathVariants,
  slideUp,
  textVariants
} from "@/components/animations/variants/loaderVariants";

interface LoaderProps {
  active: boolean;
}

const Loader: React.FC<LoaderProps> = ({ active }) => {
  const dimension = useDimension();

  const heightMultiplier = window.innerWidth < 768 ? 2 : 3; // Different heights for mobile and desktop

  // Calculate height based on multiplier
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height * 1.5
  } Q${dimension.width / 2} ${dimension.height * heightMultiplier} 0 ${
    dimension.height * 1.5
  } L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  return (
    <motion.div
      className={`loader ${active ? "active" : ""}`}
      variants={slideUp}
      initial="initial"
      exit="exit"
    >
      {/* Render the SVG logo with a motion path for animation */}
      {dimension.height > 0 && (
        <>
          <svg fill="none" viewBox="0 0 120.5 87">
            <motion.path
              variants={pathVariants}
              initial="initial"
              animate="visible"
              strokeWidth={0.6}
              strokeDasharray="0 1"
              fill="none"
              d="m89.9,19.6l18.2,54.6c2.9,8.6,6,9.9,11.9,9.9v2.4h-35.4v-2.3c6,0,13.5,1.3,10.7-9.4l-18.1-53.3-20.5,65h-1.9l-8.5-26.4h-25.6c-1.9,5.9-4.7,12.8-2.1,19.1,1.8,4.3,3.6,4.8,6.8,5v2.3H.5v-2.3c3.5-.5,5.2-1.4,7.9-4.3,3.1-3.4,6.1-9.6,9.1-18.7l14.7-46.4c-2.1-6.9-4.2-12-10.5-12h-2.3V.5h20.4l21.3,63.1L81,.5h19.3v2.3h-2.3c-9.5,0-12.4,6.5-8.1,16.8h0ZM21.9,56.5h23.2l-11.7-37.3-11.5,37.3h0Z"
            />
          </svg>
          <motion.h1
            variants={textVariants}
            initial="initial"
            animate="visible"
          >
            Andrija Mićunović
          </motion.h1>
          <svg className="curve">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              d={initialPath}
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Loader;
