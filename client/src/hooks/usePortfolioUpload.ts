import { uploadToCloudinary } from "@/services/uploadService";
import { CloudinaryResponse } from "@/types/cloudinaryTypes";
import { ImageFile } from "@/types/portfolioTypes";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export const usePortfolioUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [imageDetails, setImageDetails] = useState<
    Record<number, { alt?: string; desc?: string }>
  >({});

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Handle file upload with retry mechanism
  const handleUpload = useCallback(
    async (
      files: ImageFile[],
      retryCount = 0
    ): Promise<CloudinaryResponse[]> => {
      try {
        const uploadedImages = await uploadToCloudinary(
          files,
          (fileName: string, progress: number) => {
            setUploadProgress((prev) => ({ ...prev, [fileName]: progress }));
          }
        );

        return uploadedImages;
      } catch (error) {
        console.error("Upload error:", error);

        if (retryCount < MAX_RETRIES) {
          toast.info(
            `Retrying upload... Attempt ${retryCount + 1} of ${MAX_RETRIES}`
          );
          await sleep(RETRY_DELAY);
          return handleUpload(files, retryCount + 1);
        }

        const errorMessage =
          (error as AxiosError<ErrorResponse>)?.response?.data?.message ||
          "Upload failed after multiple attempts";

        toast.error(errorMessage);
        throw error;
      }
    },
    []
  );

  // Update image details (alt text or description)
  const handleImageDetailsChange = useCallback(
    (index: number, field: "alt" | "desc", value: string) => {
      console.log(
        `Updating image details for index ${index}, field ${field}, value ${value}`
      );
      setImageDetails((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [field]: value
        }
      }));
    },
    []
  );

  // Reset all upload-related state
  const resetUpload = useCallback(() => {
    setSelectedImages([]);
    setUploadProgress({});
    setImageDetails({});
  }, []);

  return {
    uploadProgress,
    selectedImages,
    imageDetails,
    setSelectedImages,
    handleImageDetailsChange,
    handleUpload,
    resetUpload
  };
};
