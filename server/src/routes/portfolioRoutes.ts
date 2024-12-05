import express from "express";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjectBySlug,
  getProjects,
  updateProject
} from "../controllers/portfolioController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/id/:id", getProjectById);
router.get("/slug/:slug", getProjectBySlug);
router.get("/", getProjects);

// Protected routes
router.post("/", authenticate, createProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);

export default router;
