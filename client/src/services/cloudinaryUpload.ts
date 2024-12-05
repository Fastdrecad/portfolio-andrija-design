import { ERROR_MESSAGES, UPLOAD_CONSTANTS } from "@/constants/upload.constants";
import { CloudinaryResponse } from "@/types/cloudinaryTypes";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadToCloudinary = async (
  files: File[],
  onProgress?: (fileName: string, progress: number) => void
): Promise<CloudinaryResponse[]> => {
  try {
    // Validate file sizes before upload
    const oversizedFiles = files.filter(
      (file) => file.size > UPLOAD_CONSTANTS.MAX_FILE_SIZE
    );

    if (oversizedFiles.length > 0) {
      const maxSizeMB = UPLOAD_CONSTANTS.MAX_FILE_SIZE / (1024 * 1024);
      const errorMessage = oversizedFiles
        .map(
          (file) =>
            `${file.name}: ${ERROR_MESSAGES.FILE_TOO_LARGE(
              UPLOAD_CONSTANTS.MAX_FILE_SIZE
            )}`
        )
        .join("\n");

      toast.error(
        `Some files exceed the ${maxSizeMB}MB limit:\n${errorMessage}`
      );
      throw new Error("Files too large");
    }

    // Calculate total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > UPLOAD_CONSTANTS.MAX_TOTAL_SIZE) {
      toast.error(ERROR_MESSAGES.TOTAL_SIZE_EXCEEDED);
      throw new Error("Total size exceeded");
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("image", file);
    });

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          files.forEach((file) => {
            onProgress(file.name, percentCompleted);
          });
        }
      }
    });

    return response.data;
  } catch (error) {
    console.error("Upload error details:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        toast.error("Please login to upload images");
      } else if (error.response?.status === 413) {
        toast.error("File size too large. Maximum size is 20MB per file.");
      } else {
        toast.error(error.response?.data?.message || "Upload failed");
      }
    }
    throw error;
  }
};
