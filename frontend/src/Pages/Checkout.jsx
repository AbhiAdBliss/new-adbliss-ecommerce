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
  Backdrop,
  Stack,
  Chip,
  Container,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LockIcon from "@mui/icons-material/Lock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import coinimg from "../assets/AppleS-imgs/coin-img.png";

/* ─── Step Indicator ─────────────────────────────────────────────────── */
const STEPS = ["Cart", "Shipping", "Payment"];

function StepIndicator({ current = 1 }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: { xs: 4, md: 5 }, gap: 0 }}>
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.8 }}>
              <Box sx={{
                width: { xs: 32, md: 38 }, height: { xs: 32, md: 38 },
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                bgcolor: done ? "#22c55e" : active ? "#1e293b" : "#e2e8f0",
                color: done || active ? "#fff" : "#94a3b8",
                fontWeight: 800, fontSize: { xs: "0.78rem", md: "0.85rem" },
                transition: "all 0.3s",
                boxShadow: active ? "0 4px 14px rgba(30,41,59,0.25)" : "none",
              }}>
                {done ? <CheckCircleIcon sx={{ fontSize: 18 }} /> : i + 1}
              </Box>
              <Typography sx={{
                fontSize: { xs: "0.68rem", md: "0.75rem" },
                fontWeight: active ? 700 : 500,
                color: active ? "#1e293b" : done ? "#22c55e" : "#94a3b8",
                whiteSpace: "nowrap",
              }}>
                {label}
              </Typography>
            </Box>
            {i < STEPS.length - 1 && (
              <Box sx={{
                flex: 1, height: 2, maxWidth: { xs: 40, md: 80 },
                bgcolor: done ? "#22c55e" : "#e2e8f0",
                mx: { xs: 1, md: 2 }, mb: 2.5, transition: "background 0.3s",
              }} />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
}

/* ─── Trust Badge Row ────────────────────────────────────────────────── */
function TrustBadges() {
  const badges = [
    { icon: <LockIcon sx={{ fontSize: 15, color: "#22c55e" }} />, text: "SSL Secured" },
    { icon: <VerifiedIcon sx={{ fontSize: 15, color: "#2F80ED" }} />, text: "100% Genuine" },
    { icon: <LocalShippingIcon sx={{ fontSize: 15, color: "#f59e0b" }} />, text: "Free Delivery" },
    { icon: <CreditCardIcon sx={{ fontSize: 15, color: "#a855f7" }} />, text: "Safe Payments" },
  ];
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1, md: 1.5 }, justifyContent: { xs: "center", md: "flex-start" }, mb: 3 }}>
      {badges.map((b, i) => (
        <Box key={i} sx={{
          display: "flex", alignItems: "center", gap: 0.6,
          bgcolor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 2, px: 1.2, py: 0.5,
        }}>
          {b.icon}
          <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#475569" }}>{b.text}</Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════════════════════════════════ */
export default function Checkout() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const savedUser = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user")); }
    catch { return null; }
  }, []);

  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  });

  const Protectfee = 0;

  const [coupon,       setCoupon]       = useState("");
  const [discount,     setDiscount]     = useState(0);
  const [couponMsg,    setCouponMsg]    = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [authError,    setAuthError]    = useState("");
  const [loading,      setLoading]      = useState(false);
  const [useCoins,     setUseCoins]     = useState(false);

  const [form, setForm] = useState({
    name:     savedUser?.name  || "",
    email:    savedUser?.email || "",
    phone:    savedUser?.phone || "",
    address1: "", address2: "",
    city: "", state: "", pincode: "", country: "India",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  useEffect(() => {
    if (cartItems.length === 0 && window.location.pathname !== "/order-success") {
      navigate("/apple");
    }
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = typeof item.price === "string"
      ? Number(item.price.replace(/,/g, ""))
      : Number(item.price);
    return sum + price * item.quantity;
  }, 0);

  const baseTotal      = subtotal - discount + Protectfee;
  const coinsAvailable = savedUser?.coins || 0;
  const coinsUsed      = useCoins ? Math.min(coinsAvailable, baseTotal) : 0;
  const total          = baseTotal - coinsUsed;

  // Milestone config — change these two values to adjust
  const MILESTONE  = 49999;
  const EXTRA_PCT  = 10;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setCouponMsg({ type: "success", text: `🎉 Coupon applied! You saved ₹${disc.toLocaleString("en-IN")}` });
    } else {
      setDiscount(0);
      setCouponMsg({ type: "error", text: "❌ Invalid coupon code. Try SAVE10" });
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
      const keyRes  = await fetch("/api/get-razorpay-key");
      const keyData = await keyRes.json();

      const orderRes = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const order = await orderRes.json();
      if (!order.id) throw new Error("Failed to create payment order");

      if (!window.Razorpay) { setPaymentError("Payment system not loaded"); setLoading(false); return; }

      const rzp = new window.Razorpay({
        key: keyData.key, amount: order.amount, currency: "INR",
        order_id: order.id, name: "ShopnBliss", description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyRes  = await fetch("/api/verify-payment", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...response, userId: user.id, amount: total }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.success) throw new Error("Payment verification failed");

            const res  = await fetch("/api/order", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId: user.id, amount: total, coinsUsed, address: form, items: cartItems }),
            });
            const data = await res.json();
            const updatedUser = { ...user, coins: data.coins };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.dispatchEvent(new Event("userUpdated"));
            clearCart();
            const orderId = "ORD" + Date.now();
            sessionStorage.setItem("orderSuccess", "true");
            navigate(`/order-success/${orderId}`);
          } catch (err) { setPaymentError(err.message); }
          finally { setLoading(false); }
        },
        prefill: { name: form.name, contact: form.phone, email: form.email },
        theme: { color: "#2F80ED" },
      });
      rzp.open();
    } catch (err) { setPaymentError(err.message); }
    finally { setLoading(false); }
  };

  /* ─── milestone derived values ─── */
  const remaining     = MILESTONE - subtotal;
  const milestonePct  = Math.min((subtotal / MILESTONE) * 100, 100);
  const milestoneHit  = subtotal >= MILESTONE;
  const coinsEarned   = Math.floor(total / 100);
  const totalSavings  = discount + coinsUsed;

  return (
    <>
      {/* ── LOADER ── */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.88)" }}>
        <Stack spacing={3} alignItems="center">
          <ShoppingBagIcon sx={{
            fontSize: 64, color: "#2F80ED",
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": { "0%": { transform: "scale(1)" }, "50%": { transform: "scale(1.18)" }, "100%": { transform: "scale(1)" } },
          }} />
          <Typography variant="h5" fontWeight={700}>Processing your payment...</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>Please do not close this window</Typography>
          <CircularProgress size={45} thickness={4} sx={{ color: "#2F80ED" }} />
        </Stack>
      </Backdrop>

      <Box sx={{ pt: { xs: 10, md: 12 }, pb: { xs: 8, md: 10 }, minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)" }}>
        <Container maxWidth="xl">

          {/* ── Page Header ── */}
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a", fontSize: { xs: "1.6rem", md: "2rem" }, letterSpacing: "-0.02em", mb: 0.5 }}>
              Secure Checkout
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: "0.9rem" }}>Complete your order in just a few steps</Typography>
          </Box>

          <StepIndicator current={1} />

          <form onSubmit={handleOrder}>
            <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">

              {/* ══ LEFT: Cart + Shipping ══ */}
              <Grid item xs={12} lg={8}>
                <Stack spacing={3}>

                  {/* ── Cart Items ── */}
                  <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                    <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2, borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 1.5, bgcolor: "#fafbfc" }}>
                      <ShoppingBagIcon sx={{ color: "#1e293b", fontSize: 20 }} />
                      <Typography fontWeight={800} fontSize="1rem" color="#0f172a">Your Cart</Typography>
                      <Chip label={`${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}`} size="small"
                        sx={{ bgcolor: "#1e293b", color: "#fff", fontWeight: 700, fontSize: "0.7rem", ml: "auto" }} />
                    </Box>

                    <Box sx={{ p: { xs: 2, md: 3 }, maxHeight: 420, overflowY: "auto" }}>
                      {authError && <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>{authError}</Alert>}
                      <Stack spacing={2}>
                        {cartItems.map((item, index) => (
                          <Box key={index} sx={{
                            display: "flex", flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: 2, sm: 2.5 },
                            p: { xs: 2, md: 2.5 }, borderRadius: 3, bgcolor: "#fff", border: "1px solid #f1f5f9",
                            transition: "all 0.2s", "&:hover": { borderColor: "#e2e8f0", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" },
                          }}>
                            <Box sx={{ width: { xs: 80, sm: 100, md: 110 }, height: { xs: 80, sm: 100, md: 110 }, flexShrink: 0, borderRadius: 2.5, bgcolor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #f1f5f9" }}>
                              <Box component="img" src={item.image} alt={item.name} sx={{ width: "85%", height: "85%", objectFit: "contain", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.08)" } }} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.88rem", md: "0.95rem" }, color: "#0f172a", lineHeight: 1.3, mb: 0.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: { xs: "normal", sm: "nowrap" } }}>
                                {item.name}
                              </Typography>
                              <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8", mb: 0.5 }}>Brand: Apple</Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Chip label={`Qty: ${item.quantity}`} size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontWeight: 600, fontSize: "0.7rem" }} />
                                <Chip label="In Stock" size="small" sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: 600, fontSize: "0.7rem" }} />
                              </Box>
                              <Button size="small" startIcon={<DeleteOutlineIcon sx={{ fontSize: 15 }} />} onClick={() => removeFromCart(item.id)}
                                sx={{ mt: 1, color: "#ef4444", fontSize: "0.72rem", textTransform: "none", p: 0, minWidth: "auto", "&:hover": { color: "#dc2626", bgcolor: "transparent" } }}>
                                Remove
                              </Button>
                            </Box>
                            <Box sx={{ textAlign: "right", flexShrink: 0, alignSelf: { xs: "flex-end", sm: "center" } }}>
                              <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", md: "1.1rem" }, color: "#0f172a" }}>
                                ₹{Number(item.price).toLocaleString("en-IN")}
                              </Typography>
                              <Typography sx={{ fontSize: "0.72rem", color: "#94a3b8" }}>per unit</Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Paper>

                  {/* ── Shipping Details ── */}
                  <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                    <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2, borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 1.5, bgcolor: "#fafbfc" }}>
                      <LocalShippingIcon sx={{ color: "#1e293b", fontSize: 20 }} />
                      <Typography fontWeight={800} fontSize="1rem" color="#0f172a">Shipping Details</Typography>
                    </Box>
                    <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
                      <Grid container spacing={2.5}>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth required label="Full Name" value={form.name} onChange={handleChange("name")} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth required label="Phone Number" value={form.phone} onChange={handleChange("phone")} inputProps={{ maxLength: 10 }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth required label="Email Address" type="email" value={form.email} onChange={handleChange("email")} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth required label="Street Address" multiline rows={2} value={form.address1} onChange={handleChange("address1")} placeholder="House no., Building, Street, Area" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth required label="City" value={form.city} onChange={handleChange("city")} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth required label="State" value={form.state} onChange={handleChange("state")} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth required label="Pincode" value={form.pincode} onChange={handleChange("pincode")} inputProps={{ maxLength: 6 }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField fullWidth required label="Country" value={form.country} onChange={handleChange("country")} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 3, p: 2, bgcolor: "#f0fdf4", borderRadius: 2.5, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 1.5 }}>
                        <LocalShippingIcon sx={{ color: "#16a34a", fontSize: 20, flexShrink: 0 }} />
                        <Box>
                          <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#16a34a" }}>Free Delivery</Typography>
                          <Typography sx={{ fontSize: "0.78rem", color: "#374151" }}>
                            Estimated delivery in <strong>3–5 business days</strong> · Same-day dispatch before 2 PM
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>

                  {/* ── Coupon Code ── */}
                  <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                    <Box sx={{ px: { xs: 2.5, md: 3.5 }, py: 2, borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 1.5, bgcolor: "#fafbfc" }}>
                      <LocalOfferIcon sx={{ color: "#1e293b", fontSize: 20 }} />
                      <Typography fontWeight={800} fontSize="1rem" color="#0f172a">Coupon Code</Typography>
                    </Box>
                    <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
                      <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                        <TextField fullWidth label="Enter coupon code" placeholder="e.g. SAVE10" value={coupon} onChange={(e) => setCoupon(e.target.value)} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }} />
                        <Button variant="outlined" onClick={applyCoupon} sx={{ borderColor: "#1e293b", color: "#1e293b", fontWeight: 700, borderRadius: 2.5, px: 3, whiteSpace: "nowrap", minWidth: { xs: "100%", sm: "auto" }, "&:hover": { bgcolor: "#1e293b", color: "#fff", borderColor: "#1e293b" } }}>
                          Apply
                        </Button>
                      </Box>
                      {couponMsg    && <Alert severity={couponMsg.type} sx={{ mt: 2, borderRadius: 2 }}>{couponMsg.text}</Alert>}
                      {paymentError && <Alert severity="error"          sx={{ mt: 2, borderRadius: 2 }}>{paymentError}</Alert>}
                    </Box>
                  </Paper>

                </Stack>
              </Grid>

              {/* ══ RIGHT: Order Summary ══ */}
              <Grid item xs={12} lg={4} sx={{width:500}}>
                <Box sx={{ position: { lg: "sticky" }, top: { lg: 120 } }}>
                  <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>

                    {/* Header */}
                    <Box sx={{ px: 3, py: 2.5, borderBottom: "1px solid #f1f5f9", bgcolor: "#0f172a" }}>
                      <Typography fontWeight={800} fontSize="1rem" color="#fff">Order Summary</Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", mt: 0.3 }}>
                        {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
                      </Typography>
                    </Box>

                    <Box sx={{ p: { xs: 2.5, md: 3 } }}>

                      {/* ── 1. Savings Banner — only when discount or coins applied ── */}
                      {totalSavings > 0 && (
                        <Box sx={{
                          mb: 2.5, p: 1.8, borderRadius: 3,
                          background: "linear-gradient(120deg, #064e3b, #065f46)",
                          display: "flex", alignItems: "center", gap: 1.5,
                          position: "relative", overflow: "hidden",
                        }}>
                          <Box sx={{ position: "absolute", right: -18, top: -18, width: 80, height: 80, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.05)" }} />
                          <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "1.1rem" }}>🎉</span>
                          </Box>
                          <Box>
                            <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", fontWeight: 600, letterSpacing: 1 }}>
                              TOTAL SAVINGS
                            </Typography>
                            <Typography sx={{ fontSize: "1rem", fontWeight: 900, color: "#6ee7b7", lineHeight: 1.2 }}>
                              You're saving ₹{totalSavings.toLocaleString("en-IN")} on this order!
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {/* ── 2. Spend Milestone Reward ── */}
                      {milestoneHit ? (
                        <Box sx={{
                          mb: 2.5, p: 1.8, borderRadius: 3,
                          background: "linear-gradient(120deg,#7c3aed,#a855f7)",
                          display: "flex", alignItems: "center", gap: 1.5,
                        }}>
                          <span style={{ fontSize: "1.4rem" }}>🏆</span>
                          <Box>
                            <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", fontWeight: 600, letterSpacing: .8 }}>
                              MILESTONE UNLOCKED
                            </Typography>
                            <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: "#fff" }}>
                              Extra {EXTRA_PCT}% cashback on your next order!
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Box sx={{ mb: 2.5, p: 1.8, borderRadius: 3, bgcolor: "#faf5ff", border: "1px solid #e9d5ff" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <span style={{ fontSize: "1rem" }}>⚡</span>
                            <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#7c3aed" }}>
                              Add ₹{remaining.toLocaleString("en-IN")} more → Unlock {EXTRA_PCT}% extra cashback
                            </Typography>
                          </Box>
                          <Box sx={{ height: 6, borderRadius: 6, bgcolor: "#ede9fe", overflow: "hidden" }}>
                            <Box sx={{
                              height: "100%", width: `${milestonePct}%`,
                              background: "linear-gradient(90deg,#7c3aed,#a855f7)",
                              borderRadius: 6, transition: "width 0.6s ease",
                            }} />
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                            <Typography sx={{ fontSize: "0.67rem", color: "#a78bfa" }}>₹0</Typography>
                            <Typography sx={{ fontSize: "0.67rem", color: "#7c3aed", fontWeight: 700 }}>
                              ₹{MILESTONE.toLocaleString("en-IN")} 🎁
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {/* ── 3. Cart item mini list ── */}
                      <Stack spacing={1.5} sx={{ mb: 3 }}>
                        {cartItems.map((item, i) => (
                          <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                            <Typography sx={{ fontSize: "0.82rem", color: "#475569", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {item.name}
                            </Typography>
                            <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a", flexShrink: 0 }}>
                              ₹{Number(item.price).toLocaleString("en-IN")}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>

                      <Divider sx={{ borderStyle: "dashed", mb: 2.5 }} />

                      {/* ── 4. Pricing breakdown ── */}
                      <Stack spacing={1.5} sx={{ mb: 2.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography sx={{ fontSize: "0.88rem", color: "#64748b" }}>Subtotal</Typography>
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: 600, color: "#0f172a" }}>
                            ₹{subtotal.toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography sx={{ fontSize: "0.88rem", color: "#64748b" }}>Delivery</Typography>
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: 600, color: "#16a34a" }}>FREE</Typography>
                        </Box>
                        {discount > 0 && (
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: "0.88rem", color: "#16a34a" }}>Coupon Discount</Typography>
                            <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#16a34a" }}>
                              −₹{discount.toLocaleString("en-IN")}
                            </Typography>
                          </Box>
                        )}
                      </Stack>

                      {/* ── 5. Coins toggle ── */}
                      <Box sx={{ bgcolor: "#fffbeb", border: "1px solid #fde68a", borderRadius: 3, p: 1.8, mb: 2.5 }}>
                        <FormControlLabel
                          control={
                            <Checkbox checked={useCoins} onChange={(e) => setUseCoins(e.target.checked)} size="small"
                              sx={{ color: "#f59e0b", "&.Mui-checked": { color: "#f59e0b" } }} />
                          }
                          label={
                            <Box sx={{ ml: 0.5 }}>
                              <Typography sx={{ fontSize: "0.83rem", fontWeight: 700, color: "#1e293b" }}>Use Loyalty Coins</Typography>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.2 }}>
                                <Typography sx={{ fontSize: "0.75rem", color: "#64748b" }}>Available:</Typography>
                                <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: "#d97706" }}>{user?.coins ?? 0}</Typography>
                                <Box component="img" src={coinimg} alt="coins" sx={{ width: 15, height: 15, objectFit: "contain", filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.1))" }} />
                              </Box>
                            </Box>
                          }
                          sx={{ m: 0, alignItems: "flex-start" }}
                        />
                        {useCoins && (
                          <Box sx={{ mt: 1.2, pt: 1.2, borderTop: "1px dashed #fde68a", display: "flex", justifyContent: "space-between" }}>
                            <Typography sx={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 600 }}>Coins Applied</Typography>
                            <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "#16a34a" }}>
                              −₹{coinsUsed.toLocaleString("en-IN")}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      <Divider sx={{ borderStyle: "dashed", mb: 2.5 }} />

                      {/* ── 6. Total ── */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 2.5 }}>
                        <Box>
                          <Typography sx={{ fontSize: "0.82rem", color: "#64748b", mb: 0.3 }}>Total Amount</Typography>
                          <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8" }}>Incl. all taxes</Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography sx={{ fontSize: { xs: "1.6rem", md: "1.9rem" }, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
                            ₹{total.toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                      </Box>
                      {totalSavings > 0 && (
  <Box
    sx={{
      mb: 2.5,
      mt: -1,
      px: 1.5,
      py: 0.8,
      borderRadius: 2,
      bgcolor: "#ecfdf5",
      border: "1px solid #bbf7d0",
      textAlign: "center"
    }}
  >
    <Typography
      sx={{
        fontSize: "0.78rem",
        fontWeight: 700,
        color: "#16a34a"
      }}
    >
      🎉 You're saving ₹{totalSavings.toLocaleString("en-IN")} on this order!
    </Typography>
  </Box>
)}

                      {/* ── 7. Coins earned on this order ── */}
                      <Box sx={{
                        mb: 2.5, px: 2, py: 1.4, borderRadius: 2.5,
                        bgcolor: "#f0fdf4", border: "1px solid #bbf7d0",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                          <span style={{ fontSize: "1rem" }}>🪙</span>
                          <Typography sx={{ fontSize: "0.78rem", color: "#166534", fontWeight: 600 }}>
                            You'll earn on this order
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 900, color: "#15803d" }}>
                          +{coinsEarned} coins
                        </Typography>
                      </Box>

                      {/* ── 8. Submit button ── */}
                      <Button
                        type="submit" fullWidth variant="contained" disabled={loading}
                        startIcon={!loading && <LockIcon sx={{ fontSize: 18 }} />}
                        sx={{
                          py: { xs: 1.6, md: 1.8 }, fontSize: "0.95rem", fontWeight: 800,
                          borderRadius: 3, textTransform: "none", bgcolor: "#0f172a", letterSpacing: "0.02em",
                          "&:hover": { bgcolor: "#1e293b", transform: "translateY(-2px)", boxShadow: "0 10px 24px rgba(15,23,42,0.25)" },
                          "&.Mui-disabled": { bgcolor: "#cbd5e1", color: "#94a3b8" },
                          transition: "all 0.2s",
                        }}
                      >
                        {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Proceed to Payment"}
                      </Button>

                      {/* ── 9. Trust badges ── */}
                      <Box sx={{ mt: 2.5 }}><TrustBadges /></Box>

                      {/* ── 10. Payment icons ── */}
                      <Box sx={{ textAlign: "center", mt: 1 }}>
                        <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8", mb: 1 }}>
                          Secured by Razorpay · UPI · Cards · Net Banking
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, flexWrap: "wrap" }}>
                          {["UPI", "Visa", "Mastercard", "RuPay", "NetBanking"].map((p) => (
                            <Box key={p} sx={{ px: 1.2, py: 0.4, bgcolor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 1, fontSize: "0.65rem", fontWeight: 700, color: "#475569" }}>
                              {p}
                            </Box>
                          ))}
                        </Box>
                      </Box>

                    </Box>
                  </Paper>
                </Box>
              </Grid>

            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
}