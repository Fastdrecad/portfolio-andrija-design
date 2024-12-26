import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Image from "@/components/common/Image";
import { PortfolioItemProps } from "@/types/portfolioTypes";
import { useModal } from "@/hooks/useModal";

interface ExtendedPortfolioItemProps extends PortfolioItemProps {
  fromLatestWorks?: boolean;
}

const PortfolioItem: React.FC<ExtendedPortfolioItemProps> = ({
  _id,
  title,
  projectName,
  slug,
  url,
  className,
  newlyLoadedStartIndex = 0,
  index,
  alt,
  fromLatestWorks
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal } = useModal();
  const portfolioItemRef = useRef<HTMLLIElement>(null);

  // Early return after hooks
  if (!_id || !slug) {
    return null;
  }

  const isNewItem =
    typeof index === "number" && index >= (newlyLoadedStartIndex || 0);

  const getTransitionDelay = () => {
    if (typeof index !== "number") return "0ms";
    return isNewItem
      ? `${(index - (newlyLoadedStartIndex || 0)) * 150 + 200}ms`
      : `${index * 100 + 100}ms`;
  };

  const handleClick = () => {
    // Get the current selected tab from location state
    const currentTab = location.state?.selectedTab || "all";

    if (fromLatestWorks) {
      navigate("/portfolio", {
        state: {
          isModalNavigation: true,
          selectedTab: currentTab
        }
      });
    }

    openModal("project", { projectId: _id });

    navigate(`/portfolio/${slug}`, {
      state: {
        isModalNavigation: true,
        selectedTab: currentTab
      }
    });
  };

  return (
    <motion.li
      id={`portfolioboxxid-${_id}`}
      className={`portfolio ${className || ""} fadeInnn`}
      style={{
        transitionDelay: getTransitionDelay()
      }}
      ref={portfolioItemRef}
      onClick={handleClick}
    >
      <Image src={url} loading="lazy" alt={alt || "Portfolio item"} />
      <div className="portfolio-item__overlay">
        <h4 className="portfolio-item__project-name">{projectName}</h4>
        <p className="portfolio-item__title">{title}</p>
      </div>
    </motion.li>
  );
};

export default PortfolioItem;
