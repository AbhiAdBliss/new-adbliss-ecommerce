const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.blissdigitalmedia.com", // confirm from hosting
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = transporter;
