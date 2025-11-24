import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or any SMTP server
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,  // your email
    pass: process.env.EMAIL_PASS   // app password or real password
  }
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"YBL Tours" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
};
