import { PortfolioFormData } from "../schemas/portfolioSchema";
import { Image, MyRoleType, PortfolioItemProps } from "../types/portfolioTypes";

type CategoryType =
  | "Product Design"
  | "3D Rendering"
  | "CAD"
  | "Furniture Design";

// Helper function to ensure category type safety
const validateCategory = (value: string): CategoryType => {
  const validCategories = [
    "Product Design",
    "3D Rendering",
    "CAD",
    "Furniture Design"
  ] as const;

  if (!validCategories.includes(value as CategoryType)) {
    throw new Error(`Invalid category: ${value}`);
  }
  return value as CategoryType;
};

// Helper function to transform image data
const transformImageData = (image: {
  url: string;
  desc?: string;
  alt?: string;
}): Image => ({
  url: image.url,
  desc: image.desc || "",
  alt: image.alt || ""
});

export const transformFormDataToApi = (
  formData: PortfolioFormData
): Partial<PortfolioItemProps> => {
  return {
    projectName: formData.projectName,
    title: formData.title,
    category: [validateCategory(formData.category.value)],
    client: formData.client || "",
    clientUrl: formData.clientUrl || "",
    myRole: formData.myRole.map((role) => role.value as MyRoleType),
    description: formData.description || "",
    tags: formData.tags.map((tag) => tag.value),
    toolsUsed: formData.toolsUsed.map((tool) => tool.value),
    items: formData.items.map(transformImageData)
  };
};

export const transformApiDataToForm = (
  apiData: PortfolioItemProps
): PortfolioFormData => {
  return {
    projectName: apiData.projectName,
    title: apiData.title,
    category: {
      value: apiData.category[0],
      label: apiData.category[0]
    },
    client: apiData.client,
    clientUrl: apiData.clientUrl,
    myRole: apiData.myRole.map((role) => ({
      value: role,
      label: role
    })),
    description: apiData.description,
    tags: apiData.tags.map((tag) => ({
      value: tag,
      label: tag
    })),
    toolsUsed: apiData.toolsUsed.map((tool) => ({
      value: tool,
      label: tool
    })),
    items: apiData.items
  };
};
