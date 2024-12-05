import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { CloudinaryResponse } from "../types/cloudinary.types";

dotenv.config();

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

// Validate configuration
const validateConfig = (): CloudinaryConfig => {
  const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  };

  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new Error(
      "Missing Cloudinary credentials. Please check your environment variables."
    );
  }

  return config as CloudinaryConfig;
};

// Initialize with validation
const config = validateConfig();
cloudinary.config({
  ...config,
  secure: true
});

export const uploadToCloudinary = async (
  buffer: Buffer
): Promise<CloudinaryResponse> => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    throw new Error(
      "Missing Cloudinary credentials. Please check your environment variables."
    );
  }

  return new Promise<CloudinaryResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "portfolio-andrija",
          resource_type: "auto",
          format: "webp",
          quality: "auto:good",
          fetch_format: "auto",
          flags: "lossy",
          transformation: [
            {
              width: 1920,
              crop: "limit",
              quality: "auto:good"
            }
          ],
          eager: [
            {
              format: "webp",
              quality: "auto:good"
            },
            {
              format: "jpg",
              quality: 80
            }
          ],
          eager_async: true
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) {
            const response: CloudinaryResponse = {
              ...result,
              folder: "portfolio-andrija"
            };
            resolve(response);
          }
        }
      )
      .end(buffer);
  });
};
