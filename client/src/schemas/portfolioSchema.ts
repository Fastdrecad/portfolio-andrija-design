import { z } from "zod";

// Define the image schema
const imageSchema = z.object({
  url: z.string().min(1, "Image URL is required"),
  desc: z.string().optional(),
  alt: z.string().optional()
});

export type ImageType = z.infer<typeof imageSchema>;

// Define category options
export const categoryOptions = [
  { value: "Product Design", label: "Product Design" },
  { value: "3D Rendering", label: "3D Rendering" },
  { value: "CAD", label: "CAD" },
  { value: "Furniture Design", label: "Furniture Design" }
] as const;

// Define role options with the ability to create new ones
export const defaultRoleOptions = [
  { value: "Furniture Designer", label: "Furniture Designer" },
  { value: "3D Modeler", label: "3D Modeler" },
  { value: "CAD Specialist", label: "CAD Specialist" },
  { value: "Product Designer", label: "Product Designer" },
  { value: "3D Artist", label: "3D Artist" }
] as const;

// Portfolio schema for form validation
export const portfolioSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  title: z.string().min(1, "Title is required"),
  category: z.object({
    value: z.string(),
    label: z.string()
  }),
  client: z.string().optional(),
  clientUrl: z.string().url().optional().or(z.literal("")),
  myRole: z
    .array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    )
    .min(1, "At least one role is required"),
  description: z.string().optional(),
  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    )
    .min(1, "At least one tag is required"),
  toolsUsed: z
    .array(
      z.object({
        value: z.string(),
        label: z.string()
      })
    )
    .min(1, "At least one tool is required"),
  items: z.array(imageSchema).min(1, "At least one image is required")
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
export type PortfolioFormInitialData = Partial<PortfolioFormData>;
