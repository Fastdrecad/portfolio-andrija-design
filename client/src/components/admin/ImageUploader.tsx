import { ImageFile } from "@/types/portfolioTypes";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

interface ImageUploaderProps {
  selectedImages: ImageFile[];
  onImagesSelected: (files: ImageFile[]) => void;
  uploadProgress?: Record<string, number>;
  onDetailsChange?: (index: number, field: string, value: string) => void;
}

const ImageUploader = ({
  selectedImages,
  onImagesSelected,
  uploadProgress = {},
  onDetailsChange = () => {}
}: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles
        .filter((file) => /^image\/(jpeg|png|webp)$/.test(file.type))
        .map((file) => {
          const imageFile: ImageFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
            alt: "",
            desc: ""
          });
          return imageFile;
        });

      if (validFiles.length !== acceptedFiles.length) {
        console.warn(
          "Some files were rejected. Only JPG, PNG and WebP allowed."
        );
      }

      onImagesSelected([...selectedImages, ...validFiles]);
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
    maxSize: 20 * 1024 * 1024,
    multiple: true,
    noClick: false,
    noKeyboard: false
  });

  const handleRemoveImage = (index: number) => {
    const newImages = [...selectedImages];
    if (newImages[index].preview) {
      URL.revokeObjectURL(newImages[index].preview!);
    }
    newImages.splice(index, 1);
    onImagesSelected(newImages);
  };

  const handleDetailsChange = (
    index: number,
    field: "alt" | "desc",
    value: string
  ) => {
    onDetailsChange(index, field, value);
  };

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
                  src={file.preview || URL.createObjectURL(file)}
                  alt={file.alt || `Preview ${index + 1}`}
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
                    value={(file as ImageFile).desc || ""}
                    onChange={(e) =>
                      handleDetailsChange(index, "desc", e.target.value)
                    }
                    placeholder="Enter description..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`alt-${index}`}>Alt Text</label>
                  <input
                    type="text"
                    id={`alt-${index}`}
                    value={(file as ImageFile).alt || ""}
                    onChange={(e) =>
                      handleDetailsChange(index, "alt", e.target.value)
                    }
                    placeholder="Enter alt text..."
                  />
                </div>
              </div>

              {uploadProgress[file.name] !== undefined && (
                <div className="upload-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress[file.name]}%` }}
                  />
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
