import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  desc: { type: String, default: "" },
  alt: { type: String, default: "" }
});

const portfolioSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    order: {
      type: Number,
      default: 0,
      index: true
    },
    alt: {
      type: String,
      default: ""
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: [String],
      required: true,
      enum: ["Product Design", "3D Rendering", "CAD", "Furniture Design"]
    },
    client: { type: String, default: "" },
    clientUrl: { type: String, default: "" },
    myRole: {
      type: [String],
      required: true,
      enum: [
        "Furniture Designer",
        "3D Modeler",
        "CAD Specialist",
        "Product Designer",
        "3D Artist"
      ]
    },
    description: { type: String, default: "" },
    tags: [String],
    toolsUsed: [String],
    items: [imageSchema]
  },
  { timestamps: true }
);

// Pre-save hook to automatically set thumbnailUrl and thumbnailAlt from first image in items array
portfolioSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    const firstImage = this.items[0];
    this.url = firstImage.url; // Set thumbnail URL from first image
    this.alt = firstImage.alt || ""; // Set thumbnail Alt Text from first image
  }
  next(); // Proceed with the save operation
});

// Indexes for optimized queries
portfolioSchema.index({ category: 1 });
portfolioSchema.index({ tags: 1 });

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
