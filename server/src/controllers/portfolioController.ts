import { Request, Response } from "express";
import { Document } from "mongoose";
import slugify from "slugify";
import { CustomError } from "../lib/CustomError";
import asyncHandler from "../middleware/asyncHandler";
import { Portfolio } from "../models/Portfolio";

const validateSlug = (slug: string) => {
  const slugRegex = /^[a-z0-9]+$/;
  return slugRegex.test(slug);
};

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

// Get single project by slug
export const getProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const project = await Portfolio.findOne({ slug });

    if (!project) {
      throw new CustomError("Project not found", 404);
    }

    res.json(project);
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

    let slug = slugify(projectName, { lower: true, strict: true });

    if (!validateSlug(slug)) {
      throw new CustomError("Invalid slug format", 400);
    }

    const existingProject = await Portfolio.findOne({ slug });
    if (existingProject) {
      slug = `${slug}-${Date.now()}`;
    }

    const project = new Portfolio({ ...req.body, slug });

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

    const { id } = req.params;
    const updateData = req.body;

    const project = await Portfolio.findById(id);

    if (!project) {
      throw new CustomError("Project not found", 404);
    }

    if (updateData.projectName) {
      let newSlug = slugify(updateData.projectName, {
        lower: true,
        strict: true
      });

      const existingProject = await Portfolio.findOne({ slug: newSlug });
      if (existingProject) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      updateData.slug = newSlug;
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        (project as Document & { [key: string]: any })[key] = updateData[key];
      }
    });

    await project.save();

    res.status(200).json(project);
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
