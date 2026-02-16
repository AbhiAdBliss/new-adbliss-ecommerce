import React, { useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

export default function OrderSuccess() {

  useEffect(() => {
    const creditCoins = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const amount = Number(localStorage.getItem("orderAmount"));

        if (!user || !amount) return;

        const res = await axios.post(
          "http://13.233.120.37:5000/api/order",
          {
            userId: user.id,
            amount: amount
          }
        );

        // ✅ UPDATE USER
        const updatedUser = {
          ...user,
          coins: res.data.coins
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 🔥 REFRESH HEADER
        window.dispatchEvent(new Event("userUpdated"));

        // cleanup
        localStorage.removeItem("orderAmount");

      } catch (err) {
        console.log("Coin update error", err);
      }
    };

    creditCoins();
  }, []);

  return (
    <Box sx={{ mt: 15, textAlign: "center" }}>
      <Typography variant="h4">
        🎉 Order Successful!
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Coins credited to your account 💰
      </Typography>
    </Box>
  );
}
