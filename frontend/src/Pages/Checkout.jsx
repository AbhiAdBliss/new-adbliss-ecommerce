import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const Protectfee = 150;

  /* ================= STATE ================= */
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 💰 NEW: COIN STATE
  const [useCoins, setUseCoins] = useState(false);

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  /* ================= CALCULATIONS ================= */
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  const baseTotal = subtotal - discount + Protectfee;

  // 💰 APPLY COINS
  const coinsAvailable = savedUser?.coins || 0;
  const coinsUsed = useCoins ? Math.min(coinsAvailable, baseTotal) : 0;

  const total = baseTotal - coinsUsed;

  /* ================= COUPON ================= */
  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setCouponMsg({
        type: "success",
        text: `🎉 You saved ₹${disc}`,
      });
    } else {
      setDiscount(0);
      setCouponMsg({
        type: "error",
        text: "❌ Invalid coupon",
      });
    }
  };

  /* ================= PAYMENT ================= */
  const handleOrder = (e) => {
    e.preventDefault();
    setPaymentError(null);
    setLoading(true);

    if (!window.Razorpay) {
      setPaymentError("Payment system not loaded");
      setLoading(false);
      return;
    }

    const rzp = new window.Razorpay({
      key: "rzp_test_SD84DQrFfdGAmn",
      amount: total * 100,
      currency: "INR",
      name: "Adbliss Ecommerce",
      description: "Order Payment",

      handler: async function () {
        try {
          const user = JSON.parse(localStorage.getItem("user"));

          if (!user) {
            throw new Error("User not found");
          }

          // 🔥 SEND COINS USED ALSO
          const res = await fetch("/api/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              amount: total,
              coinsUsed: coinsUsed,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Order failed");
          }

          // ✅ UPDATE USER
          const updatedUser = {
            ...user,
            coins: data.coins,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.dispatchEvent(new Event("userUpdated"));

          clearCart();
          navigate("/order-success");

        } catch (err) {
          console.error(err);
          setPaymentError(err.message);
        } finally {
          setLoading(false);
        }
      },

      prefill: {
        name: form.name,
        contact: form.phone,
        email: form.email,
      },

      theme: { color: "#c0974b" },
    });

    rzp.open();
  };

  /* ================= EMPTY CART ================= */
  if (cartItems.length === 0) {
    return (
      <Box sx={{ mt: 15, textAlign: "center" }}>
        <Typography variant="h4">🛒 Cart is Empty</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/apple")}>
          Shop Now
        </Button>
      </Box>
    );
  }

  /* ================= UI ================= */
  return (
    <Box sx={{ pt: 10, px: 4, bgcolor: "#f5f5f5", pb: 5 }}>
      <Typography variant="h4" mb={4}>
        Checkout
      </Typography>

      <form onSubmit={handleOrder}>
        <Grid container spacing={4}>

          {/* LEFT */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>
              <Typography fontWeight={600}>Shipping</Typography>

              <TextField fullWidth label="Name" margin="normal"
                value={form.name} onChange={handleChange("name")} />

              <TextField fullWidth label="Email" margin="normal"
                value={form.email} onChange={handleChange("email")} />

              <TextField fullWidth label="Phone" margin="normal"
                value={form.phone} onChange={handleChange("phone")} />

              <Divider sx={{ my: 2 }} />

              {/* COUPON */}
              <TextField
                fullWidth
                label="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <Button onClick={applyCoupon} sx={{ mt: 1 }}>
                Apply Coupon
              </Button>

              {couponMsg && (
                <Alert severity={couponMsg.type} sx={{ mt: 2 }}>
                  {couponMsg.text}
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4 }}>
              <Typography fontWeight={600}>Summary</Typography>

              <Typography>Subtotal: ₹{subtotal}</Typography>
              <Typography>Protect Fee: ₹{Protectfee}</Typography>

              {discount > 0 && (
                <Typography color="green">-₹{discount}</Typography>
              )}

              {/* 💰 COINS UI */}
              <Divider sx={{ my: 2 }} />

              <Typography color="orange">
                💰 Available Coins: {coinsAvailable}
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={useCoins}
                    onChange={(e) => setUseCoins(e.target.checked)}
                  />
                }
                label="Use Coins"
              />

              {useCoins && (
                <Typography color="green">
                  Coins Used: -₹{coinsUsed}
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6">
                Total: ₹{total}
              </Typography>

              <Typography color="green">
                🎁 Earn {total} coins
              </Typography>

              {paymentError && (
                <Alert severity="error">{paymentError}</Alert>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Pay Now"}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
