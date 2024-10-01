import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { BsArrowsFullscreen, BsXLg } from "react-icons/bs";

import GalleryItem from "@/components/common/Modal/GalleryItem";

import { portfolio } from "@/data";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "@/redux/routeSlice";

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
  const [navClass, setNavClass] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }, [navbarHeight]);

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

  const handleClose = () => {
    if (isModal) {
      // If opened from LatestWorks, stay on "/"
      onClose(); // Close the modal, but stay on the current route "/"
    } else {
      // If opened from "portfolio/slug", navigate to "portfolio"
      navigate("/portfolio");
      dispatch(setCurrentRoute("/portfolio"));
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
