import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
   <Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    px: 2,
    bgcolor: "#edd3b1ff"
  }}
>

      <Typography variant="h3" color="green" fontWeight={700} mb={2}>
        🎉 Order Placed Successfully!
      </Typography>

      <Typography variant="h6" color="text.secondary" mb={4}>
        Thank you for shopping with us. Your items will be delivered soon.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
      >
        Continue Shopping
      </Button>
    </Box>
  );
}
