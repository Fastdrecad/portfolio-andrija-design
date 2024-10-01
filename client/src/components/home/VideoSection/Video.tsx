import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";

import VideoHeading from "@/components/home/VideoSection/VideoHeading";
import VideoContent from "@/components/home/VideoSection/VideoContent";
import Modal from "@/components/common/Modal/Modal";

const VideoSection: React.FC = () => {
  const dispatch = useDispatch();
  const isYoutubeOpen = useSelector((state: RootState) => state.modal.youtube);

  const handleClick = useCallback(() => {
    dispatch(openModal({ modalType: "youtube" }));
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(closeModal("youtube"));
  }, [dispatch]);

  return (
    <section id="video" className="video">
      <VideoHeading title="Let's Get Started on Your Project" />
      <VideoContent onPlayClick={handleClick} />
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

export default VideoSection;
