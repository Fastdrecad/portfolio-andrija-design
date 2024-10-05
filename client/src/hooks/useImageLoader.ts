import { useEffect, useState } from "react";

interface UseImageLoaderProps {
  src: string;
  useLoader: boolean;
  delay?: number;
}

interface ImageLoaderOutput {
  imageSrc: string;
  loaded: boolean;
}

const useImageLoader = ({
  src,
  useLoader = true,
  delay = 0
}: UseImageLoaderProps): ImageLoaderOutput => {
  const [imageSrc, setImageSrc] = useState<string>(useLoader ? "" : src);
  const [loaded, setLoaded] = useState<boolean>(!useLoader);

  useEffect(() => {
    if (!useLoader) {
      setImageSrc(src);
      setLoaded(true);
      return;
    }

    // Set delay timer before starting to load the image
    const timer = setTimeout(() => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        setImageSrc(src);
        setLoaded(true);
      };

      img.onerror = () => {
        console.error("Failed to load image:", src);
        setImageSrc("path_to_error_image.jpg");
        setLoaded(false);
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [src, delay, useLoader]);

  return { imageSrc, loaded };
};

export default useImageLoader;
