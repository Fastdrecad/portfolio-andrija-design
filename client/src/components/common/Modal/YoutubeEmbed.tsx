import { motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";

interface YoutubeEmbedProps {
  videoId: string;
  onClose: () => void;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId, onClose }) => {
  return (
    <motion.div
      className="youtube-embed__container"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      <div className="youtube-embed__close-btn-container">
        <button className="youtube-embed__close-btn" onClick={onClose}>
          <BsXLg />
        </button>
      </div>
      <div className="youtube-embed__modal">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&allow=accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture`}
          allowFullScreen
          title="YouTube Video Player"
          className="youtube-embed__video-player"
        />
      </div>
    </motion.div>
  );
};

export default YoutubeEmbed;
