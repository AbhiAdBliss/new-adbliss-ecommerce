import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

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
          Your order has been placed successfully 💰
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