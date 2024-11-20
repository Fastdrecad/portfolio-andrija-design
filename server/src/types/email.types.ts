export interface EmailPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  telephone?: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo: string;
}
