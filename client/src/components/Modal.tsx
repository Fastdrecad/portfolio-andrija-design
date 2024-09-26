import { useCallback, useEffect } from "react";
import Backdrop from "./Backdrop";
import ModalContent from "./ModalContent";
import YoutubeEmbed from "./YoutubeEmbed";
import Calendly from "./Calendly";

interface ModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  id?: number;
  modalType?: "project" | "youtube" | "calendly";
  videoId?: string;
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  children,
  id,
  modalType = "project",
  videoId
}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";

    // Add keydown event listener to handle 'Esc' key
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "auto";

      // Clean up keydown event listener
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
