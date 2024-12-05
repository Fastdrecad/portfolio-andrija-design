import { usePortfolioUpload } from "@/hooks/usePortfolioUpload";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

interface ImageUploaderProps {
  selectedImages: File[];
  onImagesSelected: (files: File[]) => void;
  uploadProgress: Record<string, number>;
  onDetailsChange: (
    index: number,
    field: "alt" | "desc",
    value: string
  ) => void;
  metadata: Record<string, { alt: string; desc: string }>;
  isUpdateMode?: boolean;
}

interface ImageMetadata {
  preview: string;
  alt: string;
  desc: string;
}

const ImageUploader = ({
  selectedImages,
  onImagesSelected,
  uploadProgress,
  onDetailsChange,
  isUpdateMode
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { resetUpload } = usePortfolioUpload();
  const [imageMetadata, setImageMetadata] = useState<
    Record<string, ImageMetadata>
  >({});

  // Effect to update previews when selectedImages changes
  useEffect(() => {
    // Create new previews for any images that don't have them
    selectedImages.forEach((file) => {
      if (!imageMetadata[file.name]?.preview) {
        setImageMetadata((prev) => ({
          ...prev,
          [file.name]: {
            preview: URL.createObjectURL(file),
            alt: "",
            desc: ""
          }
        }));
      }
    });

    // Cleanup unused previews
    Object.entries(imageMetadata).forEach(([fileName, metadata]) => {
      if (
        !selectedImages.some((file) => file.name === fileName) &&
        metadata.preview
      ) {
        URL.revokeObjectURL(metadata.preview);
        setImageMetadata((prev) => {
          const newMetadata = { ...prev };
          delete newMetadata[fileName];
          return newMetadata;
        });
      }
    });
  }, [selectedImages, imageMetadata]);

  // Validate and add images to the selected list
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // First, check for valid file types
      const validFiles = acceptedFiles.filter((file) =>
        /^image\/(jpeg|png|webp)$/.test(file.type)
      );

      // Create a map to track all files by their lowercase names
      const fileMap = new Map<string, { file: File; isDuplicate: boolean }>();

      // First, add existing files to the map
      selectedImages.forEach((file) => {
        fileMap.set(file.name.toLowerCase(), { file, isDuplicate: false });
      });

      // Then process new files
      validFiles.forEach((file) => {
        const lowerCaseName = file.name.toLowerCase();
        if (fileMap.has(lowerCaseName)) {
          // Mark as duplicate
          fileMap.set(lowerCaseName, {
            file,
            isDuplicate: true
          });
        } else {
          // Add new file
          fileMap.set(lowerCaseName, { file, isDuplicate: false });
        }
      });

      // Separate files into duplicates and new files
      const duplicates: File[] = [];
      const newFiles: File[] = [];

      // Process all files
      fileMap.forEach(({ file, isDuplicate }) => {
        if (isDuplicate && validFiles.includes(file)) {
          duplicates.push(file);
        } else if (!isDuplicate && validFiles.includes(file)) {
          newFiles.push(file);
        }
      });

      // Handle duplicate files
      if (duplicates.length > 0) {
        const duplicateNames = duplicates
          .map((file) => `"${file.name}"`)
          .join(", ");
        toast.warning(`Cannot add duplicate files: ${duplicateNames}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark"
        });
      }

      // Handle new valid files
      if (newFiles.length > 0) {
        // Create previews for new files
        newFiles.forEach((file) => {
          setImageMetadata((prev) => ({
            ...prev,
            [file.name]: {
              preview: URL.createObjectURL(file),
              alt: "",
              desc: ""
            }
          }));
        });

        onImagesSelected([...selectedImages, ...newFiles]);

        // Show success message for added files
        const addedNames = newFiles.map((file) => `"${file.name}"`).join(", ");
        toast.success(`Successfully added ${addedNames}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
      }

      // Handle invalid file types
      const invalidFiles = acceptedFiles.filter(
        (file) => !/^image\/(jpeg|png|webp)$/.test(file.type)
      );
      if (invalidFiles.length > 0) {
        const invalidNames = invalidFiles
          .map((file) => `"${file.name}"`)
          .join(", ");
        toast.error(
          `Invalid file type(s): ${invalidNames}. Only JPG, PNG and WebP files are allowed.`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
          }
        );
      }
    },
    [selectedImages, onImagesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"]
    },
    maxSize: 20 * 1024 * 1024, // 20MB max
    multiple: true,
    noClick: false,
    noKeyboard: false
  });

  const handleRemoveImage = useCallback(
    (index: number) => {
      try {
        const fileToRemove = selectedImages[index];
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        onImagesSelected(updatedImages);

        toast.success(`Removed ${fileToRemove.name}`, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark"
        });
      } catch (error) {
        console.error("Error removing image:", error);
        toast.error("Failed to remove image", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark"
        });
      }
    },
    [selectedImages, onImagesSelected]
  );

  // Update metadata when details change
  const handleDetailsChange = (
    index: number,
    field: "alt" | "desc",
    value: string
  ) => {
    const file = selectedImages[index];
    setImageMetadata((prev) => ({
      ...prev,
      [file.name]: {
        ...prev[file.name],
        [field]: value
      }
    }));
    onDetailsChange(index, field, value);
  };

  useEffect(() => {
    // Reset the upload progress and images when switching to update mode
    if (isUpdateMode) {
      resetUpload();
    }
  }, [isUpdateMode, resetUpload]);

  return (
    <div className="image-uploader">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        <FaCloudUploadAlt className="upload-icon" />
        <p>
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop images here, or click to select"}
        </p>
        <small>JPG, PNG or WebP (max 20MB per file)</small>
      </div>

      {selectedImages.length > 0 && (
        <div className="selected-images">
          {selectedImages.map((file, index) => (
            <div key={`${file.name}-${index}`} className="image-preview">
              <div className="image-preview__image-container">
                <img
                  src={imageMetadata[file.name]?.preview}
                  alt={imageMetadata[file.name]?.alt || `Preview ${index + 1}`}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="remove-image"
                  type="button"
                  aria-label="Remove image"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="image-preview__details">
                <div className="form-group">
                  <label htmlFor={`desc-${index}`}>Description</label>
                  <textarea
                    id={`desc-${index}`}
                    value={imageMetadata[file.name]?.desc || ""}
                    placeholder="Enter description..."
                    onChange={(e) =>
                      handleDetailsChange(index, "desc", e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`alt-${index}`}>Alt Text</label>
                  <input
                    type="text"
                    id={`alt-${index}`}
                    value={imageMetadata[file.name]?.alt || ""}
                    placeholder="Enter alt text..."
                    onChange={(e) =>
                      handleDetailsChange(index, "alt", e.target.value)
                    }
                  />
                </div>
              </div>

              {uploadProgress[file.name] && (
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar__filler"
                      style={{ width: `${uploadProgress[file.name]}%` }}
                    />
                  </div>
                  <span>{uploadProgress[file.name]}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
