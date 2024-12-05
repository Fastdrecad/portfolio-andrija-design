import { NewPortfolioForm } from "@/components/admin/NewPortfolioForm";
import { PortfolioGrid } from "@/components/admin/PortfolioGrid";
import { SuccessMessage } from "@/components/admin/SuccessMessage";
import { NewUsePortfolioForm } from "@/hooks/NewUsePortfolioForm";
import {
  useAddProjectMutation,
  useGetProjectByIdQuery,
  useGetProjectsQuery,
  useUpdateProjectMutation
} from "@/redux/services/portfolioApi";
import { PortfolioFormData } from "@/schemas/NewPortfolioSchema";
import {
  transformApiDataToForm,
  transformFormDataToApi
} from "@/utils/formDataTransform";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const NewPortfolioManager = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();
  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch existing data if editing
  const { data: existingProject, isLoading: isLoadingProject } =
    useGetProjectByIdQuery(id ?? "", { skip: !isEditing });

  const submitForm: SubmitHandler<PortfolioFormData> = async (data) => {
    try {
      const apiData = transformFormDataToApi(data);

      if (isEditing && id) {
        await updateProject({ id, ...apiData }).unwrap();
      } else {
        await addProject(apiData).unwrap();
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Failed to save portfolio:", error);
    }
  };

  const handleSuccessAction = () => {
    setIsSuccess(false);
    navigate("/portfolio");
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    navigate("/admin/dashboard");
  };

  const {
    control,
    errors,
    isSubmitting,
    items,
    addImages,
    removeImage,
    updateImageDetails,
    formState,
    handleSubmit
  } = NewUsePortfolioForm({
    onSubmit: submitForm,
    isEditing,
    initialData: existingProject
      ? transformApiDataToForm(existingProject)
      : undefined
  });

  if (isEditing && isLoadingProject) {
    return <div className="new-portfolio-manager__loading">Loading...</div>;
  }

  return (
    <div className="new-portfolio-manager">
      <div className="new-portfolio-manager__container">
        <div className="new-portfolio-manager__header">
          <h1>{isEditing ? "Edit Project" : "Create New Project"}</h1>
        </div>
        <NewPortfolioForm
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          items={items}
          addImages={addImages}
          removeImage={removeImage}
          updateImageDetails={updateImageDetails}
          formState={formState}
        />
      </div>
      <SuccessMessage
        isVisible={isSuccess}
        onClose={handleCloseSuccess}
        onViewPortfolio={handleSuccessAction}
      />

      {!isProjectsLoading && projects && <PortfolioGrid projects={projects} />}
    </div>
  );
};

export default NewPortfolioManager;
