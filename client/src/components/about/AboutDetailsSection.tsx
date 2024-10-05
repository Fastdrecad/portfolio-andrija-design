import { useInView } from "react-intersection-observer";

import Image from "@/components/common/Image";
import { AboutContent } from "@/components/about/AboutContent";
import { AnimatedSignature } from "@/components/animations";

import penImage from "@/assets/images/pen-image.png";

const AboutDetailsSection: React.FC = () => {
  const { ref: titleRef, inView: titleIsVisible } = useInView();

  return (
    <div className="about-section">
      <div className="about-section__container">
        <div className="about-section__part">
          <div className="about-section__content">
            <ImageSection />
            <AboutContent ref={titleRef} titleIsVisible={titleIsVisible} />
            <div className="about-section__signature">
              <AnimatedSignature />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageSection: React.FC = () => (
  <div className="about-section__fixed-wrapper">
    <div className="about-section__sticky-parent">
      <div className="about-section__pen-image">
        <Image
          src={penImage}
          alt="Digital drawing pen and holder, typically used with graphic tablets for design work."
          loading="eager"
        />
      </div>
    </div>
  </div>
);

export default AboutDetailsSection;
