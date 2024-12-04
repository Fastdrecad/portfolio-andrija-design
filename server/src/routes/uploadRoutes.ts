import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import { authenticate } from "../middleware/authMiddleware";
import { validateUpload } from "../middleware/uploadValidation";

const router = Router();

router.post("/", authenticate, validateUpload, uploadImage);

export default router;
