import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";
import ImageKit from "./ImageKit";

interface PortfolioItemProps {
  id: number;
  title: string;
  projectName: string;
  url: string;
  category: string;
  items: { url: string; desc: string }[];
  className?: string;
  index: number;
  newlyLoadedStartIndex?: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  id,
  title,
  projectName,
  url,
  className,
  newlyLoadedStartIndex = 0,
  index
}) => {
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  const closeModal = () => setIsModalOpen(null);
  const openModal = (projectId: number) => setIsModalOpen(projectId);

  const portfolioItemRef = useRef<HTMLLIElement>(null);

  const isNewItem = index >= newlyLoadedStartIndex;

  return (
    <>
      <motion.li
        id={`portfolioboxxid-${id}`}
        className={`portfolio ${className}  "fadeInnn" }`}
        style={{
          transitionDelay: isNewItem
            ? `${(index - newlyLoadedStartIndex) * 150 + 200}ms`
            : `${index * 100 + 100}ms`
        }}
        ref={portfolioItemRef}
        onClick={() => openModal(id)}
      >
        <ImageKit path={url} alt="" loading="lazy" />

        <div className="portfolio-item__overlay">
          <h4 className="portfolio-item__project-name">{projectName}</h4>
          <p className="portfolio-item__title">{title}</p>
        </div>
      </motion.li>

      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {isModalOpen && <Modal onClose={closeModal} id={id} />}
      </AnimatePresence>
    </>
  );
};

export default PortfolioItem;
