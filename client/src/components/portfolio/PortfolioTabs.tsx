import PortfolioList from "@/components/portfolio/PortfolioList";

// Define the shape of a category item
interface Category {
  id: string;
  title: string;
}

interface PortfolioTabsProps {
  categories: Category[]; // Array of category objects
  selected: string; // The id of the selected category
  handleTabChange: (id: string) => void; // Function to handle tab changes
}

const PortfolioTabs: React.FC<PortfolioTabsProps> = ({
  categories,
  selected,
  handleTabChange
}) => (
  <ul className="portfolio-page__tabs">
    {categories.map((item, i) => (
      <PortfolioList
        key={i}
        title={item.title}
        active={selected === item.id}
        setSelected={handleTabChange}
        id={item.id}
      />
    ))}
  </ul>
);

export default PortfolioTabs;
