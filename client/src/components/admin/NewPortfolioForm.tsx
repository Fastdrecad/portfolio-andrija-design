import { Button } from "@/components/common";
import { Control, Controller, FieldErrors, FormState } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  categoryOptions,
  defaultRoleOptions,
  ImageType,
  PortfolioFormData
} from "../../schemas/NewPortfolioSchema";
import { Tags, Tools } from "../../types/portfolioTypes";
import { NewImageUploader } from "./NewImageUploader";

// Konvertujemo enume u opcije za react-select
const tagsOptions = Object.values(Tags).map((tag) => ({
  value: tag,
  label: tag
}));

const toolsOptions = Object.values(Tools).map((tool) => ({
  value: tool,
  label: tool
}));

interface PortfolioFormProps {
  control: Control<PortfolioFormData>;
  errors: FieldErrors<PortfolioFormData>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  items: ImageType[];
  addImages: (images: ImageType[]) => void;
  removeImage: (index: number) => void;
  updateImageDetails: (index: number, details: Partial<ImageType>) => void;
  formState: FormState<PortfolioFormData>;
  isLoading?: boolean;
  isEditing?: boolean;
}

export const NewPortfolioForm = ({
  control,
  errors,
  isSubmitting,
  onSubmit,
  items,
  addImages,
  removeImage,
  updateImageDetails,
  formState: { isValid },
  isLoading = false,
  isEditing = false
}: PortfolioFormProps) => {
  if (isLoading) {
    return (
      <div className="new-portfolio-form__loading">Loading form data...</div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="new-portfolio-form">
      {/* Project Name */}
      <div className="new-portfolio-form__field">
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <div>
              <label>Project Name *</label>
              <input {...field} type="text" />
              {errors.projectName && (
                <p className="new-portfolio-form__error">
                  {errors.projectName.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Title */}
      <div className="new-portfolio-form__field">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div>
              <label>Title *</label>
              <input {...field} type="text" />
              {errors.title && (
                <p className="new-portfolio-form__error">
                  {errors.title.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Category */}
      <div className="new-portfolio-form__field">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div>
              <label>Category *</label>
              <Select
                {...field}
                options={categoryOptions}
                isSearchable
                isClearable={false}
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {errors.category && (
                <p className="new-portfolio-form__error">
                  {errors.category.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* My Role */}
      <div className="new-portfolio-form__field">
        <Controller
          name="myRole"
          control={control}
          render={({ field }) => (
            <div>
              <label>My Role *</label>
              <CreatableSelect
                {...field}
                isMulti
                options={defaultRoleOptions}
                placeholder="Select or create roles"
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {errors.myRole && (
                <p className="new-portfolio-form__error">
                  {errors.myRole.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Tools Used */}
      <div className="new-portfolio-form__field">
        <Controller
          name="toolsUsed"
          control={control}
          render={({ field }) => (
            <div>
              <label>Tools Used *</label>
              <CreatableSelect
                {...field}
                isMulti
                options={toolsOptions}
                placeholder="Select or create tools"
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {errors.toolsUsed && (
                <p className="new-portfolio-form__error">
                  {errors.toolsUsed.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Tags */}
      <div className="new-portfolio-form__field">
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <div>
              <label>Tags *</label>
              <CreatableSelect
                {...field}
                isMulti
                options={tagsOptions}
                placeholder="Select or create tags"
                className="react-select-container"
                classNamePrefix="react-select"
              />
              {errors.tags && (
                <p className="new-portfolio-form__error">
                  {errors.tags.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Client & Client URL */}
      <div className="new-portfolio-form__field new-portfolio-form__field--grid">
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <div>
              <label>Client</label>
              <input {...field} type="text" />
            </div>
          )}
        />
        <Controller
          name="clientUrl"
          control={control}
          render={({ field }) => (
            <div>
              <label>Client URL</label>
              <input {...field} type="url" />
              {errors.clientUrl && (
                <p className="new-portfolio-form__error">
                  {errors.clientUrl.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Description */}
      <div className="new-portfolio-form__field">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div>
              <label>Description</label>
              <textarea {...field} rows={4} />
            </div>
          )}
        />
      </div>

      {/* Image Uploader */}
      <div className="new-portfolio-form__field">
        <label>Images *</label>
        <NewImageUploader
          onImagesUploaded={addImages}
          isSubmitting={isSubmitting}
        />
        {errors.items && (
          <p className="new-portfolio-form__error">{errors.items.message}</p>
        )}
      </div>

      {/* Image Preview */}
      <div className="new-portfolio-form__selected-images">
        {items.map((image, index) => (
          <div key={index} className="new-image-uploader__image-item">
            <div className="new-image-uploader__image-container">
              <img
                src={image.url}
                alt={image.alt || ""}
                className="new-image-uploader__image"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="new-image-uploader__remove-button"
              >
                <FaTimes />
              </button>
            </div>

            <div className="new-image-uploader__image-overlay">
              <div className="new-image-uploader__details">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  value={image.desc || ""}
                  onChange={(e) =>
                    updateImageDetails(index, {
                      ...image,
                      desc: e.target.value
                    })
                  }
                />
              </div>
              <div className="new-image-uploader__details">
                <label>Alt text</label>
                <input
                  type="text"
                  placeholder="Alt text"
                  value={image.alt || ""}
                  onChange={(e) =>
                    updateImageDetails(index, { ...image, alt: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="portfolio-button"
      >
        {isSubmitting ? (
          <>
            <span className="btn__loader" />
            <span>Saving...</span>
          </>
        ) : isEditing ? (
          "Update Project"
        ) : (
          "Create Project"
        )}
      </Button>
    </form>
  );
};
