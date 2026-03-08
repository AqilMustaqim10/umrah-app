import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  // ── Create transporter ─────────────────────────────────
  // This is the "email client" that sends the email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for port 465, false for port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // ── Email options ──────────────────────────────────────
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  // ── Send the email ─────────────────────────────────────
  const info = await transporter.sendMail(mailOptions);

  console.log(`📧 Email sent: ${info.messageId}`);

  return info;
};

export default sendEmail;
