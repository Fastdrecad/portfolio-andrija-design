import dotenv from "dotenv";
dotenv.config();
import express from "express";
import nodemailer from "nodemailer";
import chalk from "chalk";
import cors from "cors";
import validator from "validator";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

// SMTP (sending) server details
const smtpServer = "smtp.titan.email";
const smtpPort = 587;

// Email sending function using Nodemailer
const sendEmail = async (
  senderPassword: string,
  recipientEmail: string,
  subject: string,
  text: string,
  html: string,
  replyTo: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: smtpPort,
      auth: {
        user: process.env.SMTP_USER, // Authenticate with your Titan email
        pass: senderPassword
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER, // Your Titan email as the sender
      to: recipientEmail, // Your email as the recipient
      subject: subject,
      text: text,
      html: html,
      replyTo: replyTo // User's email as the "Reply-To" address
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
    console.log("Info object:", info);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Create a POST route to send the email
app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, message, telephone } = req.body;

  // Validate each field
  let errors = [];
  if (!firstName) errors.push("First Name is missing");
  if (!lastName) errors.push("Last Name is missing");
  if (!email) errors.push("Email is missing");
  if (!message) errors.push("Message is missing");
  if (email && !validator.isEmail(email)) errors.push("Invalid email format");
  if (
    telephone &&
    !validator.isMobilePhone(telephone, "any", { strictMode: false })
  )
    errors.push("Invalid telephone number");

  // If errors exist, return 400 error
  if (errors.length) {
    return res.status(400).json({
      error: "Validation errors",
      details: errors
    });
  }

  try {
    const senderPassword = process.env.SMTP_PASSWORD!; // Your Titan email password
    const recipientEmail = "andrija@andrijadesign.com"; // Your email to receive the message

    // Construct the subject and body of the email
    const subject = `New email from ${firstName} ${lastName}`;
    const text = `Ime: ${firstName}\nPrezime: ${lastName}\nEmail: ${email}\nTelefon: N/A\n\nPoruka:\n${message}`;
    const html = `
      <p><strong>Ime:</strong> ${firstName}</p>
      <p><strong>Prezime:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Poruka:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <p>${validator.escape(message).replace(/\n/g, "<br>")}</p>
    `;

    // Send the email with your Titan email as the sender and user's email as "Reply-To"
    await sendEmail(
      senderPassword,
      recipientEmail,
      subject,
      text,
      html,
      email // User's email as "Reply-To"
    );

    res.status(200).json({
      message: "Email sent successfully."
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to send email",
      details: error
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
});
