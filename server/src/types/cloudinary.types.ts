import { UploadApiResponse } from "cloudinary";

export interface CloudinaryResponse extends UploadApiResponse {
  folder: string;
  eager?: Array<{
    format: string;
    url: string;
    secure_url: string;
  }>;
}
