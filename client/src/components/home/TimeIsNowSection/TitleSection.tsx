import React, { useRef } from "react";

import { useInView } from "framer-motion";

import RedLine from "@/components/common/RedLine";

// Title with RedLine animation
const TitleSection: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef);

  return (
    <div className="time-is-now__title-wrapper" ref={titleRef}>
      <RedLine isVisible={isInView}>
        <h2>
          Time is now <strong>Free Consultation!</strong>
        </h2>
      </RedLine>
    </div>
  );
};

export default TitleSection;
