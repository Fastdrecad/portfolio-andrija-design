import { useEffect, useLayoutEffect, useState } from "react";

import { Variants, motion } from "framer-motion";

interface LoaderProps {
  active: boolean;
}

const slideUp = {
  initial: {
    top: 0
  },
  exit: {
    top: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};

const textVariants: Variants = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const pathVariants: Variants = {
  initial: {
    pathLength: 0
  },
  visible: {
    pathLength: 1,

    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  }
};

const Loader: React.FC<LoaderProps> = ({ active }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useLayoutEffect(() => {
    const updateWindowDimensions = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowDimensions();

    const handleResize = () => {
      updateWindowDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate 50% of the viewport height
  const heightPercentage = 20; // Adjust this value as needed
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  const offset = (vh * heightPercentage) / 100;

  // Update the paths with the calculated offset
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + offset} 0 ${
    dimension.height
  }  L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div
      className={`loader ${active ? "active" : ""}`}
      variants={slideUp}
      initial="initial"
      exit="exit"
    >
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
              style={{ fill: "#222" }}
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
