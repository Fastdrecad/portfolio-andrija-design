import { portfolio } from "@/data/portfolioData";

import { PortfolioItemType } from "@/types/portfolioTypes";

export const filterPortfolioByCategory = (
  category: string
): PortfolioItemType[] => {
  switch (category.toLowerCase()) {
    case "rendering":
      return portfolio.filter((el) => el.category === "3D Rendering");
    case "cad":
      return portfolio.filter((el) => el.category === "CAD");
    case "furniture":
      return portfolio.filter((el) => el.category === "Furniture Design");
    case "animation":
      return portfolio.filter((el) => el.category === "3D Animation");
    case "product":
      return portfolio.filter((el) => el.category === "Product Design");
    default:
      return portfolio;
  }
};
