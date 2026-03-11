const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  coinsUsed: {
    type: Number,
    default: 0
  },

  address: {
    name: String,
    email: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },

  // ✅ ADD THIS
  items: [
    {
      id: Number,
      name: String,
      image: String,
      price: Number,
      quantity: Number
    }
  ]

},
{ timestamps: true }
);

// 👇 this ensures collection name = orders
module.exports = mongoose.model("Order", orderSchema, "orders");