import React, { useState, useEffect } from "react";
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
  Avatar,
} from "@mui/material";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const Protectfee = 150;

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useCoins, setUseCoins] = useState(false);

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // ✅ FIXED handleChange (USED NOW)
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  /* ================= AUTO REDIRECT ================= */
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/apple");
    }
  }, [cartItems, navigate]);

  /* ================= CALCULATIONS ================= */
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  const baseTotal = subtotal - discount + Protectfee;
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

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setAuthError("⚠️ Please login or register to continue");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    setLoading(true);
    setPaymentError(null);
    setAuthError("");

    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.address1 ||
      !form.city ||
      !form.state ||
      !form.pincode ||
      !form.country
    ) {
      setPaymentError("Please fill all required fields");
      setLoading(false);
      return;
    }

    if (!window.Razorpay) {
      setPaymentError("Payment system not loaded");
      setLoading(false);
      return;
    }

    const rzp = new window.Razorpay({
      key: "rzp_test_SD84DQrFfdGAmn",
      amount: total * 100,
      currency: "INR",
      name: "ShopnBliss",
      description: "Order Payment",

      handler: async function () {
        try {
          const res = await fetch("/api/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user.id,
              amount: total,
              coinsUsed: coinsUsed,
              address: form,
            }),
          });

          const data = await res.json();

          if (!res.ok) throw new Error(data.message || "Order failed");

          const updatedUser = {
            ...user,
            coins: data.coins,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.dispatchEvent(new Event("userUpdated"));

          clearCart();

          // ✅ SUCCESS PAGE NAVIGATION
          navigate("/order-success");

        } catch (err) {
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

      theme: { color: "#2F80ED" },
    });

    rzp.open();
  };

  return (
    <Box sx={{ pt: 15, px: { xs: 2, md: 6 }, bgcolor: "#f5f5f5", pb: 5 }}>
      <Typography variant="h4" mb={4}>
        Checkout
      </Typography>

      <form onSubmit={handleOrder}>
        <Grid container spacing={10}>

          {/* LEFT */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4 }}>

              {authError && <Alert severity="warning">{authError}</Alert>}

              {cartItems.map((item, index) => (
                <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Avatar src={item.image} sx={{ width: 120, height: 120 }} />
                  <Box>
                    <Typography>{item.name}</Typography>
                    <Typography>Qty: {item.quantity}</Typography>
                    <Button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </Box>
                  <Typography>₹{item.price}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              <Typography textAlign="center" fontSize={20}>
                Shipping Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="Name" value={form.name} onChange={handleChange("name")} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="Phone" value={form.phone} onChange={handleChange("phone")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Email" value={form.email} onChange={handleChange("email")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Address" value={form.address1} onChange={handleChange("address1")} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="City" value={form.city} onChange={handleChange("city")} />
                </Grid>

                <Grid item xs={6}>
                  <TextField fullWidth label="State" value={form.state} onChange={handleChange("state")} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <TextField value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              <Button onClick={applyCoupon}>Apply</Button>

              {couponMsg && <Alert severity={couponMsg.type}>{couponMsg.text}</Alert>}
              {paymentError && <Alert severity="error">{paymentError}</Alert>}
            </Paper>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>

              <Typography>Subtotal: ₹{subtotal}</Typography>
              <Typography>Fee: ₹{Protectfee}</Typography>

              {/* ✅ FIXED setUseCoins */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useCoins}
                    onChange={(e) => setUseCoins(e.target.checked)}
                  />
                }
                label="Use Coins"
              />

              {useCoins && <Typography color="green">-₹{coinsUsed}</Typography>}

              <Typography>Total: ₹{total}</Typography>

              <Button type="submit" fullWidth variant="contained">
                {loading ? <CircularProgress size={20} /> : "Pay Now"}
              </Button>
            </Paper>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
}