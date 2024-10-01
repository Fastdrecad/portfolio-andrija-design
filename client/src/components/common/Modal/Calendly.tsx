import { InlineWidget } from "react-calendly";
import { BsXLg } from "react-icons/bs";

interface CalendlyProps {
  onClose: () => void;
}

const Calendly: React.FC<CalendlyProps> = ({ onClose }) => {
  return (
    <div className="calendly">
      <div className="calendly__close-btn-container">
        <button className="calendly__close-button" onClick={onClose}>
          <BsXLg />
        </button>
      </div>
      <div className="calendly__modal">
        <div className="calendly__modal-wrapper">
          <InlineWidget url="https://calendly.com/andrijas-micun/zakazite-sastanak-1" />
        </div>
      </div>
    </div>
  );
};

export default Calendly;
