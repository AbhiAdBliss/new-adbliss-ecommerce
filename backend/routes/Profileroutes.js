// routes/profileRoutes.js

const express = require("express");
const router = express.Router();

const User = require("../models/User");          
const verifyToken = require("../middleware/verifyToken"); // JWT middleware


/* ──────────────────────────────────────────────
   GET /api/profile
   Returns the logged-in user's profile data.
────────────────────────────────────────────── */

router.get("/", verifyToken, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      coins: user.coins,
      redeemedCoupons: user.redeemedCoupons,

      memberSince: new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      }),

      createdAt: user.createdAt
    });

  } catch (err) {
    console.error("GET /api/profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;