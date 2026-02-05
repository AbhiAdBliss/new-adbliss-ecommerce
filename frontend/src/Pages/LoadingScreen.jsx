import React, { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/apple"); // 👈 your AppleSection route
    }, 2000); // 2 seconds loading

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fa8d78, #fc95c5)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <CircularProgress size={70} thickness={4} sx={{ color: "#fff", mb: 3 }} />

      <Typography variant="h5" fontWeight="bold">
        Setting up your exclusive deals...
      </Typography>

      <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
        Please wait while we prepare your rewards 🎁
      </Typography>
    </Box>
  );
}
