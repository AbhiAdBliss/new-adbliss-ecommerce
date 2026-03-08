const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();



/* ================= PORT ================= */
const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */

// ✅ CORS FIX (WORKS LOCAL + EC2)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
  })
);

/* ================= SECURITY ================= */

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use(limiter);

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

/* ================= RAZORPAY ================= */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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

    if (!email)
      return res.status(400).json({ message: "Email required ❌" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found ❌" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
      verified: false,
    };

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent for password reset ✅" });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Failed to send OTP ❌" });
  }
});

/* =========================================================
   🔐 VERIFY OTP (FORGOT PASSWORD)
========================================================= */
app.post("/api/verify-reset-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record || record.otp !== otp || Date.now() > record.expires)
    return res.status(400).json({ message: "Invalid or expired OTP ❌" });

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

    if (!record || !record.verified)
      return res.status(400).json({ message: "OTP not verified ❌" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    delete otpStore[email];

    res.json({ message: "Password updated successfully 🎉" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Reset failed ❌" });
  }
});

/* ================= REGISTER ================= */
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: "All fields required ❌" });

   const existingUser = await User.findOne({
  $or: [{ email }, { phone }]
});

if (existingUser) {
  return res.status(400).json({
    message: "Email or phone already registered"
  });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      coins: 0,
    });

    console.log("User Saved ✅", newUser.email);

  res.json({
  user: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    coins: newUser.coins
  }
});

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Register error ❌" });
  }
});

/* ================= LOGIN ================= */
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found ❌" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid password ❌" });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        coins: user.coins,
      },
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login error ❌" });
  }
});


/* ================= CREATE PAYMENT ORDER ================= */

app.post("/api/create-payment", async (req, res) => {
  try {

    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), // paisa
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({ message: "Payment order failed ❌" });
  }
});
/* ================= VERIFY PAYMENT ================= */

app.post("/api/verify-payment", async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      amount
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed ❌" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    const coinsEarned = Math.floor(amount);

    user.coins += coinsEarned;
    await user.save();

    await sendOrderEmail(user.email, {
      name: user.name,
      amount,
      coinsEarned,
      paymentId: razorpay_payment_id
    });

    res.json({
      success: true,
      coins: user.coins
    });

  } catch (err) {
    console.error("Payment Verify Error:", err);
    res.status(500).json({ message: "Verification error ❌" });
  }
});



/* ================= VERIFY PAYMENT ================= */

app.post("/api/verify-payment", async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userEmail,
      amount
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed ❌" });
    }

    // SEND EMAIL WHEN PAYMENT SUCCESS
    await sendOrderEmail(userEmail, {
      amount,
      paymentId: razorpay_payment_id
    });

    res.json({ success: true });

  } catch (err) {
    console.error("Payment Verify Error:", err);
    res.status(500).json({ message: "Verification error ❌" });
  }
});

/* ================= ORDER ================= */
app.post("/api/order", async (req, res) => {
  try {
    const { userId, amount, coinsUsed = 0 } = req.body;

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "User not found ❌" });

    const coinsEarned = Math.floor(amount);
    const updatedCoins = Math.max(
      0,
      user.coins - coinsUsed + coinsEarned
    );

    user.coins = updatedCoins;
    await user.save();

    await sendOrderEmail(user.email, {
      name: user.name,
      amount,
      coinsEarned,
      coinsUsed,
      totalCoins: updatedCoins,
    });

    res.json({
      success: true,
      coins: updatedCoins,
    });

  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Order failed ❌" });
  }
});

/* ================= GET USER ================= */
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ message: "Fetch failed ❌" });
  }
  
});

/* ================= GET RAZORPAY KEY ================= */

app.get("/api/get-razorpay-key", (req, res) => {
  res.json({
    key: process.env.RAZORPAY_KEY_ID
  });
});

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* ================= START ================= */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🚀`);
});