import { ProjectCard } from "@/components/admin/ProjectCard";
import {
  portfolioApi,
  useDeleteProjectMutation,
  useReorderProjectsMutation
} from "@/redux/services/portfolioApi";
import { AppDispatch } from "@/redux/store";
import { PortfolioItemProps } from "@/types/portfolioTypes";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSwappingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PortfolioGridProps {
  projects: PortfolioItemProps[];
}

interface SortableProjectProps {
  project: PortfolioItemProps & { _id: string };
  onEdit: (slug: string) => void;
  onDelete: (id: string) => void;
}

const SortableProject = ({
  project,
  onEdit,
  onDelete
}: SortableProjectProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab"
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`project-card ${isDragging ? "is-dragging" : ""}`}
    >
      <ProjectCard project={project} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
};

export const PortfolioGrid = ({ projects }: PortfolioGridProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [deleteProject] = useDeleteProjectMutation();
  const [reorderProjects] = useReorderProjectsMutation();
  const [localProjects, setLocalProjects] =
    useState<PortfolioItemProps[]>(projects);
  const [showModal, setShowModal] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const handleEdit = async (id: string) => {
    const project = localProjects.find((p) => p._id === id);
    if (!project || !project.slug) {
      console.error("Project or slug not found");
      return;
    }

    try {
      await dispatch(
        portfolioApi.endpoints.getProjectBySlug.initiate(project.slug)
      ).unwrap();
      navigate(`/admin/dashboard/portfolio/edit/${project.slug}`);
    } catch (error) {
      console.error("Failed to prefetch project data:", error);
      navigate(`/admin/dashboard/portfolio/edit/${project.slug}`);
    }
  };

  const handleDeleteClick = (id: string) => {
    setProjectIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!projectIdToDelete) return;

    try {
      await deleteProject(projectIdToDelete).unwrap();
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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localProjects.findIndex((p) => p._id === active.id);
    const newIndex = localProjects.findIndex((p) => p._id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.error("Invalid indices:", {
        oldIndex,
        newIndex,
        activeId: active.id,
        overId: over.id
      });
      return;
    }

    // Create new array with swapped items
    const newProjects = Array.from(localProjects);
    const [removed] = newProjects.splice(oldIndex, 1);
    newProjects.splice(newIndex, 0, removed);

    // Optimistic update - immediately update UI
    setLocalProjects(newProjects);
    setHasUnsavedChanges(true);

    // Clear any existing save timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set a new timeout to save changes after user stops reordering
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await reorderProjects({
          sourceId: active.id as string,
          destinationId: over.id as string
        }).unwrap();

        toast.success("Project order saved successfully!");
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error("Failed to reorder projects:", error);
        toast.error("Failed to save project order. Please try again.");
        setLocalProjects(projects); // Revert to original order on error
        setHasUnsavedChanges(false);
      }
    }, 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Show warning if user tries to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        return "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const validProjects = localProjects.filter(
    (project): project is PortfolioItemProps & { _id: string } =>
      typeof project._id === "string"
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={validProjects.map((p) => p._id)}
          strategy={rectSwappingStrategy}
        >
          <div className="portfolio-manager__projects">
            {validProjects.map((project) => (
              <SortableProject
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {hasUnsavedChanges && (
        <div className="save-indicator">Unsaved changes...</div>
      )}

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
    </>
  );
};
