import React from "react";
import { Backdrop, CircularProgress, Typography, Stack } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const ActionLoader = ({ open, text = "Processing..." }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.8)",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <ShoppingCartCheckoutIcon
          sx={{
            fontSize: 50,
            color: "#1976d2",
            animation: "pulse 1.2s infinite",
          }}
        />

        <CircularProgress
          size={45}
          thickness={4}
          sx={{ color: "#1976d2" }}
        />

        <Typography sx={{ opacity: 0.8 }}>
          {text}
        </Typography>
      </Stack>
    </Backdrop>
  );
};

export default ActionLoader;