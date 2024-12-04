import express from "express";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject
} from "../controllers/portfolioController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Protected routes
router.post("/", authenticate, createProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;
