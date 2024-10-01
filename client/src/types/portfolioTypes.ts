export interface PortfolioItemType {
  id: number;
  title: string;
  projectName: string;
  url: string;
  category: string;
  description: string;
  items: { url: string; desc: string }[];
}

export interface PortfolioItemProps {
  id: number;
  title: string;
  description: string;
  projectName: string;
  url: string;
  category: string;
  alt?: string;
  items: { url: string; desc: string; alt?: string }[];
  className?: string;
  index: number;
  isModal: boolean;
  newlyLoadedStartIndex?: number;
}
