import { NextFunction, Request, Response } from "express";
import { CustomError } from "../lib/CustomError.js";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.path === "/favicon.ico") {
    res.status(204).end();
    return;
  }

  next(new CustomError(`Not Found - ${req.originalUrl}`, 404));
};
