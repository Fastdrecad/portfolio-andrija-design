import mongoose from "mongoose";
import { User } from "../models/User";
import { config } from "./config";

const createAdmin = async () => {
  try {
    if (!config.mongodb.uri || !config.admin.email || !config.admin.password) {
      throw new Error("Missing required environment variables");
    }

    await mongoose.connect(config.mongodb.uri);

    const admin = new User({
      email: config.admin.email,
      password: config.admin.password
    });

    await admin.save();
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
