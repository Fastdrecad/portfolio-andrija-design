import { GoChevronDown } from "react-icons/go";

const ScrollToWeb = ({
  scrollTo
}: {
  scrollTo: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}) => {
  return (
    <div className="scroll-to-web">
      <a href="#video" onClick={scrollTo}>
        <div className="scroll-to-web-text">
          <p>Scroll to website</p>
        </div>
        <div className="scroll-to-web-arrow-wrapper">
          <GoChevronDown className="scroll-to-web-arrow" />
        </div>
      </a>
    </div>
  );
};

export default ScrollToWeb;
