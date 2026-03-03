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
  <Box
    sx={{
      pt: 14,
      px: { xs: 2, md: 6 },
      pb: 6,
      minHeight: "100vh",
      background: "linear-gradient(to right, #f8fafc, #eef2f7)",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        mb: 5,
        color: "#1e293b",
      }}
    >
      Secure Checkout
    </Typography>

    <form onSubmit={handleOrder}>
      <Grid container spacing={4}>
        {/* ================= LEFT SECTION ================= */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            {authError && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {authError}
              </Alert>
            )}

            {/* CART ITEMS */}
            <Box sx={{ maxHeight: 320, overflowY: "auto", pr: 1 }}>
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                    p: 2,
                    borderRadius: 2,
                    background: "#f9fafb",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{ width: 150, height: 150 }}
                    />
                    <Box>
                      <Typography fontWeight={600}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity}
                      </Typography>
                      <Button
                        size="small"
                        sx={{ mt: 1 }}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>

                  <Typography fontWeight="bold">
                    ₹{item.price}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* SHIPPING DETAILS */}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Shipping Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={form.name}
                  onChange={handleChange("name")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={form.address1}
                  onChange={handleChange("address1")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={form.city}
                  onChange={handleChange("city")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={form.state}
                  onChange={handleChange("state")}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* COUPON */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                
                label="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={applyCoupon}
                sx={{
                  borderColor: "#2F80ED",
                  color: "#2F80ED",
                  fontWeight: 600,
               
                }}
              >
                Apply
              </Button>
            </Box>

            {couponMsg && (
              <Alert
                severity={couponMsg.type}
                sx={{ mt: 2 }}
              >
                {couponMsg.text}
              </Alert>
            )}

            {paymentError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {paymentError}
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* ================= RIGHT SECTION ================= */}
        <Grid item xs={12} md={4} width={400}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff, #f3f6fa)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              position: "sticky",
              top: 120,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              Order Summary
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography fontWeight={500}>₹{subtotal}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography color="text.secondary">Protection Fee</Typography>
              <Typography fontWeight={500}>₹{Protectfee}</Typography>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={useCoins}
                  onChange={(e) => setUseCoins(e.target.checked)}
                  sx={{
                    color: "#2F80ED",
                    "&.Mui-checked": { color: "#2F80ED" },
                  }}
                />
              }
              label="Use Coins"
            />

            {useCoins && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography color="green">Coins Applied</Typography>
                <Typography color="green" fontWeight="bold">
                  -₹{coinsUsed}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Total
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#2F80ED" }}
              >
                ₹{total}
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "12px",
                background: "linear-gradient(90deg, #2F80ED, #9B6DFF)",
                boxShadow: "0 8px 20px rgba(47,128,237,0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(90deg, #2563eb, #8b5cf6)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Pay Now"
              )}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  </Box>
);
}