import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate,useParams } from "react-router-dom";


export default function OrderSuccess() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    const orderPlaced = sessionStorage.getItem("orderSuccess");
    const user = localStorage.getItem("user");

    // ❌ If no order or no login → redirect
    if (!orderPlaced || !user) {
      navigate("/");
    }

    // remove flag after showing page once
    sessionStorage.removeItem("orderSuccess");

  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
      }}
    >
      <Box
        sx={{
          p: 5,
          borderRadius: 4,
          background: "#2b2f45ff",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
          color: "#fff",
          width: { xs: "90%", sm: "400px" },
        }}
      >
        <Typography sx={{ fontSize: 50 }}>🎉</Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#2F80ED", mt: 1 }}
        >
          Order Successful!
        </Typography>

        <Typography sx={{ mt: 2, fontSize: "16px", color: "#ccc" }}>
          Your order has been placed successfully 💰
        </Typography>
        <Typography sx={{ mt: 1, color: "#ccc" }}>
  Order ID: {orderId}
</Typography>

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