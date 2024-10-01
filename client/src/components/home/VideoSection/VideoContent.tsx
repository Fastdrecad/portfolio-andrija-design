import { useRef } from "react";

import { motion, useInView } from "framer-motion";
import { AiOutlinePlayCircle } from "react-icons/ai";

import Image from "@/components/common/Image";

import videoImg from "@/assets/images/home-video-img.jpg";

interface VideoContentProps {
  onPlayClick: () => void;
}

const VideoContent: React.FC<VideoContentProps> = ({ onPlayClick }) => {
  const videoIconRef = useRef<HTMLDivElement>(null);
  const isVideoIconInView = useInView(videoIconRef);

  return (
    <div className="video__content">
      <Image
        src={videoImg}
        alt="Architectural interior with a play button and the text 'Imagination Creates Reality.'"
      />
      <div className="video__banner">
        <motion.div
          ref={videoIconRef}
          initial={{ scale: 0, opacity: 0 }}
          animate={isVideoIconInView ? { scale: [1, 1.4, 1], opacity: 1 } : {}}
          transition={{ duration: 0.85 }}
        >
          <button onClick={onPlayClick} className="video__play-btn">
            <AiOutlinePlayCircle className="video__play-icon" />
          </button>
        </motion.div>
        <span>imagination creates reality</span>
      </div>
    </div>
  );
};

export default VideoContent;
