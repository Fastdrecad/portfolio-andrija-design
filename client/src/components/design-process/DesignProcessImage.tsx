import { useRef } from "react";

import { useInView, motion } from "framer-motion";

import Image from "@/components/common/Image";

import { DesignProcessBoxProps } from "@/types/designProcessTypes";

const DesignProcessImage: React.FC<{ item: DesignProcessBoxProps["item"] }> = ({
  item
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef);

  return (
    <motion.div
      ref={imageRef}
      className={`design-process-img ${isInView ? "animate-arrow" : ""}`}
    >
      <div className="design-process-image-container">
        <Image src={item.img} alt={item.alt} />
      </div>
    </motion.div>
  );
};

export default DesignProcessImage;
