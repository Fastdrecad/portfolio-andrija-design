import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/common";
import { usePortfolioForm } from "@/hooks/usePortfolioForm";
import { usePortfolioUpload } from "@/hooks/usePortfolioUpload";
import {
  MyRoleType,
  PortfolioItem,
  SelectOption
} from "@/types/portfolioTypes";
import { useCallback, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

interface PortfolioFormProps {
  onSubmit: (data: PortfolioItem) => Promise<void>;
  isLoading: boolean;
  initialData?: PortfolioItem;
  submitButtonText?: string;
}

interface FileMetadata {
  alt: string;
  desc: string;
}

export const PortfolioForm = ({
  onSubmit,
  isLoading,
  initialData,
  submitButtonText = "Create Project"
}: PortfolioFormProps) => {
  const {
    errors,
    register,
    handleSubmit,
    setValue,
    getValues,
    handleInputChange,
    handleSelectChange,
    roleOptions,
    tagOptions,
    toolOptions,
    handleCreate,
    resetForm
  } = usePortfolioForm(initialData);

  const {
    uploadProgress,
    selectedImages,
    setSelectedImages,
    resetUpload,
    handleUpload
  } = usePortfolioUpload();

  const [isValid, setIsValid] = useState(false);
  const [fileMetadata, setFileMetadata] = useState<
    Record<string, FileMetadata>
  >({});

  useEffect(() => {
    const checkValidity = () => {
      setIsValid(Object.keys(errors).length === 0);
    };
    checkValidity();
  }, [errors]);

  const handleImagesSelected = useCallback(
    (images: File[]) => {
      setSelectedImages(images);
    },
    [setSelectedImages]
  );

  const handleImageDetailsUpdate = useCallback(
    (index: number, field: "alt" | "desc", value: string) => {
      const file = selectedImages[index];
      if (!file) return;

      setFileMetadata((prev) => ({
        ...prev,
        [file.name]: {
          ...prev[file.name],
          [field]: value
        }
      }));
    },
    [selectedImages]
  );

  const submitHandler = handleSubmit(async (data) => {
    try {
      if (selectedImages.length === 0) {
        toast.error("Please select at least one image");
        return;
      }

      console.log("Selected images before upload:", selectedImages);

      // Upload images first
      const uploadedImages = await handleUpload(selectedImages);
      console.log("Uploaded images:", uploadedImages);

      // Map uploaded images to portfolio item format, including metadata
      const projectImages = uploadedImages.map((img, index) => {
        const originalFile = selectedImages[index];
        const metadata = fileMetadata[originalFile.name] || {
          alt: "",
          desc: ""
        };

        return {
          url: img.secure_url,
          desc: metadata.desc || "",
          alt: metadata.alt || data.projectName
        };
      });

      // Create the project payload with first image as the thumbnail
      const projectPayload = {
        ...data,
        items: projectImages,
        url: projectImages[0].url,
        alt: projectImages[0].alt || data.projectName
      };

      await onSubmit(projectPayload);
      resetForm();
      resetUpload();
      setFileMetadata({});
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Submission failed. Please try again.");
    }
  });

  return (
    <form className="portfolio-manager__form" onSubmit={submitHandler}>
      <div className="form-group">
        <label>Project Name *</label>
        <input
          {...register("projectName", { required: true })}
          onChange={handleInputChange}
        />
        {errors.projectName && (
          <span className="error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label>Title *</label>
        <input
          {...register("title", { required: true })}
          onChange={handleInputChange}
        />
        {errors.title && <span className="error">This field is required</span>}
      </div>

      <div className="form-group">
        <label>Category *</label>
        <select
          {...register("category", { required: true })}
          onChange={(e) => handleSelectChange("category", [e.target.value])}
        >
          <option value="Product Design">Product Design</option>
          <option value="3D Rendering">3D Rendering</option>
          <option value="CAD">CAD</option>
          <option value="Furniture Design">Furniture Design</option>
        </select>
        {errors.category && (
          <span className="error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label>Client</label>
        <input {...register("client")} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>Client URL</label>
        <input {...register("clientUrl")} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label>My Role *</label>
        <CreatableSelect
          isMulti
          options={roleOptions}
          className="react-select-container"
          classNamePrefix="react-select"
          {...register("myRole", {
            required: "Please select at least one role"
          })}
          onChange={(selected) => {
            const values = selected
              ? (selected as SelectOption[]).map(
                  (option) => option.value as MyRoleType
                )
              : [];
            handleSelectChange("myRole", values);
          }}
          onCreateOption={(inputValue) => {
            try {
              const result = handleCreate(inputValue, "myRole");
              if (!result.isValid) {
                toast.error(result.message);
                return;
              }
              const currentRoles = getValues("myRole") as MyRoleType[];
              setValue("myRole", [...currentRoles, inputValue as MyRoleType]);
            } catch (error) {
              toast.error((error as Error).message);
            }
          }}
          formatOptionLabel={(option: SelectOption) =>
            `${option.isNew ? `${option.label} (new)` : option.label}`
          }
          placeholder="Select or create roles..."
        />
        {errors.myRole && (
          <span className="error">{errors.myRole.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Tags *</label>
        <CreatableSelect
          isMulti
          options={tagOptions}
          className="react-select-container"
          classNamePrefix="react-select"
          {...register("tags", { required: true })}
          onChange={(selected) => {
            const values = selected
              ? selected.map((option) => option.value)
              : [];
            setValue("tags", values);
          }}
          onCreateOption={(inputValue) => handleCreate(inputValue, "tags")}
          placeholder="Select or create tags..."
        />
        {errors.tags && (
          <span className="error">Please select at least one tag</span>
        )}
      </div>

      <div className="form-group">
        <label>Tools Used *</label>
        <CreatableSelect
          isMulti
          options={toolOptions}
          className="react-select-container"
          classNamePrefix="react-select"
          {...register("toolsUsed", { required: true })}
          onChange={(selected) => {
            const values = selected
              ? selected.map((option) => option.value)
              : [];
            setValue("toolsUsed", values);
          }}
          onCreateOption={(inputValue) => handleCreate(inputValue, "toolsUsed")}
          placeholder="Select or create tools..."
        />
        {errors.toolsUsed && (
          <span className="error">Please select at least one tool</span>
        )}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          {...register("description")}
          rows={5}
          onChange={handleInputChange}
        />
      </div>

      {/* Image uploader */}
      <ImageUploader
        selectedImages={selectedImages}
        onImagesSelected={handleImagesSelected}
        uploadProgress={uploadProgress}
        onDetailsChange={handleImageDetailsUpdate}
        metadata={fileMetadata}
        isUpdateMode={!!initialData}
      />

      <Button
        type="submit"
        disabled={!isValid}
        loading={isLoading}
        className="portfolio-manager__form-button"
      >
        {isLoading ? "SAVING..." : submitButtonText}
      </Button>
    </form>
  );
};
