import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { usePortfolioForm } from "@/hooks/usePortfolioForm";
import {
  useGetProjectBySlugQuery,
  useUpdateProjectMutation
} from "@/redux/services/portfolioApi";
import { PortfolioFormData } from "@/schemas/portfolioSchema";
import {
  transformApiDataToForm,
  transformFormDataToApi
} from "@/utils/formDataTransform";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPortfolioPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    data: project,
    isLoading,
    error,
    refetch
  } = useGetProjectBySlugQuery(slug!, {
    skip: !slug,
    refetchOnMountOrArgChange: true
  });

  const [updateProject] = useUpdateProjectMutation();

  useEffect(() => {
    if (slug) {
      refetch();
    }
  }, [slug, refetch]);

  const handleSubmit = async (data: PortfolioFormData) => {
    if (!project?._id) return;

    try {
      const apiData = transformFormDataToApi(data);
      await updateProject({ id: project._id, ...apiData }).unwrap();
      toast.success("Project updated successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to update project");
      console.error("Update error:", error);
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
    formState,
    handleSubmit: onSubmit
  } = usePortfolioForm({
    onSubmit: handleSubmit,
    isEditing: true,
    initialData: project ? transformApiDataToForm(project) : undefined
  });

  if (error) {
    return (
      <div className="edit-portfolio__error">
        <h2>Error loading project</h2>
        <p>Please try again later</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="edit-portfolio__error">
        <h2>Project not found</h2>
        <p>The requested project could not be found</p>
      </div>
    );
  }

  return (
    <div className="edit-portfolio">
      <div className="edit-portfolio__container">
        <div className="edit-portfolio__header">
          <h1>Edit Project: {project.projectName}</h1>
        </div>

        <PortfolioForm
          control={control}
          errors={errors}
          isSubmitting={isSubmitting}
          // @ts-expect-error React Hook Form submit handler type mismatch
          onSubmit={onSubmit}
          items={items}
          addImages={addImages}
          removeImage={removeImage}
          updateImageDetails={updateImageDetails}
          formState={formState}
          isLoading={isLoading}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default EditPortfolioPage;
