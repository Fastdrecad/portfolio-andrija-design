import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RedLineIcon } from "./RedLine";
import useViewportHeight from "../hooks/useViewportHeight";
import Image from "./Image";
import Modal from "./Modal";
import { AiOutlinePlayCircle } from "react-icons/ai";

const Video: React.FC = () => {
  useViewportHeight();
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const isVideoTitleInView = useInView(videoTitleRef);

  const videoIconRef = useRef<HTMLDivElement>(null);
  const isVideoIconInView = useInView(videoIconRef);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
        <p>
          I help brands stand out with innovative design solutions. Together, we
          create what’s next. No noise, just results. Always on the cutting edge
          of design and technology.
        </p>
      </div>

      <div className="video__content">
        <Image
          src="/images/home-video-img.jpg"
          alt="Architectural interior with a play button and the text 'Imagination Creates Reality."
        />
        <div className="video__banner">
          <motion.div
            ref={videoIconRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isVideoIconInView ? { scale: [1, 1.4, 1], opacity: 1 } : {}
            }
            transition={{ duration: 0.85 }}
          >
            <button onClick={handleClick} className="video__play-btn">
              <AiOutlinePlayCircle className="video__play-icon" />
            </button>
          </motion.div>
          <span>imagination creates reality</span>
        </div>
      </div>
      {isOpen && (
        <Modal
          onClose={handleClose}
          modalType="youtube"
          videoId="MzTkNCEDeLM" // The YouTube video ID
        />
      )}
    </section>
  );
};

export default Video;
