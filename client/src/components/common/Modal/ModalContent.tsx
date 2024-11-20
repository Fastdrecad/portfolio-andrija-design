import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import GalleryItem from "@/components/common/Modal/GalleryItem";
import { portfolio } from "@/data";

interface ModalContentProps {
  onClose: () => void;
  projectId: number;
  isModal?: boolean;
}

const ModalContent: React.FC<ModalContentProps> = ({
  onClose,
  projectId,
  isModal = true
}) => {
  const [navClass, setNavClass] = useState<string>("");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const galleryItemRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    const navbar = navbarRef.current;
    const observer = new ResizeObserver(handleResize);
    if (navbar) {
      observer.observe(navbar);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (navbar) {
        observer.unobserve(navbar);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const modal = modalRef.current;
      if (modal) {
        const currentScrollY = modal.scrollTop;
        const isScrollingDown = currentScrollY > lastScrollYRef.current;

        if (isScrollingDown) {
          setNavClass("hidden");
        } else {
          setNavClass("scrolled-up");
        }

        lastScrollYRef.current = currentScrollY;
      }
    };

    const modal = modalRef.current;
    modal?.addEventListener("scroll", handleScroll);

    return () => {
      modal?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const project = portfolio.find((p) => p.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleFullscreen = () => {
    if (modalRef.current) {
      if (!document.fullscreenElement) {
        modalRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleClose = () => {
    if (isModal) {
      onClose();
    } else {
      navigate("/portfolio");
    }
  };

  return (
    <motion.div
      ref={modalRef}
      className="modal-content__fullscreen-wrapper"
      onClick={(e) => e.stopPropagation()}
      initial={isModal ? { scale: 0, opacity: 0 } : undefined}
      animate={isModal ? { scale: 1, opacity: 1 } : undefined}
      exit={isModal ? { scale: 0, opacity: 0 } : undefined}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 1,
        delayChildren: 0.3,
        staggerChildren: 0.05
      }}
    >
      <div>
        <div className="modal-content__fullscreen-view">
          <div
            ref={navbarRef}
            className={`modal-content__fullscreen-desktop-navbar-container ${navClass}`}
            style={{
              transform:
                navClass === "hidden"
                  ? `translateY(-${navbarHeight}px)`
                  : "translateY(0)",
              visibility: navClass === "hidden" ? "hidden" : "visible"
            }}
          >
            <div className="modal-content__fullscreen-social">
              <button
                className="modal-content__fullscreen-icon"
                onClick={handleFullscreen}
              >
                <BsArrowsFullscreen />
              </button>
            </div>
            <h2 className="project-title">{project.title}</h2>
            <div className="modal-content__fullscreen-nav">
              <button
                className="modal-content__fullscreen-close"
                onClick={handleClose}
              >
                <BsXLg />
              </button>
            </div>
          </div>

          <GalleryItem projectId={projectId} ref={galleryItemRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default ModalContent;
