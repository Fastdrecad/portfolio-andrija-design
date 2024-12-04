import { Request, Response } from "express";
import { CustomError } from "../lib/CustomError";
import asyncHandler from "../middleware/asyncHandler";
import { Portfolio } from "../models/Portfolio";

// Get all projects
export const getProjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await Portfolio.find().sort({ createdAt: -1 });

    if (!projects || projects.length === 0) {
      throw new CustomError("No projects found", 404, true);
    }

    res.json(projects);
  }
);

// Get single project by ID
export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Portfolio.findById(req.params.id);

    if (!project) {
      throw new CustomError("Project not found", 404);
    }

    res.json(project);
  }
);

// Create new project
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    // Proactive validation (e.g. checking required fields)
    const { projectName, title, category, myRole } = req.body;
    if (!projectName || !title || !category || !myRole) {
      throw new CustomError("Missing required fields", 400);
    }

    const project = new Portfolio(req.body);

    await project.save();
    res.status(201).json(project);
  }
);

// Update project
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    if (Object.keys(req.body).length === 0) {
      throw new CustomError("No fields provided to update", 400);
    }

    const project = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!project) {
      throw new CustomError("Project not found", 404);
    }

    res.json(project);
  }
);

// Delete project
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Portfolio.findByIdAndDelete(req.params.id);

    if (!project) {
      throw new CustomError("Project not found", 404);
    }

    res.status(204).send();
  }
);
