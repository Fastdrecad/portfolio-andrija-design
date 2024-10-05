import { useRef } from "react";

import { NavLink } from "react-router-dom";
import { useInView } from "framer-motion";

import { PortfolioItem } from "@/components/portfolio";
import Button from "@/components/common/Button";

import { portfolio } from "@/data";
import { setCurrentRoute } from "@/redux/routeSlice";
import { useDispatch } from "react-redux";

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
            isModal={true}
          />
        ))}
      </ul>

      <div className="latest-works__view-more">
        <NavLink to="/portfolio" className="latest-works__view-more--link">
          <Button
            variant="primary"
            onClick={() => handleNavLinkClick("/portfolio")}
          >
            VIEW MORE
          </Button>
        </NavLink>
      </div>
    </section>
  );
};

export default LatestWorks;
