import { useEffect } from "react";
import Backdrop from "./Backdrop";
import ModalContent from "./ModalContent";

interface ModalProps {
  onClose: () => void;
  id: number;
}

const Modal: React.FC<ModalProps> = ({ onClose, id }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Backdrop onClick={onClose}>
      <ModalContent onClose={onClose} projectId={id} />
    </Backdrop>
  );
};

export default Modal;
