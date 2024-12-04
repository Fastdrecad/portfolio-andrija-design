import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import portfolioRoutes from "./routes/portfolioRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import { emailService } from "./services/email.service";
import { EmailPayload } from "./types/email.types";

// Load environment variables - development takes precedence
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.development" });
} else {
  dotenv.config();
}

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log(chalk.green("✓ Connected to MongoDB")))
  .catch((err) => console.error(chalk.red("MongoDB connection error:"), err));

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:", "http:"],
        connectSrc: ["'self'", "https:", "http:"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

// Enhanced Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: "Too many login attempts, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting
app.use("/api/auth/login", authLimiter); // Stricter limit for login
app.use("/api/", apiLimiter); // General API rate limiting

// Enhanced CORS Configuration
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://portfolio.andrijadesign.com",
        "https://www.portfolio.andrijadesign.com"
      ]
    : ["http://localhost:5173", "http://localhost:3200"];

const corsOptions = {
  credentials: true,
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origin ${origin} not allowed by CORS`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/upload", uploadRoutes);

// Contact route
app.post("/api/contact", async (req, res) => {
  const payload = req.body as EmailPayload;
  const result = await emailService.sendEmail(payload);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation errors",
      details: result.errors
    });
  }

  return res.status(200).json({
    message: "Email sent successfully."
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Something broke!",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
);

// Global error handling
app.use(errorHandler);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(chalk.yellow(` Environment: ${process.env.NODE_ENV}`));
  console.log(chalk.green(`✓ Server is running on port ${chalk.blue(port)}`));
});

// Process event handlers
process.on("SIGINT", () => {
  console.log(chalk.red("Shutting down gracefully..."));
  process.exit();
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    chalk.red("Unhandled Rejection at:"),
    promise,
    chalk.red("reason:"),
    reason
  );
});
