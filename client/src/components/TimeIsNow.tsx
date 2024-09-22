import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RedLineIcon } from "./RedLine";
import { InlineWidget } from "react-calendly";
import { AmLogo } from "./AmLogo";
import { BsXLg } from "react-icons/bs";
import useViewportHeight from "../hooks/useViewportHeight";

const TimeIsNow: React.FC = () => {
  useViewportHeight();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const widgetRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsCalendlyOpen(false);
  };

  useEffect(() => {
    const body = document.body;

    if (isCalendlyOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "visible";
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsCalendlyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      body.style.overflow = "visible";
    };
  }, [isCalendlyOpen]);

  const buttonRef = useRef<HTMLDivElement>(null);
  const isButtonInView = useInView(buttonRef, {
    once: true
  });

  const amLogoRef = useRef<HTMLImageElement>(null);
  const isAmLogoInView = useInView(amLogoRef, {
    once: true
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef);

  return (
    <section className="time-is-now" id="time-is-now">
      <div className="time-is-now__ellipses" />
      <div className="time-is-now__content">
        <div className="time-is-now__title-wrapper">
          <h2>
            Time is now<strong>Free Consultation!</strong>
          </h2>
          <motion.div
            className="red-line-wrapper"
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={isContentInView ? { y: 0, opacity: 1 } : {}}
          >
            <div className="red-line-placeholder">
              {isContentInView && <RedLineIcon />}
            </div>
          </motion.div>
        </div>
        <p>
          Take the first step toward success by scheduling free consultation.
        </p>
        <motion.div
          ref={buttonRef}
          initial={{ y: 100, opacity: 0 }}
          animate={isButtonInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          <button
            className="time-is-now__schedule-meeting"
            onClick={() => setIsCalendlyOpen(true)}
          >
            Schedule a meeting
          </button>
        </motion.div>
        <h3>Join 500+ happy clients who achieved success!</h3>
        <>
          {/* Calendly Widget Embed */}
          {isCalendlyOpen && (
            <div className="calendly-wrapper">
              <button className="calendly-close-button" onClick={handleClose}>
                <BsXLg />
              </button>

              <div ref={widgetRef} className="calendly-content">
                <InlineWidget
                  url="https://calendly.com/andrijas-micun/zakazite-sastanak-1"
                  styles={{
                    minWidth: "320px",
                    height: "700px",
                    width: "100%",
                    border: "none"
                  }}
                />
              </div>
            </div>
          )}
        </>
      </div>

      <motion.div
        className="time-is-now__logo-container"
        ref={amLogoRef}
        initial={{ scale: 0, opacity: 0, filter: "blur(20px)", rotate: 360 }}
        animate={
          isAmLogoInView
            ? { scale: 1, opacity: 1, filter: "blur(0px)", rotate: 0 }
            : {}
        }
        transition={{ duration: 0.5 }}
      >
        <AmLogo />
      </motion.div>
    </section>
  );
};

export default TimeIsNow;
