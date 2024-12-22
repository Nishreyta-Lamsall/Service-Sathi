const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Sender's email address
      pass: process.env.EMAIL_PASS, // Sender's email password or app password
    },
  });

  const mailOptions = {
    from: `"SERVICE SATHI" <nishreytal@gmail.com>`, // Sender's email address
    to: options.email, // Receiver's email address
    subject: options.subject, // Email subject
    html: options.html, // HTML body of the email
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
