const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= MONGODB CONNECTION ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("MongoDB Connection Error ❌", err.message);
    process.exit(1);
  });

/* ================= IMPORT MODEL ================= */
const User = require("./models/User");

/* ================= MAIL SETUP ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ================= OTP STORE ================= */
const otpStore = {};

/* ================= SEND OTP ================= */
app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
      verified: false
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`
    });

    res.json({ message: "OTP sent ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP failed ❌" });
  }
});

/* ================= VERIFY OTP ================= */
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP ❌" });
  }

  otpStore[email].verified = true;
  res.json({ success: true });
});

/* ================= RESET PASSWORD ================= */
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  const record = otpStore[email];

  if (!record || !record.verified) {
    return res.status(400).json({ message: "OTP not verified ❌" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.updateOne({ email }, { password: hashedPassword });

  delete otpStore[email];

  res.json({ message: "Password updated ✅" });
});

/* ================= REGISTER ================= */
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, phone, password, isVerified } = req.body;

    if (!isVerified) {
      return res.status(400).json({ message: "Email not verified ❌" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    res.json({
      user: {
        id: newUser._id,
        name,
        email,
        phone,
        coins: newUser.coins
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Register error ❌" });
  }
});

/* ================= LOGIN ================= */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found ❌" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ message: "Invalid password ❌" });

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      coins: user.coins
    }
  });
});

/* ================= ORDER + EMAIL ================= */
app.post("/api/order", async (req, res) => {
  try {
    const { userId, amount, coinsUsed = 0, address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // 🔥 COINS LOGIC
    const coinsEarned = Math.floor(amount * 0.05); // 5%
    const updatedCoins = user.coins - coinsUsed + coinsEarned;

    user.coins = updatedCoins;
    await user.save();

    // 📧 SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Order Confirmation - Adbliss",
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2 style="color:#2F80ED;">Order Confirmed 🎉</h2>

          <p>Hi ${user.name},</p>

          <p>Your order has been placed successfully.</p>

          <div style="background:#f5f5f5; padding:15px; border-radius:10px;">
            <p><b>Amount:</b> ₹${amount}</p>
            <p><b>Coins Earned:</b> ${coinsEarned}</p>
            <p><b>Coins Used:</b> ${coinsUsed}</p>
          </div>

          <p><b>Total Coins:</b> ${updatedCoins}</p>

          <p style="margin-top:20px;">Thank you for shopping with us ❤️</p>
        </div>
      `
    });

    res.json({
      success: true,
      coins: updatedCoins
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order failed ❌" });
  }
});

/* ================= GET USER ================= */
app.get("/api/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.json(user);
});

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ================= START SERVER ================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🚀`);
});