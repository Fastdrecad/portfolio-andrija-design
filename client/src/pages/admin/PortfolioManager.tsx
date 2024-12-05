import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { PortfolioGrid } from "@/components/admin/PortfolioGrid";
import { SuccessMessage } from "@/components/admin/SuccessMessage";
import {
  useAddProjectMutation,
  useGetProjectsQuery
} from "@/redux/services/portfolioApi";
import { PortfolioItem } from "@/types/portfolioTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PortfolioManager = () => {
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();
  const [addProject, { isLoading: isSubmitting }] = useAddProjectMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleProjectSubmit = async (formData: PortfolioItem) => {
    try {
      await addProject(formData).unwrap();
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create project";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="portfolio-manager">
      <h2>Manage Portfolio Projects</h2>

      <PortfolioForm onSubmit={handleProjectSubmit} isLoading={isSubmitting} />

      <SuccessMessage
        isVisible={isSuccess}
        onClose={() => setIsSuccess(false)}
        onViewPortfolio={() => navigate("/portfolio")}
      />

      {!isProjectsLoading && projects && <PortfolioGrid projects={projects} />}
    </div>
  );
};

export default PortfolioManager;
