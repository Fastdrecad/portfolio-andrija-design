import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { closeModal, openModal } from "@/redux/modalSlice";
import { RootState } from "@/redux/store";

import Image from "@/components/common/Image";
import Modal from "@/components/common/Modal/Modal";

import { PortfolioItemProps } from "@/types/portfolioTypes";

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  _id,
  title,
  projectName,
  url,
  className,
  newlyLoadedStartIndex = 0,
  index,
  alt,
  isModal = false
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const portfolioItemRef = useRef<HTMLLIElement>(null);
  const isModalOpen = useSelector(
    (state: RootState) => state.modal.project === _id
  );

  // Early return after hooks
  if (!_id) {
    return null;
  }

  const isNewItem =
    typeof index === "number" && index >= (newlyLoadedStartIndex || 0);

  const handleOpenModal = () => {
    if (!_id) return; // Additional safety check

    dispatch(openModal({ modalType: "project", projectId: _id }));

    if (isModal) {
      navigate(`/`);
    } else {
      navigate(`/portfolio`);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal("project"));

    if (isModal) {
      navigate("/");
    } else {
      navigate("/portfolio");
    }
  };

  const getTransitionDelay = () => {
    if (typeof index !== "number") return "0ms";
    return isNewItem
      ? `${(index - (newlyLoadedStartIndex || 0)) * 150 + 200}ms`
      : `${index * 100 + 100}ms`;
  };

  return (
    <>
      <motion.li
        id={`portfolioboxxid-${_id}`}
        className={`portfolio ${className || ""}  fadeInnn`}
        style={{
          transitionDelay: getTransitionDelay()
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
          <Modal
            modalType="project"
            onClose={handleCloseModal}
            id={_id}
            key="modal"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioItem;
