import { v2 as cloudinary } from "cloudinary";
import keys from "../config/keys.js";

const { cloudName, apiKey, apiSecret } = keys.cloudinary;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

export default cloudinary;
