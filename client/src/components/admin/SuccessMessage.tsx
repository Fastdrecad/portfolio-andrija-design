import { Button } from "@/components/common";
import { IoMdClose } from "react-icons/io";

interface SuccessMessageProps {
  isVisible: boolean;
  onClose: () => void;
  onViewPortfolio: () => void;
}

export const SuccessMessage = ({
  isVisible,
  onClose,
  onViewPortfolio
}: SuccessMessageProps) => {
  if (!isVisible) return null;

  return (
    <div className="portfolio-manager__success-message">
      <div className="success-banner">
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close message"
        >
          <IoMdClose />
        </button>
        <h3>Project Created Successfully!</h3>
        <p>Your project has been added to the portfolio.</p>
        <Button
          onClick={onViewPortfolio}
          className="portfolio-manager__form-button"
        >
          View Portfolio
        </Button>
      </div>
    </div>
  );
};
