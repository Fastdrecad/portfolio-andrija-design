import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { SuccessMessage } from "@/components/admin/SuccessMessage";
import { usePortfolioForm } from "@/hooks/usePortfolioForm";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation
} from "@/redux/services/portfolioApi";
import { PortfolioFormData } from "@/schemas/portfolioSchema";
import {
  transformApiDataToForm,
  transformFormDataToApi
} from "@/utils/formDataTransform";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PortfolioEditManager = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: project, isLoading: isLoadingProject } = useGetProjectByIdQuery(
    id ?? ""
  );
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  useEffect(() => {
    if (!id) {
      navigate("/admin/dashboard");
      toast.error("No project ID provided");
    }
  }, [id, navigate]);

  const handleProjectUpdate = async (formData: PortfolioFormData) => {
    if (!id) return;

    try {
      const apiData = transformFormDataToApi(formData);
      await updateProject({ id, ...apiData }).unwrap();
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Project updated successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update project";
      toast.error(errorMessage);
    }
  };

  const {
    control,
    errors,
    isSubmitting,
    items,
    addImages,
    removeImage,
    updateImageDetails,
    formState
  } = usePortfolioForm({
    initialData: project ? transformApiDataToForm(project) : undefined,
    onSubmit: handleProjectUpdate,
    isEditing: true
  });

  if (isLoadingProject) {
    return <div>Loading project details...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="portfolio-edit-manager">
      <h2>Edit Portfolio Project</h2>

      <PortfolioForm
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleProjectUpdate}
        items={items}
        addImages={addImages}
        removeImage={removeImage}
        updateImageDetails={updateImageDetails}
        formState={formState}
        isLoading={isUpdating}
        initialData={transformApiDataToForm(project)}
        isEditing={true}
      />

      <SuccessMessage
        isVisible={isSuccess}
        onClose={() => setIsSuccess(false)}
        onViewPortfolio={() => navigate("/portfolio")}
      />
    </div>
  );
};

export default PortfolioEditManager;
