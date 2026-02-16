const express = require("express");
const router = express.Router();
const { orderSuccess } = require("../controllers/orderController");

// ✅ AFTER PAYMENT
router.post("/order-success", orderSuccess);

module.exports = router;
