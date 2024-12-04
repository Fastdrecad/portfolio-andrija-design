import { uploadToCloudinary } from "@/services/uploadService";
import { CloudinaryResponse } from "@/types/cloudinaryTypes";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface ErrorResponse {
  message: string;
}

export const usePortfolioUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleUpload = async (
    files: File[],
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
      throw new Error(errorMessage);
    }
  };

  const resetUpload = () => {
    setSelectedImages([]);
    setUploadProgress({});
  };

  return {
    uploadProgress,
    selectedImages,
    setSelectedImages,
    setUploadProgress,
    handleUpload,
    resetUpload
  };
};
