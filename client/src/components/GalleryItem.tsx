import { CSSProperties, MutableRefObject, useEffect, useState } from "react";
import { portfolio } from "../data";

import { forwardRef } from "react";

interface GalleryItemProps {
  projectId: number;
  style?: CSSProperties;
}

const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(
  (props, ref) => {
    const { projectId, style } = props;
    const [navClass, setNavClass] = useState("default");
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const modal = (ref as MutableRefObject<HTMLDivElement | null>).current;

        if (modal) {
          const currentScrollY = modal.scrollTop;
          const isScrollingDown = currentScrollY > lastScrollY;

          if (isScrollingDown) {
            if (navClass !== "up") {
              setNavClass("up"); // Immediately hide navbar when starting to scroll down
            }
          } else {
            if (currentScrollY <= 100) {
              if (navClass !== "default") {
                setNavClass("default"); // Revert to "top" when scrolled back to the very top
              }
            } else if (navClass !== "scrolled-up") {
              setNavClass("scrolled-up"); // Show "scrolled-up" when scrolling up but not yet at the top
            }
          }
          setLastScrollY(currentScrollY); // Update last scroll position for next comparison
        }
      };

      const modal = (ref as MutableRefObject<HTMLDivElement | null>).current;
      modal?.addEventListener("scroll", handleScroll);

      return () => {
        modal?.removeEventListener("scroll", handleScroll);
      };
    }, [lastScrollY, navClass, ref]);

    const project = portfolio.find((p) => p.id === projectId);

    if (!project) {
      return <div>Project not found</div>;
    }

    return (
      <div ref={ref} className="gallery-item" style={style}>
        <div className="gallery-item__content">
          <div className="gallery-item__wrapper">
            <div className="gallery-item__details">
              <div className="gallery-item__description">
                <div
                  // className="gallery-item__description-content"
                  className={`gallery-item__description-content ${navClass}`}
                >
                  <div className="gallery-item__description-center">
                    <div className="gallery-item__client">
                      <span>My Role: </span>
                      {project.myRole}
                    </div>
                    <div className="gallery-item__outcome">
                      <span>Project Description: </span>
                      {project.description}
                    </div>
                    <div className="gallery-item__skills">
                      <p>Skills and deliverables: </p>
                      <div className="gallery-item__skills-tags-wrapper">
                        {project.tags?.map((tag, i) => (
                          <div key={i} className="gallery-item__skills-tag">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="gallery-item__skills">
                      <p>Tools: </p>
                      <div className="gallery-item__skills-tags-wrapper">
                        {project.toolsUsed?.map((tag, i) => (
                          <div key={i} className="gallery-item__skills-tag">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
              <div className="gallery-item__images">
                {project.items.map((item, index) => (
                  <div key={index} className="gallery-item__image-container">
                    <img
                      src={item.url}
                      alt={item.alt || "Portfolio image"}
                      className="gallery-item__image"
                    />
                    <p className="gallery-item__image-description">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default GalleryItem;
