import { PortfolioItem } from "@/types/portfolioTypes";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ProjectCardProps {
  project: PortfolioItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard = ({
  project,
  onEdit,
  onDelete
}: ProjectCardProps) => {
  if (!project._id) return null;

  return (
    <div className="project-card">
      <div className="project-card__image">
        <img src={project.url} alt={project.projectName} />
      </div>
      <div className="project-card__content">
        <h3>{project.projectName}</h3>
        <p>{project.title}</p>
        <div className="project-card__categories">
          {project.category.map((cat) => (
            <span key={cat} className="category-tag">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="project-card__actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.preventDefault();
            onEdit(project._id!);
          }}
          aria-label="Edit project"
        >
          <FaEdit />
        </button>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.preventDefault();
            onDelete(project._id!);
          }}
          aria-label="Delete project"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
