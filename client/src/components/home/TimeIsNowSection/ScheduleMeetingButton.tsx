import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Button from "@/components/common/Button";

interface ScheduleMeetingButtonProps {
  handleOpen: () => void;
  loading: boolean;
}

const ScheduleMeetingButton: React.FC<ScheduleMeetingButtonProps> = ({
  handleOpen,
  loading
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(buttonRef, { once: true });

  return (
    <motion.div
      ref={buttonRef}
      initial={{ y: 100, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: 0.15, duration: 0.35 }}
    >
      <Button variant="secondary" onClick={handleOpen} loading={loading}>
        {loading ? "SCHEDULING..." : "SCHEDULE A MEETING"}
      </Button>
    </motion.div>
  );
};

export default React.memo(ScheduleMeetingButton);
