import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import Image from "@/components/Image";
import Modal from "@/components/Modal";
import { RootState } from "@/redux/store";
import { closeModal, openModal } from "@/redux/modalSlice";

interface PortfolioItemProps {
  id: number;
  title: string;
  projectName: string;
  url: string;
  category: string;
  alt?: string;
  items: { url: string; desc: string; alt?: string }[];
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
  index,
  alt
}) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.project === id
  );

  const portfolioItemRef = useRef<HTMLLIElement>(null);
  const isNewItem = index >= newlyLoadedStartIndex;

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "project", projectId: id })); // Only pass projectId when modalType is 'project'
  };

  const handleCloseModal = () => {
    dispatch(closeModal("project")); // Close the project modal
  };

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
        onClick={handleOpenModal}
      >
        <Image src={url} loading="lazy" alt={alt || "Portfolio item"} />
        <div className="portfolio-item__overlay">
          <h4 className="portfolio-item__project-name">{projectName}</h4>
          <p className="portfolio-item__title">{title}</p>
        </div>
      </motion.li>

      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {isModalOpen && (
          <Modal modalType="project" onClose={handleCloseModal} id={id} />
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioItem;
