const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,

  coins: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// 🔥 SET COLLECTION NAME HERE
module.exports = mongoose.model("User", userSchema, "ecommerce-data");


