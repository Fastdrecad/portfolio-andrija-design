import nodemailer from "nodemailer";
import validator from "validator";
import { emailConfig } from "../config/email.config";
import { EmailOptions, EmailPayload } from "../types/email.types";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig.smtp);
  }

  private validatePayload(payload: EmailPayload): string[] {
    const errors: string[] = [];

    if (!payload.firstName) errors.push("First Name is missing");
    if (!payload.lastName) errors.push("Last Name is missing");
    if (!payload.email) errors.push("Email is missing");
    if (!payload.message) errors.push("Message is missing");
    if (payload.email && !validator.isEmail(payload.email)) {
      errors.push("Invalid email format");
    }
    if (
      payload.telephone &&
      !validator.isMobilePhone(payload.telephone, "any", { strictMode: false })
    ) {
      errors.push("Invalid telephone number");
    }

    return errors;
  }

  private createEmailContent(payload: EmailPayload): EmailOptions {
    const subject = `New email from ${payload.firstName} ${payload.lastName}`;
    const text = `
      Ime: ${payload.firstName}
      Prezime: ${payload.lastName}
      Email: ${payload.email}
      Telefon: ${payload.telephone || "N/A"}
      
      Poruka:
      ${payload.message}
    `;

    const html = `
      <p><strong>Ime:</strong> ${validator.escape(payload.firstName)}</p>
      <p><strong>Prezime:</strong> ${validator.escape(payload.lastName)}</p>
      <p><strong>Email:</strong> ${validator.escape(payload.email)}</p>
      ${
        payload.telephone
          ? `<p><strong>Telefon:</strong> ${validator.escape(
              payload.telephone
            )}</p>`
          : ""
      }
      <p><strong>Poruka:</strong></p>
      <p>${validator.escape(payload.message).replace(/\n/g, "<br>")}</p>
    `;

    return {
      to: emailConfig.recipient,
      subject,
      text,
      html,
      replyTo: payload.email
    };
  }

  async sendEmail(
    payload: EmailPayload
  ): Promise<{ success: boolean; errors?: string[] }> {
    try {
      // Validate payload
      const validationErrors = this.validatePayload(payload);
      if (validationErrors.length > 0) {
        return { success: false, errors: validationErrors };
      }

      // Create email content
      const emailOptions = this.createEmailContent(payload);

      // Send email
      const mailOptions = {
        from: emailConfig.sender,
        ...emailOptions
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);

      return { success: true };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        errors: ["Failed to send email. Please try again later."]
      };
    }
  }
}

export const emailService = new EmailService();
