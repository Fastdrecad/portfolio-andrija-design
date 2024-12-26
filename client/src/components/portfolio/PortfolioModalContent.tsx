import { useEffect, useRef, useState } from "react";
import { BsArrowsFullscreen, BsXLg, BsLink45Deg } from "react-icons/bs";
import LoadingDots from "@/components/animations/LoadingDots";
import GalleryItem from "@/components/common/Modal/GalleryItem";
import { useGetProjectByIdQuery } from "@/redux/services/portfolioApi";
import Image from "@/components/common/Image";
import aboutProfileImg from "@/assets/images/andrija-about-page.webp";
import { Button } from "@/components/common";
import { Link } from "react-router-dom";

interface PortfolioModalContentProps {
  projectId: string;
  onClose: () => void;
}

const PortfolioModalContent = ({
  projectId,
  onClose
}: PortfolioModalContentProps) => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [areRefsReady, setAreRefsReady] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const galleryItemRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const {
    data: project,
    isLoading,
    isError,
    isFetching
  } = useGetProjectByIdQuery(projectId);

  // Check when refs become available
  useEffect(() => {
    if (modalRef.current && navbarRef.current && project) {
      setAreRefsReady(true);

      // Initial navbar height calculation
      const height = navbarRef.current.offsetHeight;
      setNavbarHeight(height);
    }
  }, [project]);

  // Force a recalculation after initial mount
  useEffect(() => {
    if (!areRefsReady) return;

    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [areRefsReady]);

  // Reset state when projectId changes
  useEffect(() => {
    if (!areRefsReady) return;

    setIsNavVisible(true);
    lastScrollY.current = 0;

    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [projectId, isInitialized, areRefsReady]);

  // Track navbar height changes
  useEffect(() => {
    if (!areRefsReady) return;

    const navbarElement = navbarRef.current;
    if (!navbarElement) return;

    const handleResize = () => {
      // Skip if element is not in document anymore
      if (!document.contains(navbarElement)) return;

      const height = navbarElement.offsetHeight;
      if (height > 0) {
        // Only update if height is valid
        setNavbarHeight(height);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(navbarElement);

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [areRefsReady]);

  // Track scroll position for navbar visibility
  useEffect(() => {
    if (!areRefsReady || !navbarHeight) return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const handleScroll = () => {
      const currentScrollY = modalElement.scrollTop;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (isScrollingDown && currentScrollY > navbarHeight) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    modalElement.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      modalElement.removeEventListener("scroll", handleScroll);
    };
  }, [areRefsReady, navbarHeight]);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
        setIsCopied(false);
      });
  };

  const handleFullscreen = () => {
    if (modalRef.current) {
      if (!document.fullscreenElement) {
        modalRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  if (isLoading || isFetching || !project) {
    return <LoadingDots projectName={project?.projectName} />;
  }

  if (isError) {
    return (
      <div className="modal-content__error">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <p>Unable to load project</p>
        <p>Please try refreshing the page</p>
      </div>
    );
  }

  const effectiveNavbarHeight = isNavVisible ? navbarHeight : 0;

  return (
    <div ref={modalRef} className="modal-content__fullscreen-wrapper">
      <div
        className="modal-content__fullscreen-view"
        style={{ paddingTop: `${navbarHeight + 20}px` }}
      >
        <div
          ref={navbarRef}
          className={`modal-content__fullscreen-desktop-navbar-container ${
            isNavVisible ? "scrolled-up" : "hidden"
          }`}
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
              className={`modal-content__fullscreen-icon ${
                isCopied ? "copied" : ""
              }`}
              onClick={handleCopyLink}
              data-tooltip={isCopied ? "Copied!" : "Copy link"}
            >
              <BsLink45Deg />
            </button>
            <button
              className="modal-content__fullscreen-close"
              onClick={onClose}
            >
              <BsXLg />
            </button>
          </div>
        </div>

        <GalleryItem
          projectId={projectId}
          ref={galleryItemRef}
          effectiveNavbarHeight={effectiveNavbarHeight}
        />

        <div
          className={`modal-content__fullscreen-desktop-navbar-container-bottom  ${
            isNavVisible ? "scrolled-up" : "hidden"
          }`}
        >
          <div className="modal-content__profile-container">
            <Image
              src={aboutProfileImg}
              alt="Andrija Mićunović, Furniture Design Engineer and 3D Modeling Expert"
              loading="eager"
              useLoader={false}
              className="modal-content__profile-image"
            />
            <h2 className="project-title">
              Furniture & Product Design | 2D/3D CAD | Rendering
            </h2>
          </div>
          <Link
            to="https://www.upwork.com/freelancers/fastdrecad"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Hire me</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModalContent;
