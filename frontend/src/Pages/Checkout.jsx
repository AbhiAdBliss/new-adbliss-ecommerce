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

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  /* ================= AUTO REDIRECT IF CART EMPTY ================= */
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/apple");
    }
  }, [cartItems]);

  /* ================= CALCULATIONS ================= */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace(/,/g, "")) * item.quantity,
    0,
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

    // 🚨 LOGIN CHECK
    if (!user) {
      setAuthError("⚠️ Please login or register to continue");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    setLoading(true);
    setPaymentError(null);
    setAuthError("");

    // ✅ VALIDATION
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

      notes: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        country: form.country,
      },

      handler: async function () {
        try {
          const user = JSON.parse(localStorage.getItem("user"));

          const res = await fetch("https://shopnbliss.com/api/order", {
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

          const updatedUser = {
            ...user,
            coins: data.coins,
          };

          localStorage.setItem("user", JSON.stringify(updatedUser));
          window.dispatchEvent(new Event("userUpdated"));

          clearCart();
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
        pt: 15,
        px: { xs: 2, md: 6 },
        bgcolor: "#f5f5f5",
        pb: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" mb={4}>
        Checkout
      </Typography>

      <form onSubmit={handleOrder}>
        <Grid container spacing={10}>
          {/* LEFT */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 2, md: 4 } }}>
              {/* LOGIN ALERT */}
              {authError && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {authError}
                </Alert>
              )}

              {/* PRODUCTS */}
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={item.image} sx={{ width: 220, height: 220 }} />

                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600}>{item.name}</Typography>
                    <Typography>Qty: {item.quantity}</Typography>

                    {/* 🔥 REMOVE BUTTON */}
                    <Button
                      size="small"
                      sx={{
                        mt: 1,
                        color: "#ff4d4f",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "rgba(255,77,79,0.1)",
                        },
                      }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>

                  <Typography fontWeight={600}>₹{item.price}</Typography>
                </Box>
              ))}

              <Divider sx={{ my: 3 }} />

              {/* SHIPPING */}
              <Typography
                fontWeight={600}
                fontSize={22}
                mb={2}
                textAlign={"center"}
              >
                Shipping Details
              </Typography>

              <Box display="flex" justifyContent="center">
                <Grid
                  container
                  spacing={4}
                  sx={{
                    maxWidth: 800,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Full Name"
                      value={form.name}
                      onChange={handleChange("name")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Phone"
                      value={form.phone}
                      onChange={handleChange("phone")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      value={form.email}
                      onChange={handleChange("email")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Address Line 1"
                      value={form.address1}
                      onChange={handleChange("address1")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      value={form.address2}
                      onChange={handleChange("address2")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="City"
                      value={form.city}
                      onChange={handleChange("city")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="State"
                      value={form.state}
                      onChange={handleChange("state")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Pincode"
                      value={form.pincode}
                      onChange={handleChange("pincode")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Country"
                      value={form.country}
                      onChange={handleChange("country")}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* COUPON */}
              <TextField
                fullWidth
                label="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                sx={{ width: 200 }}
              />

              <Button onClick={applyCoupon} sx={{ mt: 1 }}>
                Apply Coupon
              </Button>

              {couponMsg && (
                <Alert severity={couponMsg.type} sx={{ mt: 2 }}>
                  {couponMsg.text}
                </Alert>
              )}

              {paymentError && <Alert severity="error">{paymentError}</Alert>}
            </Paper>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} md={4} width={350}>
            <Paper sx={{ p: 3, position: "sticky", top: 100 }}>
              <Typography fontWeight={600} fontSize={22}>
                Price Details
              </Typography>

              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>₹{subtotal}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography>Protect Fee</Typography>
                <Typography>₹{Protectfee}</Typography>
              </Box>

              {discount > 0 && (
                <Box display="flex" justifyContent="space-between">
                  <Typography color="green">Discount</Typography>
                  <Typography color="green">-₹{discount}</Typography>
                </Box>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography>Coins: {coinsAvailable}</Typography>

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

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="bold">Total: ₹{total}</Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, bgcolor: "#2F80ED" }}
                disabled={loading || !savedUser}
              >
                {!savedUser ? (
                  "Login to Continue"
                ) : loading ? (
                  <CircularProgress size={24} />
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
