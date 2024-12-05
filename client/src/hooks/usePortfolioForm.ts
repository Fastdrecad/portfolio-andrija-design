import { useSelectOptions } from "@/hooks/useSelectOptions";
import { MyRole, PortfolioItem } from "@/types/portfolioTypes";
import { useForm } from "react-hook-form";

// Helper function to return the default form data
const getDefaultFormData = (): Omit<PortfolioItem, "_id"> => ({
  projectName: "",
  title: "",
  url: "",
  alt: "",
  category: ["Product Design"],
  client: "",
  clientUrl: "",
  myRole: [],
  description: "",
  tags: [],
  toolsUsed: [],
  items: []
});

export const usePortfolioForm = (initialData?: PortfolioItem) => {
  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm<PortfolioItem>({
    defaultValues: initialData || getDefaultFormData()
  });

  // Get select options
  const { roleOptions, tagOptions, toolOptions, handleCreate } =
    useSelectOptions(setValue, getValues);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof PortfolioItem, value);
  };

  // Handle select changes
  const handleSelectChange = (
    field: keyof Pick<
      PortfolioItem,
      "category" | "myRole" | "tags" | "toolsUsed"
    >,
    value: string[] | MyRole[]
  ) => {
    setValue(field, value);
  };

  // Reset form
  const resetForm = () => {
    reset(getDefaultFormData());
  };

  return {
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
  };
};
