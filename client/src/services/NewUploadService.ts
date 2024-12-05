import axios, { AxiosProgressEvent } from "axios";

const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

uploadApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type ProgressCallback = (fileName: string, progress: number) => void;

export const uploadToCloudinary = async (
  files: File[],
  onProgress?: ProgressCallback
) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await uploadApi.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        files.forEach((file) => {
          onProgress(file.name, progress);
        });
      }
    }
  });

  return response.data;
};
