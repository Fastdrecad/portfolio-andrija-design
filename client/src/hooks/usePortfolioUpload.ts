import { uploadToCloudinary } from "@/services/cloudinaryUpload";
import { CloudinaryResponse } from "@/types/cloudinaryTypes";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export const usePortfolioUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleUpload = useCallback(
    async (files: File[], retryCount = 0): Promise<CloudinaryResponse[]> => {
      try {
        setIsUploading(true);
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
      } finally {
        setIsUploading(false);
        setUploadProgress({});
      }
    },
    []
  );

  return {
    isUploading,
    uploadProgress,
    handleUpload
  };
};
