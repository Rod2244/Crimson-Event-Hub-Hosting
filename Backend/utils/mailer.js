import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(to, subject, message) {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    html: message,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
