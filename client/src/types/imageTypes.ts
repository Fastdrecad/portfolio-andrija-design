export interface ImageProps {
  src: string;
  placeholder?: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  loading?: "lazy" | "eager" | undefined;
  srcSet?: string;
  sizes?: string;
}