import { useCallback, useEffect } from "react";

import { useDispatch } from "react-redux";

import { closeModal, openModal, ModalPayload } from "@/redux/modalSlice";

import Backdrop from "@/components/common/Modal/Backdrop";
import ModalContent from "@/components/common/Modal/ModalContent";
import YoutubeEmbed from "@/components/common/Modal/YoutubeEmbed";
import Calendly from "@/components/common/Modal/Calendly";

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
    // Dispatch openModal only when the modal is first opened
    if (modalType === "project" && id !== undefined) {
      dispatch(openModal({ modalType: "project", projectId: id }));
    } else if (modalType !== "project") {
      dispatch(openModal({ modalType } as ModalPayload));
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Dispatch closeModal only when the modal is closed
      dispatch(closeModal(modalType));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, modalType, id, handleKeyDown]);

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
