import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BsXLg } from "react-icons/bs";
import Backdrop from "./Backdrop";

interface YoutubeEmbedProps {
  videoId: string;
  onClose: () => void;
  isOpen: boolean;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({
  videoId,
  onClose,
  isOpen
}) => {
  const originalClasses = "lenis lenis-smooth lenis-scrolling";

  useEffect(() => {
    if (isOpen) {
      document.documentElement.className = "";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.className = originalClasses;
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const modalContainer = document.querySelector(".modal-container");

  if (!modalContainer) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <Backdrop onClick={onClose}>
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
        </Backdrop>
      )}
    </>,
    modalContainer
  );
};

export default YoutubeEmbed;
