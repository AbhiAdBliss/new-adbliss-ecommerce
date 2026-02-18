const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER API
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const newUser = new User({
      name,
      email,
      phone,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration successful",
      user: newUser   // 🔥 IMPORTANT (for header)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
