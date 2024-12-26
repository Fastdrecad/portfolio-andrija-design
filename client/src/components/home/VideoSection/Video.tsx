import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { openModal, closeModal, selectModalType } from "@/redux/modalSlice";

import VideoHeading from "@/components/home/VideoSection/VideoHeading";
import VideoContent from "@/components/home/VideoSection/VideoContent";
import Modal from "@/components/common/Modal/Modal";

const VIDEO_ID = "MzTkNCEDeLM";

const VideoSection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const modalType = useSelector(selectModalType);
  const isYoutubeOpen = modalType === "youtube";

  const handleClick = useCallback(() => {
    navigate(location.pathname, { state: { isModalNavigation: true } });
    dispatch(
      openModal({
        type: "youtube",
        data: { videoId: VIDEO_ID }
      })
    );
  }, [dispatch, navigate, location.pathname]);

  const handleClose = useCallback(() => {
    navigate(location.pathname, { state: { isModalNavigation: true } });
    dispatch(closeModal());
  }, [dispatch, navigate, location.pathname]);

  return (
    <section id="video" className="video">
      <VideoHeading title="Let's Get Started on Your Project" />
      <VideoContent onPlayClick={handleClick} />
      {isYoutubeOpen && (
        <Modal onClose={handleClose} modalType="youtube" videoId={VIDEO_ID} />
      )}
    </section>
  );
};

export default VideoSection;
