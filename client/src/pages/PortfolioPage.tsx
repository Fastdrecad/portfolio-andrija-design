import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { list, portfolio } from "../data";
import PortfolioItem from "@components/PortfolioItem";
import PortfolioList from "@components/PortfolioList";
import pageTransition from "@components/pageTransition";
import { RedLineIcon } from "@components/RedLine";
import { motion, useInView } from "framer-motion";
import useViewportHeight from "../hooks/useViewportHeight";

interface PortfolioItem {
  id: number;
  title: string;
  projectName: string;
  url: string;
  category: string;
  items: { url: string; desc: string }[];
}

const imagesPerRow: number = 8;

const filterPortfolioByCategory = (category: string): PortfolioItem[] => {
  switch (category.toLowerCase()) {
    case "rendering":
      return portfolio.filter((el) => el.category === "3D Rendering");
    case "cad":
      return portfolio.filter((el) => el.category === "CAD");
    case "furniture":
      return portfolio.filter((el) => el.category === "Furniture Design");
    case "animation":
      return portfolio.filter((el) => el.category === "3D Animation");
    case "product":
      return portfolio.filter((el) => el.category === "Product Design");
    default:
      return portfolio;
  }
};

const PortfolioPage: React.FC = () => {
  useViewportHeight();
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, {
    once: true
  });

  const [data, setData] = useState<PortfolioItem[]>([]);
  const [selected, setSelected] = useState<string>("all");
  const [next, setNext] = useState<number>(imagesPerRow);
  const [fadeInClass, setFadeInClass] = useState("fadeInnn");
  const [newlyLoadedStartIndex, setNewlyLoadedStartIndex] = useState<number>(0);

  const resetAnimation = () => {
    setFadeInClass("");
    setTimeout(() => {
      setFadeInClass("fadeInnn");
    }, 50);
  };

  const handleTabChange = (newCategory: string) => {
    setSelected(newCategory);
    setNext(imagesPerRow);
    setNewlyLoadedStartIndex(0);
    resetAnimation();
    setData([]);

    setTimeout(() => {
      setData(filterPortfolioByCategory(newCategory));
    }, 50);
  };

  // const handleMoreImages = useCallback(() => {
  //   const currentLength = next;
  //   setNewlyLoadedStartIndex(currentLength);
  //   setNext((prevNext) => prevNext + imagesPerRow);
  //   resetAnimation();
  // }, [next]);

  const handleMoreImages = useCallback(() => {
    const currentLength = next;
    setNewlyLoadedStartIndex(currentLength);
    setNext(data.length); // Load all remaining images
    resetAnimation();
  }, [data.length, next]);

  useEffect(() => {
    setData(filterPortfolioByCategory(selected));
    resetAnimation();
  }, [selected]);

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "Portfolio of Andrija Mićunović",
    "description":
      "A detailed look into Andrija Mićunović's professional furniture and product design projects, showcasing creativity and precision in every design.",
    "url": "https://www.portfolio.andrijadesign.com/portfolio",
    "mainEntity": portfolio.map((item) => ({
      "@type": "CreativeWork",
      "name": item.projectName,
      "description": item.title,
      "image": item.url,
      "url": item.url,
      "author": {
        "@type": "Person",
        "name": "Andrija Mićunović"
      },
      "keywords": item.tags?.join(", ") || ""
    }))
  };

  return (
    <>
      <Helmet>
        <title>
          Andrija Mićunović - Portfolio of 3D Designs and Renderings
        </title>

        <meta
          name="description"
          content="Explore Andrija Mićunović's portfolio showcasing high-quality Furniture Design, 3D Modeling, and CAD Renderings. Discover custom design solutions that bring ideas to life."
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Andrija Mićunović - Portfolio of 3D Designs and Renderings"
        />
        <meta
          property="og:description"
          content="Explore Andrija Mićunović's professional portfolio with high-quality 3D designs, product renders, and CAD work."
        />
        <meta
          property="og:image"
          content="https://www.andrijadesign.com/portfolio/portfolio-preview.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:url"
          content="https://www.andrijadesign.com/portfolio"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Andrija Mićunović - Portfolio of 3D Designs and Renderings"
        />
        <meta
          name="twitter:description"
          content="Explore high-quality Furniture Design, 3D Modeling, and CAD Renderings."
        />
        <meta
          name="twitter:image"
          content="https://www.andrijadesign.com/portfolio/portfolio-preview.jpg"
        />
        <meta
          name="twitter:url"
          content="https://www.andrijadesign.com/portfolio"
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main className="portfolio-page" id="portfolio">
        <div className="portfolio-page__container">
          <motion.div ref={titleRef} className="portfolio-page__title-content">
            <h2 className="portfolio-page__title">portfolio</h2>
            <motion.div className="red-line-wrapper">
              {isTitleInView && <RedLineIcon />}
            </motion.div>
          </motion.div>
          <h3 className="portfolio-page__work">
            Creating next-level digital products with precision and creativity.
          </h3>
          <ul className="portfolio-page__tabs">
            {list.map((item, i) => (
              <PortfolioList
                key={i}
                title={item.title}
                active={selected === item.id}
                setSelected={handleTabChange}
                id={item.id}
              />
            ))}
          </ul>
        </div>
        <div className={`portfolio-page__gallery-container ${fadeInClass}`}>
          <ul className="portfolio-page__image-gallery">
            {data?.slice(0, next).map((item, index) => (
              <PortfolioItem
                key={item.id}
                className="portfolio-item"
                {...item}
                index={index}
                newlyLoadedStartIndex={newlyLoadedStartIndex}
              />
            ))}
          </ul>
        </div>
        {next < (data?.length || 0) && (
          <button
            id="load-more"
            className="portfolio-page__load-more"
            onClick={handleMoreImages}
          >
            load more
          </button>
        )}
        <div style={{ marginBottom: "100px" }} />
      </main>
    </>
  );
};

const PortfolioPageWithTransition = pageTransition(PortfolioPage);

export default PortfolioPageWithTransition;
