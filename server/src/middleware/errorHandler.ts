import { NextFunction, Request, Response } from "express";
import winston from "winston";
import { CustomError } from "../lib/CustomError.js";

// Winston Logger Setup
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "errors.log" }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Error Handler Middleware
const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode =
    err.statusCode >= 100 && err.statusCode <= 599 ? err.statusCode : 500;

  const isProduction = process.env.NODE_ENV === "production";

  // Log the error details with Winston
  logger.error({
    message: err.message,
    statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const response = {
    success: false,
    error: {
      statusCode,
      message: isProduction
        ? err.isOperational
          ? err.message // Show specific messages for user-facing errors
          : "Internal Server Error" // Generic message for unexpected errors
        : err.message, // Detailed error messages in development
      ...(isProduction ? {} : { stack: err.stack }) // Include stack trace in development
    },
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  };

  res.status(statusCode).json(response);
};

export { errorHandler };
