import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioModal } from "@/hooks/usePortfolioModal";
import PortfolioModalContent from "./PortfolioModalContent";

interface PortfolioModalProps {
  projectId: string;
}

const PortfolioModal = ({ projectId }: PortfolioModalProps) => {
  const { handleClose } = usePortfolioModal();

  return (
    <AnimatePresence mode="wait">
      {projectId && (
        <motion.div
          key={projectId}
          className="modal-overlay"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
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
            <PortfolioModalContent
              projectId={projectId}
              onClose={handleClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioModal;
