import { CSSProperties, forwardRef } from "react";
import Image from "@/components/common/Image";
import { useGetProjectByIdQuery } from "@/redux/services/portfolioApi";

interface GalleryItemProps {
  projectId: string;
  style?: CSSProperties;
  effectiveNavbarHeight: number;
}

const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(
  (props, ref) => {
    const { projectId, style, effectiveNavbarHeight } = props;
    const { data: project } = useGetProjectByIdQuery(projectId);

    const formattedUrl = project?.clientUrl
      ? new URL(project?.clientUrl).host
      : "";

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
                  className="gallery-item__description-content"
                  style={{
                    top: `${effectiveNavbarHeight + 20}px`,
                    transition: "top 0.3s ease"
                  }}
                >
                  <div className="gallery-item__description-center">
                    <div className="gallery-item__client">
                      <span>My Role: </span>
                      {project.myRole.join(", ")}
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
                        {project.toolsUsed?.map((tool, i) => (
                          <div key={i} className="gallery-item__skills-tag">
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="gallery-item__client-link">
                      <a
                        className="underline"
                        href={project.clientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {formattedUrl}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gallery-item__images">
                {project.items.map((item, index) => (
                  <div key={index} className="gallery-item__image-container">
                    <Image
                      src={item.url}
                      alt={item.alt || "Portfolio image"}
                      className="gallery-item__image"
                      delay={800}
                      useLoader={true}
                      loading="lazy"
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
