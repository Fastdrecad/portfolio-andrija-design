import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../lib/CustomError";
import asyncHandler from "./asyncHandler";

// Define custom interface extending Request
interface AuthRequest extends Request {
  user?: jwt.JwtPayload;
}

export const authenticate = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is provided, throw a CustomError
    if (!token) {
      throw new CustomError("No token provided", 401, true);
    }

    // Ensure that JWT_SECRET is defined in the environment variables
    if (!process.env.JWT_SECRET) {
      throw new CustomError(
        "Server misconfiguration: JWT_SECRET is not defined",
        500
      );
    }

    try {
      // Verify token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded as jwt.JwtPayload;
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      // If token is invalid or expired, throw a CustomError
      throw new CustomError("Invalid token", 401);
    }
  }
);
