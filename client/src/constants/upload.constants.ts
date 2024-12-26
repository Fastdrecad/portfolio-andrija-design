export const UPLOAD_CONSTANTS = {
  MAX_FILES: 10,
  MAX_FILE_SIZE: 30 * 1024 * 1024, // 30MB za inicijalni unos
  ACCEPTED_TYPES: {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"]
  },
  CLOUDINARY_FORMATS: {
    primary: "webp",
    fallback: "jpg"
  },
  MAX_TOTAL_SIZE: 100 * 1024 * 1024 // 100MB ukupno
} as const;

export const ERROR_MESSAGES = {
  TOO_MANY_FILES: `Maximum ${UPLOAD_CONSTANTS.MAX_FILES} images allowed`,
  FILE_TOO_LARGE: (size: number) =>
    `File exceeds ${size / (1024 * 1024)}MB limit`,
  INVALID_TYPE: "Only JPG, PNG and WebP images are allowed",
  TOTAL_SIZE_EXCEEDED: "Total size of all images exceeds 100MB"
} as const;

export const IMAGE_UPLOAD = {
  // Maksimalne dimenzije
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1080,

  // Maksimalne veličine fajlova
  MAX_FILE_SIZE_MB: 20, // 20MB pre kompresije
  TARGET_FILE_SIZE_MB: 1, // Nakon kompresije i dalje ciljamo na 1MB
  MAX_TOTAL_SIZE_MB: 100, // Ukupno dozvoljeno 100MB pre kompresije

  // Dozvoljeni formati kao union type
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp"],

  // Kvalitet kompresije (0-1)
  COMPRESSION_QUALITY: 0.8,

  // Cloudinary transformacije
  CLOUDINARY: {
    EAGER_TRANSFORMATIONS: [
      { width: 1920, height: 1080, crop: "limit", format: "webp" },
      { width: 960, height: 540, crop: "limit", format: "webp" } // Thumbnail
    ],
    FOLDER: "portfolio",
    TAGS: ["portfolio"]
  },

  // Web Worker konfiguracija
  WORKER: {
    USE_WORKER: true,
    WORKER_THREADS: navigator.hardwareConcurrency || 4
  },

  // Validacija
  VALIDATION: {
    MIN_WIDTH: 800,
    MIN_HEIGHT: 600,
    ASPECT_RATIO: {
      MIN: 1, // Minimum 1:1
      MAX: 2.5 // Maximum 2.5:1
    }
  }
} as const;
