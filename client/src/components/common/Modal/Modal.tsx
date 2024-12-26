import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal, closeModal } from "@/redux/modalSlice";
import Backdrop from "@/components/common/Modal/Backdrop";
import Calendly from "@/components/common/Modal/Calendly";
import YoutubeEmbed from "@/components/common/Modal/YoutubeEmbed";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  id?: string;
  modalType: "project" | "youtube" | "calendly";
  videoId?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, id, modalType, videoId }) => {
  const dispatch = useDispatch();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (modalType === "youtube" && videoId) {
      dispatch(
        openModal({
          type: "youtube",
          data: { videoId }
        })
      );
    } else if (modalType === "calendly") {
      dispatch(
        openModal({
          type: "calendly"
        })
      );
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      dispatch(closeModal());
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [dispatch, modalType, id, videoId, handleKeyDown]);

  return (
    <Backdrop onClick={onClose}>
      {modalType === "youtube" && videoId && (
        <YoutubeEmbed videoId={videoId} onClose={onClose} />
      )}
      {modalType === "calendly" && <Calendly onClose={onClose} />}
    </Backdrop>
  );
};

export default Modal;
