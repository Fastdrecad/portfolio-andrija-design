import LoadingDots from "@/components/animations/LoadingDots";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useFadeIn } from "@/hooks/useFadeIn";

import { filterPortfolioByCategory } from "@/utils/portfolioUtils";

import RedLine from "@/components/common/RedLine";
import JsonLd from "@/components/common/seo/JsonLd";
import SEO from "@/components/common/seo/SEO";
import { PortfolioItem, PortfolioTabs } from "@/components/portfolio";

import { IMAGES_PER_ROW, IMAGES_PER_LOAD } from "@/constants";
import { categories } from "@/data";

import { useGetProjectsQuery } from "@/redux/services/portfolioApi";

const Portfolio: React.FC = () => {
  useDocumentTitle("Portfolio");
  const location = useLocation();
  const navigate = useNavigate();

  const titleRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string>(
    location.state?.selectedTab || "all"
  );
  const [next, setNext] = useState<number>(IMAGES_PER_ROW);
  const [newlyLoadedStartIndex, setNewlyLoadedStartIndex] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { resetAnimation } = useFadeIn();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Set initial animation state
  useEffect(() => {
    setShouldAnimate(false);
  }, []);

  const {
    data: portfolios,
    isLoading: isLoadingQuery,
    error
  } = useGetProjectsQuery();

  // Memoize filtered data to prevent unnecessary re-renders
  const data = useMemo(() => {
    if (!portfolios) return [];
    return filterPortfolioByCategory(selected, portfolios);
  }, [selected, portfolios]);

  // Set visibility and trigger fade animation after data loads
  useEffect(() => {
    if (!isLoadingQuery && portfolios?.length) {
      // Reset animation state
      setShouldAnimate(false);

      // Delay to ensure DOM is fully ready
      const timer = setTimeout(() => {
        setIsVisible(true);
        setShouldAnimate(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoadingQuery, portfolios]);

  const handleTabChange = useCallback(
    (newCategory: string) => {
      setSelected(newCategory);
      setNext(IMAGES_PER_ROW);
      setNewlyLoadedStartIndex(0);
      setShouldAnimate(false);

      // Update location state with new selected tab
      navigate(".", {
        state: {
          ...location.state,
          selectedTab: newCategory
        },
        replace: true
      });

      // Reset animation with proper timing
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true);
        });
      });
    },
    [navigate, location.state]
  );

  const loadMore = useCallback(() => {
    if (isLoadingMore || next >= (data?.length || 0)) return;

    setIsLoadingMore(true);
    const currentLength = next;

    // Reset animation for newly loaded items
    setShouldAnimate(false);
    requestAnimationFrame(() => {
      setNewlyLoadedStartIndex(currentLength);
      setNext((prev) => Math.min(prev + IMAGES_PER_LOAD, data.length));
      resetAnimation();
      setIsLoadingMore(false);

      requestAnimationFrame(() => {
        setShouldAnimate(true);
      });
    });
  }, [data.length, next, resetAnimation, isLoadingMore]);

  // Load more observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && next < (data?.length || 0)) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore, next, data?.length]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.98,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  if (isLoadingQuery && !data.length) {
    return <LoadingDots />;
  }

  if (error) {
    return (
      <div className="portfolio-page__error">
        <h2>Error loading portfolio items</h2>
        <p>Please try again later</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Portfolio | Andrija Mićunović - Furniture Designer & 3D Artist"
        description="Explore Andrija Mićunović's portfolio of custom furniture designs and 3D models."
        url="https://www.portfolio.andrijadesign.com/portfolio"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com/portfolio"
      />

      <JsonLd pageType="portfolio" pageData={data} />

      <motion.main
        className="portfolio-page"
        id="portfolio"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="portfolio-page__container"
          variants={childVariants}
        >
          <div ref={titleRef} className="portfolio-page__title-content">
            <RedLine iconVariant="center" isVisible={isVisible}>
              <h2 className="portfolio-page__title">PORTFOLIO</h2>
            </RedLine>
          </div>

          <motion.h3 className="portfolio-page__work" variants={childVariants}>
            Creating next-level digital products
          </motion.h3>

          <motion.div variants={childVariants}>
            <PortfolioTabs
              categories={categories}
              selected={selected}
              handleTabChange={handleTabChange}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="portfolio-page__container"
          variants={childVariants}
        >
          <AnimatePresence mode="wait">
            <motion.ul
              key={selected}
              className={`portfolio-page__image-gallery ${
                shouldAnimate ? "fadeInnn" : ""
              }`}
            >
              {data?.slice(0, next).map((item, index) => (
                <PortfolioItem
                  key={item._id}
                  className="portfolio-item"
                  {...item}
                  index={index}
                  newlyLoadedStartIndex={newlyLoadedStartIndex}
                  isModal={false}
                />
              ))}
            </motion.ul>
          </AnimatePresence>

          {next < (data?.length || 0) && (
            <div ref={loadMoreRef} className="portfolio-page__loader">
              {isLoadingMore && <LoadingDots />}
            </div>
          )}
        </motion.div>
      </motion.main>
    </>
  );
};

export default Portfolio;
