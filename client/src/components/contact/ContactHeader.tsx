import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import contactImage from "../../assets/images/andrija-about-page.webp";

import RedLine from "@/components/common/RedLine";
import Image from "@/components/common/Image";

const ContactHeader: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="contact-header contact-form__container"
    >
      <div className="contact-header__title-container" ref={titleRef}>
        <div className="contact-header__title-content">
          <RedLine iconVariant="center" isVisible={isTitleInView}>
            <h2>Contact Me</h2>
          </RedLine>
        </div>

        <div
          style={{
            textTransform: "none",
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px"
          }}
        >
          <span style={{ display: "block", fontSize: "4rem", lineHeight: 1 }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  flexShrink: 0,
                  flexGrow: 0,
                  alignSelf: "center",
                  borderRadius: "50%",
                  overflow: "hidden"
                }}
              >
                <Image alt="Andrija profile picture" src={contactImage} />
              </div>
              Let's start a
            </div>
          </span>
          <span style={{ fontSize: "4rem", lineHeight: 1, textAlign: "start" }}>
            project together
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactHeader;
