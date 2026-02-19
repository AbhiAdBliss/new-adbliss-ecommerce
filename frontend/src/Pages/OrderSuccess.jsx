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
            amount: amount,
          }
        );

        // ✅ UPDATE USER
        const updatedUser = {
          ...user,
          coins: res.data.coins,
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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #121212 0%, #1E1E2F 50%, #2A1B3D 100%)",
      }}
    >
      {/* 🔥 Glass Card */}
      <Box
        sx={{
          p: 5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          color: "#fff",
          width: { xs: "90%", sm: "400px" },
        }}
      >
        {/* ✅ Success Icon */}
        <Typography sx={{ fontSize: 50 }}>🎉</Typography>

        {/* ✅ Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#2F80ED", mt: 1 }}
        >
          Order Successful!
        </Typography>

        {/* ✅ Subtitle */}
        <Typography sx={{ mt: 2, fontSize: "16px", color: "#ccc" }}>
          Coins credited to your account 💰
        </Typography>

        {/* ✅ Button */}
        <Button
          variant="contained"
          size="medium"
          onClick={() => navigate("/apple")}
          sx={{
            mt: 4,
            px: 5,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: "30px",
            bgcolor: "#2F80ED",
            textTransform: "none",
            fontSize: "16px",
            boxShadow: "0 4px 15px rgba(47,128,237,0.4)",
            "&:hover": {
              bgcolor: "#9B6DFF",
              transform: "scale(1.05)",
              boxShadow: "0 6px 20px rgba(155,109,255,0.6)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Continue Shopping 🛍️
        </Button>
      </Box>
    </Box>
  );
}
