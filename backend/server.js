const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= MONGODB ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("MongoDB Error ❌", err.message);
    process.exit(1);
  });

/* ================= MODEL ================= */
const User = require("./models/User");

/* ================= EMAIL UTILS ================= */
const sendOtpEmail = require("./utils/sendOtpEmail");
const sendOrderEmail = require("./utils/sendEmail");

/* ================= OTP STORE ================= */
const otpStore = {};

/* =========================================================
   🔐 FORGOT PASSWORD - SEND OTP
========================================================= */
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
      verified: false,
    };

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent for password reset ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP ❌" });
  }
});

/* =========================================================
   🔐 VERIFY OTP (FORGOT PASSWORD)
========================================================= */
app.post("/api/verify-reset-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record || record.otp !== otp || Date.now() > record.expires) {
    return res.status(400).json({ message: "Invalid or expired OTP ❌" });
  }

  otpStore[email].verified = true;

  res.json({ message: "OTP verified ✅" });
});

/* =========================================================
   🔐 RESET PASSWORD
========================================================= */
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const record = otpStore[email];

    if (!record || !record.verified) {
      return res.status(400).json({ message: "OTP not verified ❌" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    delete otpStore[email];

    res.json({ message: "Password updated successfully 🎉" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Reset failed ❌" });
  }
});

/* =========================================================
   ❌ UNUSED OTP (REGISTER) - COMMENTED
========================================================= */
/*
app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
      verified: false
    };

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent ✅" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "OTP failed ❌" });
  }
});

app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP ❌" });
  }

  otpStore[email].verified = true;
  res.json({ success: true });
});
*/

/* ================= REGISTER ================= */
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      coins: 0
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
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        coins: user.coins
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error ❌" });
  }
});

/* ================= ORDER ================= */
app.post("/api/order", async (req, res) => {
  try {
    const { userId, amount, coinsUsed = 0 } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    const coinsEarned = Math.floor(amount);
    const updatedCoins = Math.max(0, user.coins - coinsUsed + coinsEarned);

    user.coins = updatedCoins;
    await user.save();

    await sendOrderEmail(user.email, {
      name: user.name,
      amount,
      coinsEarned,
      coinsUsed,
      totalCoins: updatedCoins
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

/* ================= START ================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🚀`);
});