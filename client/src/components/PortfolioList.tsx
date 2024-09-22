interface PortfolioListProps {
  id: string;
  title: string;
  active: boolean;
  setSelected: (id: string) => void;
}

const PortfolioList: React.FC<PortfolioListProps> = ({
  id,
  title,
  active,
  setSelected
}) => {
  return (
    <li
      className={`portfolio-list ${active ? 'active' : ''}`}
      onClick={() => setSelected(id)}
    >
      {title}
    </li>
  );
};

export default PortfolioList;
