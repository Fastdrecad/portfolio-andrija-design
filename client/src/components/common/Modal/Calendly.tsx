import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { BsXLg } from "react-icons/bs";

interface CalendlyProps {
  onClose: () => void;
}

const Calendly: React.FC<CalendlyProps> = ({ onClose }) => {
  return (
    <motion.div
      className="calendly"
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 1,
        delayChildren: 0.3,
        staggerChildren: 0.05
      }}
    >
      <div className="calendly__close-btn-container">
        <button className="calendly__close-button" onClick={onClose}>
          <BsXLg />
        </button>
      </div>
      <div className="calendly__modal">
        <div className="calendly__modal-wrapper">
          <InlineWidget url="https://calendly.com/andrijas-micun/zakazite-sastanak-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default Calendly;
