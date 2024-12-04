import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../lib/CustomError";
import asyncHandler from "../middleware/asyncHandler";
import { User } from "../models/User";

interface AuthRequest extends Request {
  user?: jwt.JwtPayload; // Add `user` property with the type of `jwt.JwtPayload`
}

export const authController = {
  // Login endpoint
  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Provera da li korisnik postoji
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Invalid credentials", 401);
    }

    // Provera passworda
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError("Invalid credentials", 401);
    }

    // Generisanje JWT tokena
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );

    res.json({
      user: { email: user.email },
      token
    });
  }),

  // Verify token endpoint
  verify: asyncHandler(async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user!.userId).select("-password");

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    res.json(user);
  })
};
