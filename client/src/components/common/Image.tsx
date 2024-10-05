import useImageLoader from "@/hooks/useImageLoader";

import { ImageProps } from "@/types/imageTypes";

const Image: React.FC<ImageProps> = ({
  src,
  placeholder,
  alt,
  width,
  height,
  className,
  loading,
  srcSet,
  sizes,
  useLoader = false,
  delay = 0
}) => {
  const { imageSrc, loaded } = useImageLoader({ src, useLoader, delay });

  const finalClassName = `image ${loaded ? "image-loaded" : "image-loading"} ${
    className ? className : ""
  }`.trim();

  return (
    <div style={{ width, height }} className="image-container">
      {/* Always render the image element */}
      {!loaded && (
        <div
          className={`image-loading ${
            className?.split(" ")[1] === "top" ? "top" : ""
          } `}
          style={{ width: "100%", height: "100%" }}
        ></div>
      )}
      <img
        src={!loaded && placeholder ? placeholder : imageSrc}
        alt={alt}
        className={finalClassName}
        style={{ opacity: loaded ? 1 : 0, width, height }}
        loading={loading}
        srcSet={srcSet}
        sizes={sizes}
      />
    </div>
  );
};

export default Image;
