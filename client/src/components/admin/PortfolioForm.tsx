import { Button } from "@/components/common";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FormState,
  useForm
} from "react-hook-form";
import { FaBars, FaTimes } from "react-icons/fa";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import {
  categoryOptions,
  defaultRoleOptions,
  ImageType,
  PortfolioFormData
} from "../../schemas/portfolioSchema";
import { Tags, Tools } from "../../types/portfolioTypes";
import { ImageUploader } from "./ImageUploader";

const DraggableImageList = ({
  items,
  removeImage,
  updateImageDetails
}: {
  items: ImageType[];
  removeImage: (index: number) => void;
  updateImageDetails: (index: number, details: Partial<ImageType>) => void;
}) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setEnabled(true);
    });

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId="portfolio-images">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="portfolio-form__selected-images"
        >
          {items.map((image, index) => (
            <Draggable
              key={`draggable-${index}`}
              draggableId={`draggable-${index}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className={`image-uploader__image-item ${
                    snapshot.isDragging ? "dragging" : ""
                  }`}
                  style={{
                    ...provided.draggableProps.style
                  }}
                >
                  <div className="image-uploader__image-container">
                    <img
                      src={image.url}
                      alt={image.alt || ""}
                      className="image-uploader__image"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="image-uploader__remove-button"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="image-uploader__image-overlay">
                    <div className="image-uploader__details">
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
                    <div className="image-uploader__details">
                      <label>Alt text</label>
                      <input
                        type="text"
                        placeholder="Alt text"
                        value={image.alt || ""}
                        onChange={(e) =>
                          updateImageDetails(index, {
                            ...image,
                            alt: e.target.value
                          })
                        }
                      />
                    </div>
                  </div>

                  <div
                    {...provided.dragHandleProps}
                    className="image-uploader__drag-handle"
                  >
                    <FaBars size={20} />
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

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
  onSubmit: (data: PortfolioFormData) => Promise<void>;
  items: ImageType[];
  addImages: (images: ImageType[]) => void;
  removeImage: (index: number) => void;
  updateImageDetails: (index: number, details: Partial<ImageType>) => void;
  formState: FormState<PortfolioFormData>;
  isLoading?: boolean;
  isEditing?: boolean;
  initialData?: PortfolioFormData;
}

export const PortfolioForm = ({
  control,
  errors,
  isSubmitting,
  onSubmit,
  items,
  addImages,
  removeImage,
  updateImageDetails,
  formState: { isValid },
  initialData,
  isLoading = false,
  isEditing = false
}: PortfolioFormProps) => {
  const { reset } = useForm<PortfolioFormData>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  if (isLoading) {
    return <div className="portfolio-form__loading">Loading form data...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as PortfolioFormData;
    onSubmit(data);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(destinationIndex, 0, removed);

    // Update all items with the new order
    reorderedItems.forEach((item, index) => {
      updateImageDetails(index, item);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="portfolio-form">
      {/* Project Name */}
      <div className="portfolio-form__field">
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <div>
              <label>Project Name *</label>
              <input {...field} type="text" />
              {errors.projectName && (
                <p className="portfolio-form__error">
                  {errors.projectName.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Title */}
      <div className="portfolio-form__field">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div>
              <label>Title *</label>
              <input {...field} type="text" />
              {errors.title && (
                <p className="portfolio-form__error">{errors.title.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Category */}
      <div className="portfolio-form__field">
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
                <p className="portfolio-form__error">
                  {errors.category.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* My Role */}
      <div className="portfolio-form__field">
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
                <p className="portfolio-form__error">{errors.myRole.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Tools Used */}
      <div className="portfolio-form__field">
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
                <p className="portfolio-form__error">
                  {errors.toolsUsed.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Tags */}
      <div className="portfolio-form__field">
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
                <p className="portfolio-form__error">{errors.tags.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Client & Client URL */}
      <div className="portfolio-form__field portfolio-form__field--grid">
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
                <p className="portfolio-form__error">
                  {errors.clientUrl.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Description */}
      <div className="portfolio-form__field">
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

      {/* Image Preview with Drag and Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <DraggableImageList
          items={items}
          removeImage={removeImage}
          updateImageDetails={updateImageDetails}
        />
      </DragDropContext>

      {/* Image Uploader */}
      <div className="portfolio-form__field">
        <label>Images *</label>
        <ImageUploader
          onImagesUploaded={addImages}
          isSubmitting={isSubmitting}
        />
        {errors.items && (
          <p className="portfolio-form__error">{errors.items.message}</p>
        )}
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
