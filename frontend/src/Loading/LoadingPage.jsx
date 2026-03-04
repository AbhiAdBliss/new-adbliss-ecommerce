import React from "react";
import { Box, Typography, CircularProgress, Stack } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Stack spacing={3} alignItems="center">
        
        {/* Logo / Icon */}
        <ShoppingBagIcon
          sx={{
            fontSize: 60,
            color: "#1976d2",
          }}
        />

        {/* Website Name */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            letterSpacing: "2px",
          }}
        >
          ShopnBliss
        </Typography>

        {/* Loading Spinner */}
        <CircularProgress
          thickness={4}
          size={45}
          sx={{
            color: "#1976d2",
          }}
        />

        {/* Loading Text */}
        <Typography
          variant="body1"
          sx={{
            opacity: 0.7,
            letterSpacing: "1px",
          }}
        >
          Loading amazing deals...
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoadingPage;