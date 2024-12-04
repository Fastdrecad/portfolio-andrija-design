import { PortfolioForm } from "@/components/admin/PortfolioForm";
import { PortfolioGrid } from "@/components/admin/PortfolioGrid";
import { SuccessMessage } from "@/components/admin/SuccessMessage";
import { usePortfolioUpload } from "@/hooks/usePortfolioUpload";
import {
  useAddProjectMutation,
  useGetProjectsQuery
} from "@/redux/services/portfolioApi";
import { ImageFile, PortfolioItem } from "@/types/portfolioTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PortfolioManager = () => {
  // Fetch projects using RTK Query
  const { data: projects, isLoading, refetch } = useGetProjectsQuery();

  const [addProject] = useAddProjectMutation();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    uploadProgress,
    setUploadProgress,
    selectedImages,
    setSelectedImages,
    handleUpload
  } = usePortfolioUpload();

  const [imageDetails, setImageDetails] = useState<
    Record<number, { alt?: string; desc?: string }>
  >({});

  const handleImageDetailsChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setImageDetails((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value
      }
    }));

    const updatedImages = [...selectedImages];
    const imageFile = updatedImages[index] as ImageFile;
    if (imageFile) {
      imageFile[field as keyof Pick<ImageFile, "alt" | "desc">] = value;
      setSelectedImages(updatedImages);
    }
  };

  const handleSubmit = async (data: PortfolioItem, reset: () => void) => {
    try {
      if (!selectedImages.length) {
        toast.error("Please select at least one image");
        return;
      }

      const loadingToast = toast.loading("Creating project...");
      const uploadedImages = await handleUpload(selectedImages);

      // Map uploaded images with their details
      const items = uploadedImages.map((img, index) => ({
        url: img.secure_url,
        desc: imageDetails[index]?.desc || "",
        alt: imageDetails[index]?.alt || data.projectName // Fallback to project name if no alt text
      }));

      const projectPayload = {
        projectName: data.projectName,
        title: data.title,
        url: items[0].url,
        alt: data.projectName,
        category: Array.isArray(data.category)
          ? data.category
          : [data.category],
        client: data.client || "",
        clientUrl: data.clientUrl || "",
        myRole: Array.isArray(data.myRole) ? data.myRole : [data.myRole],
        description: data.description || "",
        tags: data.tags || [],
        toolsUsed: data.toolsUsed || [],
        items
      };

      await addProject(projectPayload).unwrap();
      await refetch();

      toast.update(loadingToast, {
        render: "Project created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });

      reset();
      setIsSuccess(true);
      setSelectedImages([]);
      setUploadProgress({});
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Reset image details when form is reset
      setImageDetails({});
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="portfolio-manager">
      <h2>Manage Portfolio Projects</h2>
      <PortfolioForm
        isLoading={isLoading}
        onSubmit={handleSubmit}
        selectedImages={selectedImages}
        onImagesSelected={setSelectedImages}
        uploadProgress={uploadProgress}
        onImageDetailsChange={handleImageDetailsChange}
      />
      <SuccessMessage
        isVisible={isSuccess}
        onClose={() => setIsSuccess(false)}
        onViewPortfolio={() => navigate("/portfolio")}
      />

      {projects && <PortfolioGrid projects={projects} />}
    </div>
  );
};

export default PortfolioManager;
