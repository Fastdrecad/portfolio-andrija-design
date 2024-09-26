import { motion } from "framer-motion";
import {
  BsArrowsFullscreen,
  // BsChevronLeft,
  // BsChevronRight,
  BsXLg
} from "react-icons/bs";
import GalleryItem from "@components/GalleryItem";
import { portfolio } from "../data";
import { useEffect, useRef, useState } from "react";

interface ModalContentProps {
  onClose: () => void;
  projectId: number;
}

const ModalContent: React.FC<ModalContentProps> = ({ onClose, projectId }) => {
  const [navClass, setNavClass] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    handleResize(); // Call once on mount to set initial height
    window.addEventListener("resize", handleResize); // Adjust on window resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (navbarRef.current) {
        const newHeight = navbarRef.current.offsetHeight;
        if (newHeight !== navbarHeight) {
          setNavbarHeight(newHeight);
        }
      }
    };

    // Observe changes in the navbar that could affect its size
    const observer = new ResizeObserver(handleResize);
    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    handleResize(); // Also call on mount

    return () => {
      if (navbarRef.current) {
        observer.unobserve(navbarRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const modal = modalRef.current;
      if (modal) {
        const currentScrollY = modal.scrollTop;
        const isScrollingDown = currentScrollY > lastScrollY;

        if (currentScrollY <= 150) {
          if (navClass !== "top") {
            setNavClass("top"); // Show navbar when within 100px from the top
          }
        } else if (isScrollingDown) {
          if (navClass !== "hidden") {
            setNavClass("hidden"); // Hide navbar when scrolling down
          }
        } else {
          if (navClass !== "scrolled-up") {
            setNavClass("scrolled-up"); // Show navbar in 'scrolled-up' state otherwise
          }
        }

        setLastScrollY(currentScrollY); // Update last scroll position for next comparison
      }
    };

    const modal = modalRef.current;
    modal?.addEventListener("scroll", handleScroll);

    return () => {
      modal?.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, navClass]);

  const project = portfolio.find((p) => p.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleCloseFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      ref={modalRef}
      className="modal-content__fullscreen-wrapper"
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0,
          duration: 1,
          delayChildren: 0.3,
          staggerChildren: 0.05
        }
      }}
      exit={{
        clipPath: "inset(10% 50% 90% 50%)",
        scale: 0,
        opacity: 0,
        transition: {
          type: "spring",
          bounce: 0,
          duration: 0.5
        }
      }}
    >
      <div className="">
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
                onClick={handleCloseFullscreen}
              >
                <BsXLg />
              </button>
            </div>
          </div>

          <GalleryItem
            projectId={projectId}
            style={{ marginTop: `${navbarHeight}px` }}
            ref={modalRef}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ModalContent;
