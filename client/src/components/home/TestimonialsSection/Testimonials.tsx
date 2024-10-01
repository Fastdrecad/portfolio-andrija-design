import { useRef } from "react";

import { useInView } from "framer-motion";

import useParallaxScroll from "@/hooks/useParallaxScroll";

import TestimonialItems from "@/components/home/TestimonialsSection/TestimonialItems";
import RedLine from "@/components/common/RedLine";

import { testimonials } from "@/data";

const Testimonials: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const isLineInView = useInView(lineRef, { once: true });
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true });

  useParallaxScroll("parallax");

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__bg--wrapper">
        <div className="testimonials__bg--gradient"></div>
        <div className="testimonials__bg" id="parallax">
          <div className="testimonials__header" ref={contentRef}>
            <RedLine isVisible={isContentInView}>
              <h2>TESTIMONIALS</h2>
            </RedLine>
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
      </div>
      <div className="testimonials__bottom-section" ref={lineRef}>
        <RedLine isVisible={isLineInView}>
          <h3>
            Let’s work together to achieve your goals and elevate your business
            to new heights.
          </h3>
        </RedLine>
      </div>
    </section>
  );
};

export default Testimonials;
