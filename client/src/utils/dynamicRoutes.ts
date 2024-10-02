import { PortfolioItemType } from "@/types/portfolioTypes";
import { generateSlug } from "@/utils/slugUtils";
import { portfolio } from "@/data";

// Define the base URL for your sitemap
export const hostname = "https://www.portfolio.andrijadesign.com/";

// Generate dynamic routes based on portfolio items
export const dynamicRoutes = portfolio.map(
  (project: PortfolioItemType) =>
    `/portfolio/${generateSlug(project.projectName)}`
);
