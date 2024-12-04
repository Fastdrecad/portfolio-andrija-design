import { ProjectCard } from "@/components/admin/ProjectCard";
import { useDeleteProjectMutation } from "@/redux/services/portfolioApi";
import { PortfolioItem } from "@/types/portfolioTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PortfolioGridProps {
  projects: PortfolioItem[];
}

export const PortfolioGrid = ({ projects }: PortfolioGridProps) => {
  const navigate = useNavigate();
  const [deleteProject] = useDeleteProjectMutation();
  const [localProjects, setLocalProjects] = useState<PortfolioItem[]>(projects);
  const [showModal, setShowModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null
  );

  // Update local projects when props change
  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const handleEdit = (id: string) => {
    navigate(`/admin/dashboard/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setProjectIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!projectIdToDelete) return;

    try {
      await deleteProject(projectIdToDelete).unwrap();
      // Update local state immediately
      setLocalProjects((prev) =>
        prev.filter((project) => project._id !== projectIdToDelete)
      );
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project. Please try again.");
    } finally {
      setShowModal(false);
      setProjectIdToDelete(null);
    }
  };

  return (
    <div className="portfolio-manager__projects">
      {localProjects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete Project</h2>
            <p>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="btn-danger">
                Delete Project
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setProjectIdToDelete(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
