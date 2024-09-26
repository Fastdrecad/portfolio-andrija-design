import { useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlinePlayCircle } from "react-icons/ai";
import useViewportHeight from "@/hooks/useViewportHeight";
import { RedLineIcon } from "@/components/RedLine";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import { closeModal, openModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";

const Video: React.FC = () => {
  const dispatch = useDispatch();
  useViewportHeight();
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const isVideoTitleInView = useInView(videoTitleRef);

  const videoIconRef = useRef<HTMLDivElement>(null);
  const isVideoIconInView = useInView(videoIconRef);

  const isYoutubeOpen = useSelector((state: RootState) => state.modal.youtube);

  const handleClick = useCallback(() => {
    dispatch(openModal({ modalType: "youtube" }));
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeModal("youtube"));
  }, [dispatch]);

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
      {isYoutubeOpen && (
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
