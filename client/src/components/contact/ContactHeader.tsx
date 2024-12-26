import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import RedLine from "@/components/common/RedLine";

const ContactHeader: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="contact-header"
    >
      <div className="contact-header__title-container" ref={titleRef}>
        <div className="contact-header__title-content">
          <RedLine iconVariant="center" isVisible={isTitleInView}>
            <h2>Contact Me</h2>
          </RedLine>
        </div>
        <p className="contact-header__form-subtitle">Let’s work together</p>
      </div>
    </motion.div>
  );
};

export default ContactHeader;
