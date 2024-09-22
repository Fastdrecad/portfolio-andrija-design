import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import YoutubeEmbed from './YoutubeEmbed';

const VideoSection: React.FC = () => {
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
    <>
      <motion.div
        ref={videoIconRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={isVideoIconInView ? { scale: [1, 1.4, 1], opacity: 1 } : {}}
        transition={{ duration: 0.85 }}
        className='video-section__icon'
      >
        <button onClick={handleClick} className='video-section__play-btn'>
          <AiOutlinePlayCircle className='video-section__play-icon' />
        </button>
      </motion.div>
      <YoutubeEmbed
        onClose={handleClose}
        isOpen={isOpen}
        videoId='MzTkNCEDeLM'
      />
    </>
  );
};

export default VideoSection;
