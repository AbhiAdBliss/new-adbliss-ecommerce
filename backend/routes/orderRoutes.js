// routes/orderRoutes.js
const express     = require("express");
const router      = express.Router();
const Order       = require("../models/Order");       // your existing Order model
const verifyToken = require("../middleware/verifyToken");

/* ──────────────────────────────────────────────
   GET /api/orders
   Returns all orders for the logged-in user,
   sorted newest first.

   Each order in your schema has:
   - userId, amount, coinsUsed, address{}, items[], timestamps
────────────────────────────────────────────── */
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // newest first

    res.json(orders);
  } catch (err) {
    console.error("GET /api/orders error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ──────────────────────────────────────────────
   GET /api/orders/:id
   Single order detail (must belong to this user)
────────────────────────────────────────────── */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id:    req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("GET /api/orders/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;