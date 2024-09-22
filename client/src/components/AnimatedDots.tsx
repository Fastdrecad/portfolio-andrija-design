import { motion } from 'framer-motion';

interface DotProps {
  delay: number;
}

const Dot: React.FC<DotProps> = ({ delay }) => {
  return (
    <motion.div
      className='dot-load'
      animate={{
        scale: [1, 1.5, 1],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          delay
        }
      }}
    />
  );
};

const AnimatedDots: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end'
      }}
    >
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </div>
  );
};

export default AnimatedDots;
