import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import VideoSection from "./VideoSection";
import { RedLineIcon } from "./RedLine";
import ImageKit from "./ImageKit";
import useViewportHeight from "../hooks/useViewportHeight";

const Video: React.FC = () => {
  useViewportHeight();
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const isVideoTitleInView = useInView(videoTitleRef);

  return (
    <section id="video" className="video">
      <div className="video__heading">
        <motion.div
          className="video__section-title"
          ref={videoTitleRef}
          initial={{ y: -200, opacity: 0 }}
          animate={
            isVideoTitleInView ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }
          }
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <h2>
            Let's Get Started on <strong>Your Project</strong>
          </h2>
          <motion.div className="red-line-wrapper">
            {isVideoTitleInView && <RedLineIcon />}
          </motion.div>
        </motion.div>
        <p>Embark on your project journey with confidence</p>
      </div>

      <div className="video__content">
        <ImageKit
          path="/images/home-video-img.jpg"
          alt="Architectural interior with a play button and the text 'Imagination Creates Reality."
        />
        <div className="video__banner">
          <VideoSection />
          <span>imagination creates reality</span>
        </div>
        <div className="video__popup-media" />
      </div>
    </section>
  );
};

export default Video;
