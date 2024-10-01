export interface DesignProcessItem {
  id: number;
  number: string;
  process: string;
  img: string;
  desc: string;
  color: string;
  alt: string;
}

export interface DesignProcessBoxProps {
  index: number;
  item: {
    id: number;
    number: string;
    process: string;
    img: string;
    desc: string;
    color: string;
    alt: string;
  };
}

export interface DesignProcessStep {
  process: string;
  desc: string;
  img: string;
  id: number;
}
