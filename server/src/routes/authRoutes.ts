import express from "express";
import { authController } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", authController.login);
router.get("/verify", authenticate, authController.verify);

export default router;
