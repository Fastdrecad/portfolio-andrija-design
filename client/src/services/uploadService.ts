import { CloudinaryResponse } from "@/types/cloudinaryTypes";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadToCloudinary = async (
  files: File[],
  onProgress?: (fileName: string, progress: number) => void
): Promise<CloudinaryResponse[]> => {
  try {
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
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        toast.error("Please login to upload images");
      } else {
        toast.error(error.response?.data?.message || "Upload failed");
      }
    }
    throw error;
  }
};
