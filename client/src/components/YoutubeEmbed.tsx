import { BsXLg } from "react-icons/bs";

interface YoutubeEmbedProps {
  videoId: string;
  onClose: () => void;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId, onClose }) => {
  return (
    <div className="youtube-embed__container">
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
    </div>
  );
};

export default YoutubeEmbed;
