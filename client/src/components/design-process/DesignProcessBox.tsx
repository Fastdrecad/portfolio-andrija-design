import DesignProcessImage from "@/components/design-process/DesignProcessImage";

import { DesignProcessBoxProps } from "@/types/designProcessTypes";

const DesignProcessBox: React.FC<DesignProcessBoxProps> = ({ index, item }) => {
  return (
    <div className="design-process-box" id={`${index + 1}`}>
      <div className="process-num">
        <span className="num" style={{ color: `${item.color}` }}>
          {item.number}
        </span>
        <h4>{item.process}</h4>
      </div>
      <DesignProcessImage item={item} />
      <div className="process-desc">
        <p>{item.desc}</p>
      </div>
    </div>
  );
};

export default DesignProcessBox;
