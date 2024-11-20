import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
  smtp: {
    host: "smtp.titan.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    },
    // remove in development
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production"
    }
  },
  sender: process.env.SMTP_USER,
  recipient: "andrija@andrijadesign.com"
};
