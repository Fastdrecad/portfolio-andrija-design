import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const defaultAnimations: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1
    }
  }
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
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
};

export default AnimatedText;
