// src/components/featureSpecific/Video/VideoHeading.tsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RedLine from "@/components/common/RedLine";

interface VideoHeadingProps {
  title: string;
}

const VideoHeading: React.FC<VideoHeadingProps> = ({ title }) => {
  const videoTitleRef = useRef<HTMLDivElement>(null);
  const isVideoTitleInView = useInView(videoTitleRef, { once: true });

  return (
    <div className="video__heading">
      <motion.div
        className="video__section-title"
        ref={videoTitleRef}
        initial={{ y: -200, opacity: 0 }}
        animate={
          isVideoTitleInView ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <RedLine isVisible={isVideoTitleInView}>
          <h2>{title}</h2>
        </RedLine>
      </motion.div>
      <p>
        I help brands stand out with innovative design solutions. Together, we
        create what’s next. No noise, just results. Always on the cutting edge
        of design and technology.
      </p>
    </div>
  );
};

export default VideoHeading;
