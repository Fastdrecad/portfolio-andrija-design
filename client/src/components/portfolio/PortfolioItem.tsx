import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/redux/store";
import { setCurrentRoute } from "@/redux/routeSlice";
import { closeModal, openModal } from "@/redux/modalSlice";

import Image from "@/components/common/Image";
import Modal from "@/components/common/Modal/Modal";

import { PortfolioItemProps } from "@/types/portfolioTypes";
import { generateSlug } from "@/utils/slugUtils";

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  id,
  title,
  projectName,
  url,
  className,
  newlyLoadedStartIndex = 0,
  index,
  alt,
  isModal = false
}) => {
  const slug = generateSlug(projectName);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.project === id
  );

  // console.log(isModalOpen);

  const portfolioItemRef = useRef<HTMLLIElement>(null);
  const isNewItem = index >= newlyLoadedStartIndex;

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "project", projectId: id }));

    if (isModal) {
      // Navigate with state to indicate the modal should be opened
      navigate(`/`);
    } else {
      // Navigate normally if not coming from the modal
      navigate(`/portfolio/${slug}`);
      dispatch(
        setCurrentRoute({
          pathname: `/portfolio/${slug}`
        })
      );
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal("project"));

    // Navigate based on context (if from LatestWorks or Portfolio)
    if (isModal) {
      // Stay on the current page if the modal was opened from LatestWorks
      navigate("/");
    } else {
      // Navigate back to portfolio if opened from the portfolio page
      navigate("/portfolio");
      dispatch(
        setCurrentRoute({
          pathname: `/portfolio`
        })
      );
    }
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
