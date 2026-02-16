const User = require("../models/User");

// ✅ ORDER SUCCESS (COINS CREDIT)
exports.orderSuccess = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 💰 COINS = ORDER AMOUNT
    user.coins += amount;

    await user.save();

    res.json({
      message: "Coins credited successfully 🎉",
      coins: user.coins
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
