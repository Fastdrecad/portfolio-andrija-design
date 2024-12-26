import { PortfolioItemProps } from "@/types/portfolioTypes";

type CategoryType =
  | "Product Design"
  | "3D Rendering"
  | "CAD"
  | "Furniture Design";

export const filterPortfolioByCategory = (
  category: string,
  portfolios: PortfolioItemProps[]
): PortfolioItemProps[] => {
  if (category.toLowerCase() === "all") {
    return portfolios;
  }

  const categoryMap: Record<string, CategoryType> = {
    product: "Product Design",
    rendering: "3D Rendering",
    cad: "CAD",
    furniture: "Furniture Design"
  };

  const mappedCategory = categoryMap[category.toLowerCase()];
  if (!mappedCategory) return portfolios;

  return portfolios.filter((item) => item.category.includes(mappedCategory));
};
