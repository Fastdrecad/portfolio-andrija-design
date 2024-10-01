import { useRef } from "react";

import { motion, useInView } from "framer-motion";

import Image from "@/components/common/Image";
import RedLine from "@/components/common/RedLine";

import contactHero from "@/assets/images/contact-hero.jpg";
import contactHero480 from "@/assets/images/contact-hero480.jpg";
import contactHero800 from "@/assets/images/contact-hero800.jpg";

const ContactFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const isFooterInView = useInView(footerRef);

  return (
    <div className="contact-footer__container">
      <div className="contact-footer__content">
        <div className="contact-footer__image-container">
          <div className="contact-footer__background-image">
            <Image
              src={contactHero}
              alt="Furniture Design"
              srcSet={`${contactHero480} 480w, ${contactHero800} 800w, ${contactHero} 1200w`}
              sizes="(max-width: 600px) 480px, (max-width: 900px) 800px, 1200px"
            />
          </div>
          <motion.div
            ref={footerRef}
            className="contact-footer__front-title"
            initial={{ opacity: 0, filter: "blur(60px)" }}
            animate={isFooterInView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1 }}
          >
            <RedLine
              delay={0.3}
              iconVariant="center"
              isVisible={isFooterInView}
            >
              <h2 className="contact-footer__front-text">
                Furniture Design | CAD | 3D Rendering
              </h2>
            </RedLine>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactFooter;
