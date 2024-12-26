import { PortfolioItemProps } from "@/types/portfolioTypes";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ProjectCardProps {
  project: PortfolioItemProps;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard = ({
  project,
  onEdit,
  onDelete
}: ProjectCardProps) => {
  if (!project._id) return null;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (project._id) {
      onEdit(project._id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (project._id) {
      onDelete(project._id);
    }
  };

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
      <div
        className="project-card__actions"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="edit-btn"
          onClick={handleEdit}
          aria-label="Edit project"
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
          aria-label="Delete project"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
