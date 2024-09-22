import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../redux/store';
import AnimatedDots from './AnimatedDots';

const pageTransition = (OriginalComponent: React.FC) => {
  const PageTransitionComponent: React.FC = () => {
    const currentRoute = useSelector((state: RootState) => state.route.current);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <>
        <motion.div
          className='slide-in-red'
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 0
          }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.div
            className='slide-page-name'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 1
            }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className='page-slide-title-content'>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {currentRoute.slice(1)}
              </motion.p>
              <AnimatedDots />
            </div>
          </motion.div>
          <motion.div
            className='slide-in-black'
            initial={{ x: '-100%', scaleX: 1 }}
            animate={{
              x: '0%',
              scaleX: [1, 0.0015]
            }}
            transition={{
              delay: 0.1,
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1]
            }}
            exit={{ scaleX: 1 }}
          ></motion.div>
        </motion.div>
        <motion.div
          className='slide-out-black'
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: 0
          }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        ></motion.div>

        <OriginalComponent />
      </>
    );
  };

  return PageTransitionComponent;
};

export default pageTransition;
