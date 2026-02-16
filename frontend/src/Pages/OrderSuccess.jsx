import React, { useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

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
    <Box
      sx={{
        mt: 15,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="green">
        🎉 Order Successful!
      </Typography>

      <Typography sx={{ mt: 2, fontSize: "18px" }}>
        Coins credited to your account 💰
      </Typography>

      {/* ✅ CONTINUE SHOPPING BUTTON */}
      <Button
        variant="contained"
        size="medium"
        onClick={() => navigate("/apple")}
        sx={{
          mt: 4,
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          borderRadius: "30px",
          bgcolor: "#7a5934",
          textTransform: "none",
          fontSize: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          "&:hover": {
            bgcolor: "#5a4125",
            transform: "scale(1.02)"
          },
          transition: "all 0.3s ease"
        }}
      >
        Continue Shopping 🛍️
      </Button>
    </Box>
  );
}
