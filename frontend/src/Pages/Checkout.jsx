import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Home,
  LocationCity,
  Map,
  PinDrop,
  AddCircleOutline,
} from "@mui/icons-material";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart, removeFromCart, increaseQty, decreaseQty } =
    useCart();
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user"));

  const Protectfee = 150;

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [delivery, setDelivery] = useState("standard");
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMsg, setGiftMsg] = useState("");
  const [notes, setNotes] = useState("");
  const [couponMsg, setCouponMsg] = useState(null);
  const [paymentError, setPaymentError] = useState(null); // Now properly read below
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{ p: 6, textAlign: "center", borderRadius: 4, maxWidth: 500 }}
        >
          <Typography variant="h4" fontWeight={700}>
            🛒 Your Cart is Feeling Lonely
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/apple")}
          >
            Start Shopping
          </Button>
        </Paper>
      </Box>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace(/,/g, "")) * item.quantity,
    0,
  );

  const deliveryCharge = delivery === "express" ? 99 : 0;
  const giftCharge = giftWrap ? 49 : 0;
  const total = subtotal - discount + deliveryCharge + giftCharge + Protectfee;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setCouponMsg({
        type: "success",
        text: `Coupon applied! You saved ₹${disc}`,
      });
    } else {
      setDiscount(0);
      setCouponMsg({ type: "error", text: "Invalid coupon code" });
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setPaymentError(null);
    setLoading(true);

    if (!window.Razorpay) {
      setPaymentError(
        "Payment system failed to load. Please check your connection.",
      );
      setLoading(false);
      return;
    }

    const rzp = new window.Razorpay({
      key: "rzp_test_SD84DQrFfdGAmn",
      amount: total * 100,
      currency: "INR",
      name: "Adbliss Ecommerce",
      description: "Order Payment",
      handler: function () {
        setLoading(false);
        clearCart();
        navigate("/order-success");
      },
      prefill: { name: form.name, contact: form.phone, email: form.email },
      notes: { address: `${form.address}, ${form.city}`, giftMessage: giftMsg },
      theme: { color: "#c0974b" },
    });

    rzp.on("payment.failed", (response) => {
      setLoading(false);
      setPaymentError(
        response.error.description || "Payment failed. Please try again.",
      );
    });

    rzp.open();
  };

  return (
    <Box>
      <Box
        sx={{ mt: 10, px: { xs: 2, md: 6 }, pb: 2, pt: 10, bgcolor: "#f5f5f5" }}
      >
        <Typography variant="h4" fontWeight={700} mb={4}>
          Checkout
        </Typography>

        <form onSubmit={handleOrder}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {/* SHIPPING DETAILS */}
              <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                  Shipping Details
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={form.name}
                      onChange={handleChange("name")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      value={form.email}
                      onChange={handleChange("email")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Pincode"
                      value={form.pincode}
                      onChange={handleChange("pincode")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PinDrop fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Address"
                      value={form.address}
                      onChange={handleChange("address")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Home fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Town/City"
                      value={form.city}
                      onChange={handleChange("city")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationCity fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="State"
                      value={form.state}
                      onChange={handleChange("state")}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Map fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>

              {/* CONSOLIDATED OPTIONS */}
              <Paper sx={{ p: 4, borderRadius: 3, mt: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography fontWeight={600} mb={2}>
                      Delivery & Coupons
                    </Typography>
                    <RadioGroup
                      value={delivery}
                      onChange={(e) => setDelivery(e.target.value)}
                      sx={{
                        bgcolor: "#fafafa",
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid #eee",
                        mb: 3,
                      }}
                    >
                      <FormControlLabel
                        value="standard"
                        control={<Radio />}
                        label="Standard - Free"
                      />
                      <FormControlLabel
                        value="express"
                        control={<Radio />}
                        label="Express - ₹99"
                      />
                    </RadioGroup>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        size="small"
                        fullWidth
                        label="Enter Code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        onClick={applyCoupon}
                        sx={{
                          bgcolor: "#c0974b",
                          "&:hover": { bgcolor: "#a97d3a" },
                        }}
                      >
                        Apply
                      </Button>
                    </Box>
                    {couponMsg && (
                      <Alert severity={couponMsg.type} sx={{ mt: 1, py: 0 }}>
                        {couponMsg.text}
                      </Alert>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography fontWeight={600} mb={2}>
                      Special Requests
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: "#fafafa",
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid #eee",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={giftWrap}
                            onChange={(e) => setGiftWrap(e.target.checked)}
                          />
                        }
                        label="🎁 This is a gift (+₹49)"
                      />
                      {giftWrap && (
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          placeholder="Gift message..."
                          value={giftMsg}
                          onChange={(e) => setGiftMsg(e.target.value)}
                          sx={{ mt: 1, bgcolor: "white" }}
                        />
                      )}
                      <Divider sx={{ my: 2 }} />
                      <TextField
                        fullWidth
                        label="Order Notes (Optional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        sx={{ bgcolor: "white" }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* ORDER REVIEW */}

              <Paper
                sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mb: 4, mt: 5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Order Review
                  </Typography>
                  <Button
                    startIcon={<AddCircleOutline />}
                    size="small"
                    onClick={() => navigate("/apple")}
                    sx={{ color: "#c0974b", fontWeight: 600 }}
                  >
                    Add More
                  </Button>
                </Box>

                {cartItems.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      // Switches to column on mobile so the big image doesn't squash the text
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      justifyContent: "space-between",
                      mb: 2,
                      borderBottom: "1px solid #eee",
                      pb: 2,
                      gap: { xs: 2, sm: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        sx={{
                          // Responsive width: slightly smaller on mobile, 200px on desktop
                          width: { xs: 120, sm: 200 },
                          height: "auto",
                          mr: { xs: 2, sm: 3 },
                          borderRadius: 2,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          fontWeight={500}
                          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                        >
                          {item.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 1,
                            flexWrap: "wrap",
                            gap: 1,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ minWidth: 30 }}
                              onClick={() => decreaseQty(item.id)}
                            >
                              −
                            </Button>
                            <Typography sx={{ mx: 1.5 }}>
                              {item.quantity}
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ minWidth: 30 }}
                              onClick={() => increaseQty(item.id)}
                            >
                              +
                            </Button>
                          </Box>
                          <Button
                            size="small"
                            color="error"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    </Box>

                    {/* Price aligns right on desktop, stays left/below on mobile */}
                    <Typography
                      fontWeight={600}
                      fontSize={32}
                      sx={{
                        alignSelf: { xs: "flex-end", sm: "center" },
                        mt: { xs: -2, sm: 0 },
                        fontSize: { xs: "1.25rem", md: "1.75rem" },
                      }}
                    >
                      ₹{Number(item.price.replace(/,/g, "")) * item.quantity}
                    </Typography>
                  </Box>
                ))}

                {/* PRICE DETAILS */}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "#fafafa",
                    borderRadius: 2,
                    border: "1px solid #eee",
                  }}
                >
                  <Typography fontWeight={600} mb={1}>
                    Price Details
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography>₹{subtotal}</Typography>
                  </Box>
                  {discount > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "green",
                        mb: 0.5,
                      }}
                    >
                      <Typography>Discount</Typography>
                      <Typography>-₹{discount}</Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography color="text.secondary">Delivery</Typography>
                    <Typography>
                      {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 0.5,
                    }}
                  >
                    <Typography color="text.secondary">
                      Protect Promise Fee
                    </Typography>
                    <Typography>₹{Protectfee}</Typography>
                  </Box>
                  {giftWrap && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography color="text.secondary">Gift Wrap</Typography>
                      <Typography>₹49</Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 1.5 }} />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight={700}>Total Amount</Typography>
                    <Typography fontWeight={700} color="#c0974b" variant="h6">
                      ₹{total}
                    </Typography>
                  </Box>

                  {paymentError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {paymentError}
                    </Alert>
                  )}

                  {/* Responsive Button Placement */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: { xs: "center", md: "flex-end" },
                      mt: 3,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={loading}
                      sx={{
                        bgcolor: "#c0974b",
                        py: 1.5,
                        fontWeight: 600,
                        // Custom width as requested: 100% on mobile, 200px on desktop
                        width: { xs: "100%", sm: "200px" },
                        "&:hover": { bgcolor: "#a97d3a" },
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Pay Now"
                      )}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* --- SIMPLE CHECKOUT FOOTER --- */}
      <Box
        component="footer"
        sx={{ pt: 8, pb: 2, textAlign: "center", bgcolor: "#d4c9bbff" }}
      >
        <Divider sx={{ mb: 4 }} />

        {/* Trust Badges */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mb: 3,
            flexWrap: "wrap",
            opacity: 0.7,
          }}
        >
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            🔒 SSL Secured Payment
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            📦 Easy Returns
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            📞 24/7 Support
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} Adbliss Ecommerce. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
