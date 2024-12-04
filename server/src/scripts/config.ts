import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

export const config = {
  mongodb: {
    uri: process.env.MONGO_URI
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  }
};
