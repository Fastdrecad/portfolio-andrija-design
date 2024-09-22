import { useEffect, useRef, useState } from "react";
import TestimonialItems from "./TestimonialItems";
import { testimonials } from "../data";
import { motion, useInView } from "framer-motion";
import { RedLineIcon } from "./RedLine";

const Testimonials: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const isLineInView = useInView(lineRef, {
    once: true
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, {
    once: true
  });

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    const parallax = document.getElementById("parallax");
    window.addEventListener("scroll", handleScroll);
    if (parallax) {
      parallax.style.backgroundPositionY = `${offsetY * 0.5}px`;
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offsetY]);

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__bg" id="parallax">
        <div className="testimonials__header">
          <h2>Testimonials</h2>
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
        <div className="testimonials__slider">
          <TestimonialItems>
            {testimonials.map((item, i: number) => (
              <div className="container-items" key={i}>
                <div className="content-items">
                  <em>
                    <p>{item.review}</p>
                  </em>
                  <div className="person">
                    <h2>{item.name}</h2>
                    <h4>{item.position}</h4>
                  </div>
                </div>
              </div>
            ))}
          </TestimonialItems>
        </div>
      </div>
      <div className="testimonials__bottom-section">
        <h3>
          Let&rsquo;s work together to achieve your goals and elevate your
          business to new heights.
          <motion.div className="red-line-wrapper-2" ref={lineRef}>
            {isLineInView && <RedLineIcon />}
          </motion.div>
        </h3>
      </div>
    </section>
  );
};

export default Testimonials;
