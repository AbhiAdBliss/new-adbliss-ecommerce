// backend/utils/sendOtpEmail.js

const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `Shopnbliss <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP - Shopnbliss",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f7fb;">
        
        <div style="max-width: 500px; margin: auto; background: white; border-radius: 12px; padding: 25px; text-align: center;">
          
          <h2 style="color: #2F80ED;">Shopnbliss</h2>
          
          <h3>Password Reset OTP</h3>

          <p style="color: #555;">
            Use the OTP below to reset your password.
          </p>

          <div style="
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 6px;
            color: #2F80ED;
            margin: 20px 0;
            padding: 15px;
            border-radius: 8px;
            background: #eef4ff;
          ">
            ${otp}
          </div>

          <p style="color: #777; font-size: 14px;">
            This OTP is valid for <b>5 minutes</b>.
          </p>

          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            If you didn’t request this, please ignore this email.
          </p>

        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;