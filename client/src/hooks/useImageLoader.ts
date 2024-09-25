import { useEffect, useState } from "react";

interface UseImageLoaderProps {
  src: string;
}

interface ImageLoaderOutput {
  imageSrc: string;
  loaded: boolean;
}

const useImageLoader = (
  { src }: UseImageLoaderProps,
  delay = 0
): ImageLoaderOutput => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        setImageSrc(src);
        setLoaded(true);
      };

      img.onerror = () => {
        setImageSrc("path_to_error_image.jpg");
        setLoaded(false);
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [src, delay]);

  return { imageSrc, loaded };
};

export default useImageLoader;
