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
  Stack,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LockIcon from "@mui/icons-material/Lock";
import coinimg from "../assets/AppleS-imgs/coin-img.png";



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


 const [user] = useState(() => {
  const stored = localStorage.getItem("user");
  // Added a check to ensure 'stored' is valid JSON
  return (stored && stored !== "undefined") ? JSON.parse(stored) : null;
});

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
    if (
      cartItems.length === 0 &&
      window.location.pathname !== "/order-success"
    ) {
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
    if (coupon.trim().toUpperCase() === "SAVE10") {
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

    try {
      const keyRes = await fetch("/api/get-razorpay-key");
      const keyData = await keyRes.json();

      const orderRes = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await orderRes.json();
      if (!order.id) throw new Error("Failed to create payment order");

      if (!window.Razorpay) {
        setPaymentError("Payment system not loaded");
        setLoading(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: keyData.key,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "ShopnBliss",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                userId: user.id,
                amount: total,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyData.success)
              throw new Error("Payment verification failed");

            const res = await fetch("/api/order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
  userId: user.id,
  amount: total,
  coinsUsed: coinsUsed,
  address: form,
  items: cartItems
}),
            });

            const data = await res.json();
            const updatedUser = { ...user, coins: data.coins };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.dispatchEvent(new Event("userUpdated"));

            clearCart();
            const orderId = "ORD" + Date.now();
            sessionStorage.setItem("orderSuccess", "true");
            navigate(`/order-success/${orderId}`);
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
    } catch (err) {
      setPaymentError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          <Typography variant="h5">Processing your payment...</Typography>
          <CircularProgress size={45} thickness={4} sx={{ color: "#2F80ED" }} />
        </Stack>
      </Backdrop>

      <Box
        sx={{
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.15)" },
            "100%": { transform: "scale(1)" },
          },
          pt: 8,
          px: { xs: 2, md: 6 },
          pb: 6,
          minHeight: "100vh",
          background: "linear-gradient(to right, #f8fafc, #eef2f7)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 5, color: "#1e293b" }}
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

                <Box sx={{ maxHeight: 450, overflowY: "auto", pr: 1 }}>
                  {cartItems.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        // Stack vertically on extra small mobile, horizontal on sm and up
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        mb: 2,
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 3,
                        background: "#ffffff",
                        border: "1px solid #f1f5f9",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "#e2e8f0",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                        },
                      }}
                    >
                      {/* Left Section: Image + Info */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 1.5, sm: 2.5 },
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: {
                              xs: 80,
                              sm: 100,
                              md: 140,
                              lg: 180,
                              xl: 200,
                            },
                            height: {
                              xs: 80,
                              sm: 100,
                              md: 140,
                              lg: 180,
                              xl: 200,
                            },
                            flexShrink: 0,
                            borderRadius: 3,
                            overflow: "hidden",
                            bgcolor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #f1f5f9",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                          }}
                        >
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              p: { xs: 1, md: 2 },
                              transition:
                                "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                transform: "scale(1.08)",
                              },
                            }}
                          />
                        </Box>

                        {/* Product Details */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            noWrap
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              color: "#1e293b",
                              lineHeight: 1.2,
                              mb: 0.5,
                            }}
                          >
                            {item.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.85rem",
                            }}
                          >
                            Quantity: {item.quantity}
                          </Typography>

                          <Button
                            size="small"
                            startIcon={
                              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                            }
                            onClick={() => removeFromCart(item.id)}
                            sx={{
                              mt: 1,
                              color: "#fc6363ff",
                              fontSize: "0.75rem",
                              textTransform: "none",
                              p: 0,
                              minWidth: "auto",
                              "&:hover": {
                                color: "#ef4444",
                                bgcolor: "transparent",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>

                      {/* Right Section: Price */}
                      <Box
                        sx={{
                          width: { xs: "100%", sm: "auto" },
                          textAlign: { xs: "right", sm: "right" },
                          mt: { xs: 1, sm: 0 },
                          pt: { xs: 1, sm: 0 },
                          borderTop: { xs: "1px solid #f1f5f9", sm: "none" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1rem", sm: "1.1rem" },
                            color: "#0f172a",
                          }}
                        >
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
                >
                  Shipping Details
                </Typography>

                <Grid container spacing={4} sx={{ mt: 1 }}>
                  {/* Row 1: Name and Phone */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Full Name"
                      size="medium"
                      value={form.name}
                      onChange={handleChange("name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Phone"
                      size="medium"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>

                  {/* Row 2: Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Email Address"
                      size="medium"
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                    />
                  </Grid>

                  {/* Row 3: Address (Full Width) */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      required
                      label="Street Address"
                      size="medium"
                      multiline
                      value={form.address1}
                      onChange={handleChange("address1")}
                    />
                  </Grid>

                  {/* Row 4: City and State */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="City"
                      size="medium"
                      value={form.city}
                      onChange={handleChange("city")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="State"
                      size="medium"
                      value={form.state}
                      onChange={handleChange("state")}
                    />
                  </Grid>

                  {/* Row 5: Pincode and Country */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Pincode"
                      size="medium"
                      value={form.pincode}
                      onChange={handleChange("pincode")}
                      inputProps={{ maxLength: 6 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Country"
                      size="medium"
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



{/*  Order Summary */}


            <Grid item xs={12} md={4} width={400}>
  <Paper
    elevation={0} 
    sx={{
      p: { xs: 2, md: 4 },
      borderRadius: 4,
      background: "#ffffff",
      border: "1px solid #f1f5f9",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)",
      position: "sticky",
      top: 120,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: "#0f172a" }}>
      Order Summary
    </Typography>

    {/* Pricing Breakdown */}
    <Stack spacing={1.5} sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="text.secondary">Subtotal</Typography>
        <Typography fontWeight={600}>₹{subtotal.toLocaleString("en-IN")}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="text.secondary">Protection Fee</Typography>
        <Typography fontWeight={600}>₹{Protectfee.toLocaleString("en-IN")}</Typography>
      </Box>

      {/* Coins Section */}
     <Box 
  sx={{ 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between",
    bgcolor: "#f8fafc", 
    p: 1.5,
    borderRadius: 3,
    border: "1px solid #f1f5f9",
    mt: 1
  }}
>
  <FormControlLabel
    control={
      <Checkbox
        checked={useCoins}
        onChange={(e) => setUseCoins(e.target.checked)}
        sx={{ color: "#2F80ED", "&.Mui-checked": { color: "#2F80ED" } }}
      />
    }
    label={
      <Box sx={{ ml: 0.5 }}>
        <Typography variant="body2" fontWeight={700} sx={{ color: "#1e293b" }}>
          Use Loyalty Coupon
        </Typography>
        <Typography 
  variant="caption" 
  sx={{ 
    display: "flex", 
    alignItems: "center", 
    gap: 0.5, 
    color: "#64748b" 
  }}
>
  Available: <span style={{ fontWeight: 800, color: "#eab308" }}>
    {user?.coins ?? 0}
  </span>
  
  {/* Professional Image Icon Integration */}
  <Box
    component="img"
    src={coinimg}
    alt="coins"
    sx={{
      width: 16,     // Precise pixel control
      height: 16,
      ml: 0.2,       // Micro-margin for perfect spacing
      objectFit: "contain",
      // Optional: Add a subtle filter if the icon needs to pop more
      filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))" 
    }}
  />
</Typography>
      </Box>
    }
  />
</Box>

      {useCoins && (
        <Box sx={{ display: "flex", justifyContent: "space-between", px: 1.5 }}>
          <Typography color="success.main" variant="body2" fontWeight={600}>
            Coins Applied
          </Typography>
          <Typography color="success.main" fontWeight={700}>
            -₹{coinsUsed.toLocaleString("en-IN")}
          </Typography>
        </Box>
      )}
    </Stack>

    <Divider sx={{ my: 3, borderStyle: "dashed" }} />

    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
      <Typography variant="h6" fontWeight={800}>Total</Typography>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="h5" fontWeight={800} sx={{ color: "#1e293b" }}>
          ₹{total.toLocaleString("en-IN")}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Inclusive of all taxes
        </Typography>
      </Box>
    </Box>

    <Button
      type="submit"
      fullWidth
      variant="contained"
      disabled={loading}
      startIcon={!loading && <LockIcon sx={{ fontSize: 18 }} />}
      sx={{
        py: 2,
        fontSize: "1rem",
        fontWeight: 700,
        borderRadius: "14px",
        textTransform: "none",
        background: "#1e293b",
        "&:hover": {
          background: "#0f172a",
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Secure Checkout"}
    </Button>
  </Paper>
</Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
