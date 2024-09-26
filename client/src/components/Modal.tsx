import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { closeModal, openModal, ModalPayload } from "@/redux/modalSlice";
import Backdrop from "@/components/Backdrop";
import ModalContent from "@/components/ModalContent";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import Calendly from "@/components/Calendly";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  id?: number;
  modalType: "project" | "youtube" | "calendly";
  videoId?: string;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  id,
  modalType,
  videoId
}) => {
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
    // Conditionally dispatch based on modal type
    if (modalType === "project" && id !== undefined) {
      dispatch(openModal({ modalType: "project", projectId: id }));
    } else {
      dispatch(openModal({ modalType } as ModalPayload)); // No projectId for youtube/calendly
    }

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      dispatch(closeModal(modalType));
      document.body.style.overflow = "auto";

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, dispatch, modalType, id]);

  return (
    <Backdrop onClick={onClose}>
      {modalType === "project" && id && (
        <ModalContent onClose={onClose} projectId={id} />
      )}
      {modalType === "youtube" && videoId && (
        <YoutubeEmbed videoId={videoId} onClose={onClose} />
      )}
      {modalType === "calendly" && <Calendly onClose={onClose} />}
      {children && <div className="modal-content">{children}</div>}
    </Backdrop>
  );
};

export default Modal;
