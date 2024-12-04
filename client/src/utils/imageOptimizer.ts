import { IMAGE_UPLOAD } from "@/constants/upload.constants";
import imageCompression from "browser-image-compression";

interface OptimizationOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
  maxIteration: number;
  initialQuality: number;
  alwaysKeepResolution: boolean;
  fileType?: string;
  preserveExif?: boolean;
}

const defaultOptions: OptimizationOptions = {
  maxSizeMB: IMAGE_UPLOAD.TARGET_FILE_SIZE_MB,
  maxWidthOrHeight: IMAGE_UPLOAD.MAX_WIDTH,
  useWebWorker: IMAGE_UPLOAD.WORKER.USE_WORKER,
  maxIteration: 10,
  initialQuality: IMAGE_UPLOAD.COMPRESSION_QUALITY,
  alwaysKeepResolution: false,
  fileType: "image/jpeg",
  preserveExif: false
};

// Kreiramo tip iz konstanti
type AllowedMimeType = (typeof IMAGE_UPLOAD.ALLOWED_TYPES)[number];

export const validateImage = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const valid =
        img.width >= IMAGE_UPLOAD.VALIDATION.MIN_WIDTH &&
        img.height >= IMAGE_UPLOAD.VALIDATION.MIN_HEIGHT &&
        img.width / img.height >= IMAGE_UPLOAD.VALIDATION.ASPECT_RATIO.MIN &&
        img.width / img.height <= IMAGE_UPLOAD.VALIDATION.ASPECT_RATIO.MAX;

      resolve(valid);
    };

    img.src = objectUrl;
  });
};

export const optimizeImage = async (
  file: File,
  options: Partial<OptimizationOptions> = {}
): Promise<File> => {
  // Provera veličine pre optimizacije
  if (file.size > IMAGE_UPLOAD.MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(
      `File size exceeds ${IMAGE_UPLOAD.MAX_FILE_SIZE_MB}MB limit`
    );
  }

  // Provera tipa fajla sa ispravnim tipom
  if (!IMAGE_UPLOAD.ALLOWED_TYPES.includes(file.type as AllowedMimeType)) {
    throw new Error(
      `Unsupported file type. Allowed types: ${IMAGE_UPLOAD.ALLOWED_EXTENSIONS.join(
        ", "
      )}`
    );
  }

  // Validacija dimenzija
  const isValid = await validateImage(file);
  if (!isValid) {
    throw new Error("Image dimensions do not meet requirements");
  }

  const optimizationOptions = {
    ...defaultOptions,
    ...options,
    onProgress: (progress: number) => {
      console.log(`Optimization progress: ${progress}%`);
    }
  };

  try {
    const optimizedFile = await imageCompression(file, optimizationOptions);

    // Provera da li je optimizacija stvarno smanjila veličinu
    if (optimizedFile.size >= file.size) {
      console.warn("Optimization did not reduce file size");
      return file;
    }

    return optimizedFile;
  } catch (error) {
    console.error("Image optimization failed:", error);
    return file;
  }
};
