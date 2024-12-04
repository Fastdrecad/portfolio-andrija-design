import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);

  // Dodajemo f_auto za automatsku detekciju formata
  const optimizedSrc = `${src.replace("/upload/", "/upload/f_auto,q_auto/")}`;

  return (
    <picture>
      {!error && (
        <>
          {/* WebP verzija */}
          <source
            srcSet={optimizedSrc.replace("/upload/", "/upload/f_webp/")}
            type="image/webp"
          />
          {/* Fallback na original */}
          <img
            src={optimizedSrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
          />
        </>
      )}
      {error && (
        <img
          src="/images/fallback-image.png"
          alt={`Failed to load ${alt}`}
          className={className}
        />
      )}
    </picture>
  );
};
