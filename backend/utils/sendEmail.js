// backend/utils/sendEmail.js

const nodemailer = require("nodemailer");

const sendOrderEmail = async (userEmail, orderData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `Shopnbliss <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Order Confirmation - Shopnbliss",
    html: `
      <div style="font-family: Arial; padding:20px;">
        <h2 style="color:#2F80ED;">Order Confirmed 🎉</h2>

        <p>Hi ${orderData.name},</p>

        <p>Your order has been placed successfully.</p>

        <div style="background:#f5f5f5; padding:15px; border-radius:10px;">
          <p><b>Amount:</b> ₹${orderData.amount}</p>
          <p><b>Coins Earned:</b> ${orderData.coinsEarned}</p>
          <p><b>Coins Used:</b> ${orderData.coinsUsed}</p>
        </div>

        <p><b>Total Coins:</b> ${orderData.totalCoins}</p>

        <p style="margin-top:20px;">Thank you ❤️</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOrderEmail;