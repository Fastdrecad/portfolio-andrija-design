import { Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import { promisify } from "util";
import { CustomError } from "../lib/CustomError";
import asyncHandler from "../middleware/asyncHandler";
import { uploadToCloudinary } from "../services/uploadService";

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  }
}).array("image", 10);

// Promisify Multer middleware
const uploadMiddleware = promisify(upload);

export const uploadImage = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // Await Multer upload middleware
    await uploadMiddleware(req, res);

    const files = req.files as Express.Multer.File[];
    if (!files?.length) {
      throw new CustomError("No files uploaded", 400); // Use CustomError for better error handling
    }

    const uploadPromises = files.map(async (file) => {
      try {
        const processedBuffer = await sharp(file.buffer)
          .resize(1920, null, {
            withoutEnlargement: true,
            fit: "inside"
          })
          .toBuffer();

        // Upload to Cloudinary and return the result
        return await uploadToCloudinary(processedBuffer);
      } catch (error) {
        console.error(`Error processing file: ${file.originalname}`, error);
        throw new CustomError("Error processing image", 500); // Custom error for processing issues
      }
    });

    // Wait for all files to finish uploading
    const results = await Promise.all(uploadPromises);

    // Respond with the Cloudinary results
    res.json(results);
  }
);
