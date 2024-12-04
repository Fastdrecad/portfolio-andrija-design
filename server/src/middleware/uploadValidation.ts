import { NextFunction, Request, Response } from "express";

export const validateUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  if (
    req.headers["content-length"] &&
    parseInt(req.headers["content-length"]) > MAX_FILE_SIZE
  ) {
    return res.status(413).json({
      message: "File too large. Maximum size is 5MB"
    });
  }

  next();
};
