import { useInView } from "framer-motion";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Button from "@/components/common/Button";
import { PortfolioItem } from "@/components/portfolio";
import { setCurrentRoute } from "@/redux/routeSlice";
import { useGetProjectsQuery } from "@/redux/services/portfolioApi";

interface LatestWorksProps {
  className?: string;
}

const LatestWorks: React.FC<LatestWorksProps> = () => {
  const latestWorksRef = useRef<HTMLUListElement>(null);
  const isLatestWorksInView = useInView(latestWorksRef, { once: true });
  const dispatch = useDispatch();

  const { data: projects, isLoading } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!projects || projects.length === 0) {
    return <div>No projects available</div>;
  }

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
        {projects
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime()
          )
          .slice(0, 8)
          .map((item, index) => (
            <PortfolioItem
              key={item._id}
              className="portfolio-item"
              {...item}
              index={index}
              newlyLoadedStartIndex={0}
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
