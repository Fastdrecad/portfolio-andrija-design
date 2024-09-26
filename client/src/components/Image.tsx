import useImageLoader from "../hooks/useImageLoader";

interface ImageProps {
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

const Image: React.FC<ImageProps> = ({
  src,
  placeholder,
  alt,
  width,
  height,
  className,
  loading,
  srcSet,
  sizes
}) => {
  const { imageSrc, loaded } = useImageLoader({ src });

  const finalClassName = `${loaded ? "image-loaded" : "image-loading"} ${
    className || ""
  }`;

  return (
    <div style={{ width, height }}>
      {!loaded && (
        <div
          className={`image-loading ${
            className?.split(" ")[1] === "top" ? "top" : ""
          } `}
          style={{ width: "100%", height: "100%" }}
        ></div>
      )}

      <img
        src={loaded ? imageSrc : placeholder}
        srcSet={srcSet}
        sizes={sizes}
        loading={loading}
        alt={alt}
        className={finalClassName}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
};

export default Image;
