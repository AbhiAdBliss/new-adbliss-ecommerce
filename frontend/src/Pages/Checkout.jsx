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
  Backdrop,
  Stack
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

 const savedUser = React.useMemo(() => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}, []);

  const Protectfee = 0;

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

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    if (cartItems.length === 0 && window.location.pathname !== "/order-success") {
      navigate("/apple");
    }
  }, [cartItems, navigate]);

 const subtotal = cartItems.reduce((sum, item) => {
  const price =
    typeof item.price === "string"
      ? Number(item.price.replace(/,/g, ""))
      : Number(item.price);

  return sum + price * item.quantity;
}, 0);

  const baseTotal = subtotal - discount + Protectfee;
  const coinsAvailable = savedUser?.coins || 0;
  const coinsUsed = useCoins ? Math.min(coinsAvailable, baseTotal) : 0;
  const total = baseTotal - coinsUsed;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10"){
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

  const handleOrder = async (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    setAuthError("⚠️ Please login or register to continue");
    setTimeout(() => navigate("/login"), 1500);
    return;
  }

  setLoading(true);
  
  // get razorpay key from backend
const keyRes = await fetch("http://localhost:5001/api/get-razorpay-key");
const keyData = await keyRes.json();

  try {

    // 1️⃣ Create order from backend
   const orderRes = await fetch("http://localhost:5001/api/create-payment", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    amount: total
  })
});

const order = await orderRes.json();

    // 2️⃣ Open Razorpay
    const rzp = new window.Razorpay({
  key: keyData.key,
  amount: order.amount,
  currency: "INR",
  order_id: order.id,

  name: "ShopnBliss",
  description: "Order Payment",

      handler: async function (response) {

        await fetch("http://localhost:5001/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...response,
            userId: user.id,
            amount: total
          })
        });

        const res = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            amount: total,
            coinsUsed: coinsUsed,
            address: form
          })
        });

        const data = await res.json();

        const updatedUser = {
          ...user,
          coins: data.coins
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("userUpdated"));

        clearCart();

        const orderId = "ORD" + Date.now();

        sessionStorage.setItem("orderSuccess", "true");

        navigate(`/order-success/${orderId}`);
      },

      prefill: {
        name: form.name,
        contact: form.phone,
        email: form.email
      },

      theme: { color: "#2F80ED" }
    });

    rzp.open();

  } catch (err) {
    setPaymentError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* 🔥 PAYMENT PROCESSING LOADER */}
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: 9999,
          backgroundColor: "rgba(0,0,0,0.85)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <ShoppingBagIcon
            sx={{
              fontSize: 60,
              color: "#2F80ED",
              animation: "pulse 1.5s infinite",
            }}
          />

          <Typography variant="h5">
            Processing your payment...
          </Typography>

          <CircularProgress
            size={45}
            thickness={4}
            sx={{ color: "#2F80ED" }}
          />
        </Stack>
      </Backdrop>

      <Box
        sx={{
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.15)" },
            "100%": { transform: "scale(1)" }
          },
          pt: 10,
          px: { xs: 2, md: 6 },
          pb: 6,
          minHeight: "100vh",
          background: "linear-gradient(to right, #f8fafc, #eef2f7)",
        }}
      >
        {/* 🔴 EVERYTHING BELOW IS YOUR ORIGINAL CODE (UNCHANGED) */}

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

         <Box sx={{ maxHeight: 320, overflowY: "auto", pr: 1 }}>
  {cartItems.map((item, index) => {
    const hasCoupon = item.id % 2 !== 0;

    return (
      <Box
        key={index}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          p: 2,
          borderRadius: 2,

          background: hasCoupon ? "#fdf7e3ff" : "#f9fafb",
          border: hasCoupon ? "1px solid #f6c453" : "none",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            src={item.image}
            variant="rounded"
            sx={{ width: 150, height: 150 }}
          />

          <Box>
            <Typography fontWeight={600}>{item.name}</Typography>

            <Typography variant="body2" color="text.secondary">
              Qty: {item.quantity}
            </Typography>

            <Button
              size="small"
              sx={{ mt: 1, color: "red" }}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </Box>
        </Box>

        <Typography fontWeight="bold">
          ₹{Number(item.price).toLocaleString("en-IN")}
        </Typography>
      </Box>
    );
  })}
</Box>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Shipping Details
              </Typography>

              <Grid container spacing={5}>
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

                {/* ADDED PINCODE AND COUNTRY */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={form.pincode}
                    onChange={handleChange("pincode")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={form.country}
                    onChange={handleChange("country")}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

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
                <Alert severity={couponMsg.type} sx={{ mt: 2 }}>
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
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={500}>₹{subtotal.toLocaleString("en-IN")}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography color="text.secondary">Protection Fee</Typography>
                <Typography fontWeight={500}>₹{Protectfee.toLocaleString("en-IN")}</Typography>
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
                    -₹{coinsUsed.toLocaleString("en-IN")}
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
                 ₹{total.toLocaleString("en-IN")}
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
    </>
  );
}