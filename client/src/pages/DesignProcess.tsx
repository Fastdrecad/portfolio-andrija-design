import { useRef } from "react";

import { useInView } from "framer-motion";

import useParallaxScroll from "@/hooks/useParallaxScroll";
import useDocumentTitle from "@/hooks/useDocumentTitle";

import DesignProcessBox from "@/components/design-process/DesignProcessBox";

import { designProcess } from "@/data";
import RedLine from "@/components/common/RedLine";
import SEO from "@/components/common/seo/SEO";
import JsonLd from "@/components/common/seo/JsonLd";

const DesignProcess: React.FC = () => {
  useDocumentTitle("Design Process");
  useParallaxScroll("parallax");

  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(titleRef);

  return (
    <>
      <SEO
        title="Design Process | Andrija Mićunović - Furniture Designer"
        description="Discover the design process behind the unique furniture and product designs by Andrija Mićunović."
        url="https://www.portfolio.andrijadesign.com/design-process"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com/design-process"
      />

      <JsonLd pageType="design-process" pageData={designProcess} />

      <section className="design-process">
        <div className="design-process__container">
          <div className="design-process__heading">
            <div className="design-process__section-title" ref={titleRef}>
              <RedLine isVisible={isTitleInView}>
                <h3 className="design-process__title">
                  You have a vision.
                  <strong> I know the way to get you there</strong>
                </h3>
              </RedLine>
              <h4 className="design-process__sub-title">
                DESIGN
                <strong className="design-process__sub-title--highlight">
                  PROCESS
                </strong>
              </h4>
            </div>
          </div>
        </div>

        <div className="design-process-part-wrapper">
          <div className="design-process-part-gradient"></div>
          <div className="design-process-part" id="parallax">
            <div className="design-process-content">
              <div className="design-process-part-inner">
                {designProcess.map((item, i) => (
                  <DesignProcessBox key={i} index={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignProcess;
