import { useCallback, useEffect, useRef, useState } from "react";

import { motion, useInView } from "framer-motion";

import useViewportHeight from "@/hooks/useViewportHeight";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useFadeIn } from "@/hooks/useFadeIn";

import { filterPortfolioByCategory } from "@/utils/portfolioUtils";

import { PortfolioItem, PortfolioTabs } from "@/components/portfolio";
import RedLine from "@/components/common/RedLine";
import pageTransition from "@/components/animations/pageTransition";
import Button from "@/components/common/Button";

import { IMAGES_PER_ROW } from "@/constants";
import { categories, portfolio } from "@/data";

import { PortfolioItemType } from "@/types/portfolioTypes";
import SEO from "@/components/common/seo/SEO";
import JsonLd from "@/components/common/seo/JsonLd";

const Portfolio: React.FC = () => {
  useDocumentTitle("Portfolio");

  useViewportHeight();
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, {
    once: true
  });

  const [data, setData] = useState<PortfolioItemType[]>([]);
  const [selected, setSelected] = useState<string>("all");
  const [next, setNext] = useState<number>(IMAGES_PER_ROW);
  const [newlyLoadedStartIndex, setNewlyLoadedStartIndex] = useState<number>(0);
  const { fadeInClass, resetAnimation } = useFadeIn();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    setData(filterPortfolioByCategory(selected));
    resetAnimation();
  }, [selected, resetAnimation]);

  const handleTabChange = (newCategory: string) => {
    setSelected(newCategory);
    setNext(IMAGES_PER_ROW);
    setNewlyLoadedStartIndex(0);
    resetAnimation();
    setData([]);

    setTimeout(() => {
      setData(filterPortfolioByCategory(newCategory));
    }, 50);
  };

  const handleMoreImages = useCallback(() => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);

    setTimeout(() => {
      const currentLength = next;
      setNewlyLoadedStartIndex(currentLength);
      setNext(data.length);
      resetAnimation();

      setIsButtonDisabled(false);
    }, 1200);
  }, [data.length, next, resetAnimation, isButtonDisabled]);

  return (
    <>
      <SEO
        title="Portfolio | Andrija Mićunović - Furniture Designer & 3D Artist"
        description="Explore Andrija Mićunović's portfolio of custom furniture designs and 3D models."
        url="https://www.portfolio.andrijadesign.com/portfolio"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com/portfolio"
      />

      <JsonLd pageType="portfolio" pageData={portfolio} />

      <main className="portfolio-page" id="portfolio">
        <div className="portfolio-page__container">
          <motion.div ref={titleRef} className="portfolio-page__title-content">
            <RedLine isVisible={isTitleInView}>
              <h2 className="portfolio-page__title">PORTFOLIO</h2>
            </RedLine>
          </motion.div>
          <h3 className="portfolio-page__work">
            Creating next-level digital products
          </h3>
          <PortfolioTabs
            categories={categories}
            selected={selected}
            handleTabChange={handleTabChange}
          />
        </div>
        <ul className={`portfolio-page__image-gallery ${fadeInClass}`}>
          {data?.slice(0, next).map((item, index) => (
            <PortfolioItem
              key={item.id}
              className="portfolio-item"
              {...item}
              index={index}
              newlyLoadedStartIndex={newlyLoadedStartIndex}
              isModal={false}
            />
          ))}
          {next < (data?.length || 0) && (
            <>
              <Button
                variant="outline"
                disabled={isButtonDisabled}
                className={`portfolio-page__load-more ${fadeInClass}  `}
                onClick={handleMoreImages}
              >
                {isButtonDisabled ? "LOADING..." : "LOAD MORE"}
              </Button>
            </>
          )}
        </ul>
      </main>
    </>
  );
};

const PortfolioPageWithTransition = pageTransition(Portfolio);

export default PortfolioPageWithTransition;
