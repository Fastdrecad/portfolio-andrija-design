import { InView } from "react-intersection-observer";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "@/components/common/Button";
import { PortfolioItem } from "@/components/portfolio";
import { useGetProjectsQuery } from "@/redux/services/portfolioApi";
import { formatRouteName } from "@/utils/routeUtils";
import { useRouteName } from "@/context/routeNameContext/useRouteName";

interface LatestWorksProps {
  className?: string;
}

const LatestWorks: React.FC<LatestWorksProps> = () => {
  const [isInView, setIsInView] = useState(false);
  const { data: projects, isLoading, error } = useGetProjectsQuery();
  const { setRouteName } = useRouteName();

  const handleClick = (url: string) => {
    const routeName = formatRouteName(url);
    setRouteName(routeName);
  };

  if (isLoading) {
    return (
      <section className="latest-works">
        <h3 className="latest-works__title">
          recent<span>work</span>
        </h3>
        <div className="latest-works__loading">Loading projects...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="latest-works">
        <h3 className="latest-works__title">
          recent<span>work</span>
        </h3>
        <div className="latest-works__error">Unable to load projects</div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="latest-works">
        <h3 className="latest-works__title">
          recent<span>work</span>
        </h3>
        <div className="latest-works__empty">No projects available</div>
      </section>
    );
  }

  return (
    <section className="latest-works" id="latest-works">
      <h3 className="latest-works__title">
        recent<span>work</span>
      </h3>
      <InView
        as="ul"
        onChange={(inView: boolean) => {
          if (inView) setIsInView(true);
        }}
        threshold={0.2}
        triggerOnce
        className={`latest-works__image-gallery ${isInView ? "fadeInnn" : ""}`}
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
              isModal={false}
              fromLatestWorks={true}
            />
          ))}
      </InView>

      <div className="latest-works__view-more">
        <NavLink
          to="/portfolio"
          onClick={() => handleClick("/portfolio")}
          className="latest-works__view-more--link"
        >
          <Button variant="primary">VIEW MORE</Button>
        </NavLink>
      </div>
    </section>
  );
};

export default LatestWorks;
