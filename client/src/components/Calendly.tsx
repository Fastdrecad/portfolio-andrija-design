import { InlineWidget } from "react-calendly";
import { BsXLg } from "react-icons/bs";

interface CalendlyProps {
  onClose: () => void;
}

const Calendly: React.FC<CalendlyProps> = ({ onClose }) => {
  return (
    <div className="calendly-wrapper">
      <button className="calendly-close-button" onClick={onClose}>
        <BsXLg />
      </button>
      <InlineWidget
        url="https://calendly.com/andrijas-micun/zakazite-sastanak-1"
        styles={{
          minWidth: "320px",
          width: "100%",
          border: "none"
        }}
      />
    </div>
  );
};

export default Calendly;
