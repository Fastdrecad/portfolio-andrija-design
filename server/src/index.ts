import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import { emailService } from "./services/email.service";
import { EmailPayload } from "./types/email.types";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
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
  maxAge: 600
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

app.use("/api/", limiter);

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

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

// Start server
const port = process.env.PORT || 3000;

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

// Server initialization
app.listen(port, () => {
  console.log(chalk.yellow(`🔥 Environment: ${process.env.NODE_ENV}`));
  console.log(chalk.green(`✓ Server is running on port ${chalk.blue(port)}`));
});

// Process event handlers
process.on("SIGINT", () => {
  console.log(chalk.red("Shutting down gracefully..."));
  process.exit();
});

process.on("unhandledRejection", (reason, promise) => {
  // Catch any unhandled promise rejections
  console.error(
    chalk.red("Unhandled Rejection at:"),
    promise,
    chalk.red("reason:"),
    reason
  );
});
