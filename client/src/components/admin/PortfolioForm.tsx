import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/common";
import { SelectOption, useSelectOptions } from "@/hooks/useSelectOptions";
import { PortfolioItem } from "@/types/portfolioTypes";
import { useForm } from "react-hook-form";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

interface PortfolioFormProps {
  onSubmit: (data: PortfolioItem, reset: () => void) => Promise<void>;
  selectedImages?: File[];
  onImagesSelected?: (files: File[]) => void;
  uploadProgress?: Record<string, number>;
  isLoading: boolean;
  initialData?: PortfolioItem;
  submitButtonText?: string;
  onImageDetailsChange?: (index: number, field: string, value: string) => void;
}

export const PortfolioForm = ({
  onSubmit,
  selectedImages = [],
  onImagesSelected = () => {},
  uploadProgress = {},
  isLoading,
  initialData,
  submitButtonText = "Create Project",
  onImageDetailsChange = () => {}
}: PortfolioFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues
  } = useForm<PortfolioItem>({
    mode: "onChange",
    defaultValues: initialData
  });

  const { roleOptions, tagOptions, toolOptions, handleCreate } =
    useSelectOptions(setValue, getValues);

  const resetForm = () => {
    reset();
    setValue("myRole", []);
    setValue("tags", []);
    setValue("toolsUsed", []);
  };

  const submitHandler = handleSubmit((data) => onSubmit(data, resetForm));

  const handleRoleChange = (
    selected: MultiValue<SelectOption<string>> | null
  ) => {
    const values = selected
      ? selected.map(
          (option) =>
            option.value as
              | "Furniture Designer"
              | "3D Modeler"
              | "CAD Specialist"
              | "Product Designer"
              | "3D Artist"
        )
      : [];
    setValue("myRole", values);
  };

  return (
    <form className="portfolio-manager__form" onSubmit={submitHandler}>
      <div className="form-group">
        <label>Project Name *</label>
        <input {...register("projectName", { required: true })} />
        {errors.projectName && (
          <span className="error">This field is required</span>
        )}
      </div>

      <div className="form-group">
        <label>Title *</label>
        <input {...register("title", { required: true })} />
        {errors.title && <span className="error">This field is required</span>}
      </div>

      <div className="form-group">
        <label>Category *</label>
        <select {...register("category", { required: true })}>
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
        <input {...register("client")} />
      </div>

      <div className="form-group">
        <label>Client URL</label>
        <input {...register("clientUrl")} />
      </div>

      <div className="form-group">
        <label>My Role *</label>
        <CreatableSelect
          isMulti
          options={roleOptions}
          className="react-select-container"
          classNamePrefix="react-select"
          {...register("myRole", { required: true })}
          onChange={handleRoleChange}
          placeholder="Select roles..."
        />
        {errors.myRole && (
          <span className="error">Please select at least one role</span>
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
          onCreateOption={(inputValue) => handleCreate(inputValue, "tag")}
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
          onCreateOption={(inputValue) => handleCreate(inputValue, "tool")}
          placeholder="Select or create tools..."
        />
        {errors.toolsUsed && (
          <span className="error">Please select at least one tool</span>
        )}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea {...register("description")} rows={5} />
      </div>

      {/* Image uploader */}
      <ImageUploader
        selectedImages={selectedImages}
        onImagesSelected={onImagesSelected}
        uploadProgress={uploadProgress}
        onDetailsChange={onImageDetailsChange}
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
