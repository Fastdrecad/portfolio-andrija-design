import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCurrentRoute } from "@/redux/routeSlice";
import PortfolioItem from "@/components/PortfolioItem";
import { portfolio } from "@/constants/data";

interface LatestWorksProps {
  className?: string;
}

const LatestWorks: React.FC<LatestWorksProps> = () => {
  const latestWorksRef = useRef<HTMLUListElement>(null);
  const isLatestWorksInView = useInView(latestWorksRef, { once: true });

  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <section className="latest-works" id="latest-works">
      <h3 className="latest-works__title">
        recent<span>work</span>
      </h3>
      <ul
        className={`latest-works__image-gallery ${
          isLatestWorksInView ? "fadeInnn" : ""
        }`}
        ref={latestWorksRef}
      >
        {portfolio.slice(0, 8).map((item, index) => (
          <PortfolioItem
            key={item.id}
            className="portfolio-item"
            {...item}
            index={index}
          />
        ))}
      </ul>

      <div className="latest-works__view-more">
        <NavLink
          to="/portfolio"
          className="latest-works__view-more--link"
          onClick={() => handleNavLinkClick("/portfolio")}
        >
          view more
        </NavLink>
      </div>
    </section>
  );
};

export default LatestWorks;
