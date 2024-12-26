import { usePortfolioUpload } from "@/hooks/usePortfolioUpload";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";

interface ImageUploaderProps {
  onImagesUploaded: (
    images: Array<{ url: string; desc?: string; alt?: string }>
  ) => void;
  isSubmitting?: boolean;
}

export const ImageUploader = ({
  onImagesUploaded,
  isSubmitting
}: ImageUploaderProps) => {
  const { isUploading, handleUpload } = usePortfolioUpload();

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    try {
      const uploadedImages = await handleUpload(acceptedFiles);
      const formattedImages = uploadedImages.map((img) => ({
        url: img.secure_url,
        desc: "",
        alt: ""
      }));
      onImagesUploaded(formattedImages);
      toast.success(`Successfully uploaded ${formattedImages.length} image(s)`);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    disabled: isSubmitting || isUploading,
    multiple: true,
    maxSize: 20971520, // 20MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach(({ file, errors }) => {
        if (errors[0]?.code === "file-too-large") {
          toast.error(`File ${file.name} is too large. Maximum size is 5MB`);
        } else {
          toast.error(
            `File ${file.name} was rejected. Only JPEG, PNG and WebP images are allowed`
          );
        }
      });
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`image-uploader__dropzone ${
        isDragActive ? "image-uploader__dropzone--active" : ""
      } ${
        isSubmitting || isUploading ? "image-uploader__dropzone--disabled" : ""
      }`}
    >
      <input {...getInputProps()} />
      <FaCloudUploadAlt className="upload-icon" />
      {isDragActive ? (
        <p>Drop the images here...</p>
      ) : (
        <div>
          <p>
            {isUploading
              ? "Uploading..."
              : "Drag & drop images here, or click to select"}
          </p>
          <small>JPG, PNG or WebP (max 20MB per file)</small>
        </div>
      )}
    </div>
  );
};
