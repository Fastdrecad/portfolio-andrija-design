import { Request, Response } from "express";
import { Document } from "mongoose";
import slugify from "slugify";
import { CustomError } from "../lib/CustomError";
import asyncHandler from "../middleware/asyncHandler";
import { Portfolio } from "../models/Portfolio";
import mongoose from "mongoose";

const validateSlug = (slug: string) => {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug);
};

// Get all projects
export const getProjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await Portfolio.find().sort({ order: 1 });

    if (!projects || projects.length === 0) {
      throw new CustomError("No projects found", 404, true);
    }

    res.json(projects);
  }
);

// Get single project by id
export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await Portfolio.findById(id);
    res.json(project);
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

    let existingProject = await Portfolio.findOne({ slug });

    // If a project with the same slug exists, append a counter to make it unique
    if (existingProject) {
      let counter = 1;
      let newSlug = `${slug}-${counter}`;
      // Keep incrementing the counter until a unique slug is found
      while (await Portfolio.findOne({ slug: newSlug })) {
        counter++;
        newSlug = `${slug}-${counter}`;
      }
      slug = newSlug; // Set the unique slug
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

// Reorder projects
export const reorderProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const { sourceId, destinationId } = req.body;

    if (!sourceId || !destinationId) {
      throw new CustomError("Source and destination IDs are required", 400);
    }

    try {
      // Get both projects
      const sourceProject = await Portfolio.findById(sourceId);
      const destinationProject = await Portfolio.findById(destinationId);

      if (!sourceProject || !destinationProject) {
        throw new CustomError("One or both projects not found", 404);
      }

      // Get their current order values
      const sourceOrder = sourceProject.order;
      const destinationOrder = destinationProject.order;

      // Swap their order values
      const bulkOps = [
        {
          updateOne: {
            filter: { _id: sourceId },
            update: { $set: { order: destinationOrder } }
          }
        },
        {
          updateOne: {
            filter: { _id: destinationId },
            update: { $set: { order: sourceOrder } }
          }
        }
      ];

      // Execute the swap in a single atomic operation
      await Portfolio.bulkWrite(bulkOps);

      // Fetch and return the updated projects
      const updatedProjects = await Portfolio.find().sort({ order: 1 });
      res.json(updatedProjects);
    } catch (error) {
      console.error("Reorder error:", error);
      throw new CustomError("Failed to reorder projects", 500);
    }
  }
);

// Initialize order for existing projects
export const initializeProjectOrder = asyncHandler(
  async (_req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get all projects sorted by createdAt (oldest first)
      const projects = await Portfolio.find().sort({ createdAt: 1 });

      // Update each project with an order value
      await Promise.all(
        projects.map(async (project, index) => {
          await Portfolio.findByIdAndUpdate(
            project._id,
            { order: index },
            { session }
          );
        })
      );

      await session.commitTransaction();
      res.json({
        message: "Project order initialized successfully",
        count: projects.length
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
);
