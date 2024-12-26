import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PortfolioFormData, portfolioSchema } from "../schemas/portfolioSchema";

interface UsePortfolioFormProps {
  initialData?: Partial<PortfolioFormData>;
  onSubmit: SubmitHandler<PortfolioFormData>;
  isEditing?: boolean;
}

export const usePortfolioForm = ({
  initialData,
  onSubmit,
  isEditing = false
}: UsePortfolioFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control, reset, formState, setValue, watch } =
    useForm<PortfolioFormData>({
      resolver: zodResolver(portfolioSchema),
      mode: "onChange",
      defaultValues: {
        projectName: initialData?.projectName || "",
        title: initialData?.title || "",
        category: initialData?.category || { value: "", label: "" },
        client: initialData?.client || "",
        clientUrl: initialData?.clientUrl || "",
        myRole: initialData?.myRole || [
          { value: "Furniture Designer", label: "Furniture Designer" }
        ],
        description: initialData?.description || "",
        tags: initialData?.tags || [],
        toolsUsed: initialData?.toolsUsed || [],
        items: initialData?.items || []
      }
    });

  const items = watch("items");

  const handleFormSubmit: SubmitHandler<PortfolioFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      toast.success(
        `Portfolio ${isEditing ? "updated" : "created"} successfully!`
      );
      if (!isEditing) {
        reset();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImages = (
    newImages: Array<{ url: string; desc?: string; alt?: string }>
  ) => {
    const currentItems = watch("items") || [];
    setValue("items", [...currentItems, ...newImages], {
      shouldValidate: true
    });
  };

  const removeImage = (index: number) => {
    const currentItems = watch("items") || [];
    setValue(
      "items",
      currentItems.filter((_, i: number) => i !== index),
      { shouldValidate: true }
    );
  };

  const updateImageDetails = (
    index: number,
    details: { desc?: string; alt?: string }
  ) => {
    const currentItems = watch("items") || [];
    const updatedItems = currentItems.map((item, i: number) =>
      i === index ? { ...item, ...details } : item
    );
    setValue("items", updatedItems, { shouldValidate: true });
  };

  const reorderItems = (sourceIndex: number, destinationIndex: number) => {
    const currentItems = [...(watch("items") || [])];
    const [removed] = currentItems.splice(sourceIndex, 1);
    currentItems.splice(destinationIndex, 0, removed);
    setValue("items", currentItems, { shouldValidate: true });
  };

  return {
    register,
    control,
    errors: formState.errors,
    isSubmitting,
    items,
    addImages,
    removeImage,
    updateImageDetails,
    reorderItems,
    reset,
    formState,
    handleSubmit: handleSubmit(handleFormSubmit)
  };
};
