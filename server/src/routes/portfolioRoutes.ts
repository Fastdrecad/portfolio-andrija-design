import express from "express";

import {
  createProject,
  deleteProject,
  getProjectBySlug,
  getProjects,
  updateProject,
  reorderProjects,
  initializeProjectOrder
} from "../controllers/portfolioController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.get("/:slug", getProjectBySlug);
router.get("/", getProjects);

// Protected routes
router.post("/", authenticate, createProject);
router.put("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, deleteProject);
router.post("/reorder", authenticate, reorderProjects);
router.post("/initialize-order", authenticate, initializeProjectOrder);

export default router;
