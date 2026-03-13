import React, { useState, useEffect, useRef } from "react";
import {
  Box, Container, Paper, Typography, Avatar, Grid, Button,
  IconButton, Card, Divider, Stack, Chip, Tooltip, Badge,
  Skeleton, Alert
} from "@mui/material";
import EditIcon             from "@mui/icons-material/Edit";
import ShieldMoonIcon       from "@mui/icons-material/ShieldMoon";
import LocalMallIcon        from "@mui/icons-material/LocalMall";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArrowForwardIosIcon  from "@mui/icons-material/ArrowForwardIos";
import LogoutIcon           from "@mui/icons-material/Logout";
import FavoriteIcon         from "@mui/icons-material/Favorite";
import NotificationsIcon    from "@mui/icons-material/Notifications";
import LocationOnIcon       from "@mui/icons-material/LocationOn";
import PhoneIcon            from "@mui/icons-material/Phone";
import StarIcon             from "@mui/icons-material/Star";
import EmojiEventsIcon      from "@mui/icons-material/EmojiEvents";
import PaymentIcon          from "@mui/icons-material/Payment";
import HelpOutlineIcon      from "@mui/icons-material/HelpOutline";
import CheckCircleIcon      from "@mui/icons-material/CheckCircle";
import LocalShippingIcon    from "@mui/icons-material/LocalShipping";
import HourglassTopIcon     from "@mui/icons-material/HourglassTop";
import CancelIcon           from "@mui/icons-material/Cancel";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import { useNavigate }      from "react-router-dom";

import API from "../api";

/* ─────────────────────────────────────────
   CONFIG  — update to your EC2 server URL
───────────────────────────────────────── */
const BASE_URL = "http://localhost:5001";

/* ─── Single font ─── */
const FONT = "'Nunito', sans-serif";

/* ─── Tier rules based on coins ─── */
const getTier = (coins) => {
  if (coins >= 2000) return { label: "Platinum", color: "#8B5CF6", next: null,   needed: 0    };
  if (coins >= 1000) return { label: "Gold",     color: "#F59E0B", next: "Platinum", needed: 2000 - coins };
  return               { label: "Silver",  color: "#94A3B8", next: "Gold",     needed: 1000 - coins };
};

const tierProgressMax = (coins) => {
  if (coins >= 2000) return 2000;
  if (coins >= 1000) return 2000;
  return 1000;
};

/* ─── Order status config ─── */
const STATUS_CFG = {
  Pending:    { color: "#F59E0B", bg: "#FFFBEB", icon: <HourglassTopIcon  sx={{ fontSize: 13 }} /> },
  Processing: { color: "#6366F1", bg: "#EEF2FF", icon: <HourglassTopIcon  sx={{ fontSize: 13 }} /> },
  Shipped:    { color: "#0EA5E9", bg: "#E0F2FE", icon: <LocalShippingIcon sx={{ fontSize: 13 }} /> },
  Delivered:  { color: "#10B981", bg: "#ECFDF5", icon: <CheckCircleIcon   sx={{ fontSize: 13 }} /> },
  Cancelled:  { color: "#EF4444", bg: "#FEF2F2", icon: <CancelIcon        sx={{ fontSize: 13 }} /> },
};

/* ─── Inject keyframes + font once ─── */
if (!document.getElementById("bliss-profile-styles")) {
  const s = document.createElement("style");
  s.id = "bliss-profile-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap');
    @keyframes bpFadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes bpSlideL  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
    @keyframes bpPulse   { 0%{box-shadow:0 0 0 0 rgba(99,102,241,.35)} 70%{box-shadow:0 0 0 14px rgba(99,102,241,0)} 100%{box-shadow:0 0 0 0 rgba(99,102,241,0)} }
    @keyframes bpFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    .bp-fadeup   { animation: bpFadeUp  .6s  cubic-bezier(.22,.68,0,1.2) both; }
    .bp-slideleft{ animation: bpSlideL  .55s cubic-bezier(.22,.68,0,1.2) both; }
    .bp-pulse    { animation: bpPulse   2.5s ease-out infinite; }
    .bp-float    { animation: bpFloat   3s   ease-in-out  infinite; }
  `;
  document.head.appendChild(s);
}

/* ─── Animated counter ─── */
const Counter = ({ target, duration = 1200 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      const step = Math.ceil(target / (duration / 16));
      const t = setInterval(() => {
        n += step;
        if (n >= target) { setVal(target); clearInterval(t); }
        else setVal(n);
      }, 16);
    }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
};

/* ─── Stat card ─── */
const StatCard = ({ icon, value, label, color, onClick, delay = 0, loading }) => (
 <Card
  onClick={onClick}
  className="bp-fadeup"
 sx={{
  width: { xs: "135px", sm: "147px", md:"157px" },
  height: 120,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  bgcolor: "#fff",
  borderRadius: 4,
  border: "1px solid #E5E7EB",
  textAlign: "center",
  p: { xs: 2, md: 2.5 },
  cursor: onClick ? "pointer" : "default",
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
  transition: "transform .25s, box-shadow .25s",
  animationDelay: `${delay}ms`,
  "&:hover": onClick
    ? {
        transform: "translateY(-4px)",
        boxShadow: "0 14px 28px rgba(0,0,0,0.09)"
      }
    : {},
}}
>
    <Box sx={{ color, display: "flex", justifyContent: "center", fontSize: 30, mb: 0.5 }}>{icon}</Box>
    {loading
      ? <Skeleton variant="text" width={40} height={36} sx={{ mx: "auto" }} />
      : <Typography variant="h5" sx={{ fontWeight: 800, color: "#111", fontFamily: FONT }}>
          <Counter target={typeof value === "number" ? value : 0} />
        </Typography>
    }
    <Typography variant="caption" sx={{ color: "#9CA3AF", letterSpacing: 1, fontWeight: 700, fontFamily: FONT, fontSize: ".65rem" }}>
      {label}
    </Typography>
  </Card>
);

/* ─── Settings row ─── */
const RowItem = ({ icon, label, sublabel, onClick, delay = 0, accent = "#6366F1" }) => (
  <Box className="bp-slideleft" onClick={onClick} sx={{
    p: { xs: 2, md: 2.5 }, display: "flex", alignItems: "center",
    justifyContent: "space-between", cursor: "pointer",
    animationDelay: `${delay}ms`,
    transition: "background .18s",
    "&:hover": { bgcolor: "#F9FAFB" },
    "&:hover .bp-arrow": { transform: "translateX(4px)" },
  }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Box sx={{ bgcolor: `${accent}18`, p: 1.2, borderRadius: 2.5, display: "flex", color: accent }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 600, color: "#111", fontFamily: FONT, fontSize: ".93rem" }}>{label}</Typography>
        {sublabel && <Typography sx={{ color: "#9CA3AF", fontSize: ".74rem", fontFamily: FONT }}>{sublabel}</Typography>}
      </Box>
    </Stack>
    <ArrowForwardIosIcon className="bp-arrow" sx={{ fontSize: 13, color: "#D1D5DB", transition: "transform .2s" }} />
  </Box>
);

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
const Profile = () => {
  const navigate = useNavigate();

  const [user,         setUser]         = useState(null);
  const [orders,       setOrders]       = useState([]);
  const [userLoading,  setUserLoading]  = useState(true);
  const [orderLoading, setOrderLoading] = useState(true);
  const [error,        setError]        = useState("");

  /* ── JWT token — adjust key name if yours is different ── */
  const token = localStorage.getItem("token");

  /* ── Axios instance ── */


/* ── Fetch user profile ── */
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/profile");

      setUser(res.data);

    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Could not load profile. Please try again.");
    } finally {
      setUserLoading(false);
    }
  };

  fetchProfile();
}, []);

  /* ── Fetch all orders ── */
 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Orders fetch error:", err);
    } finally {
      setOrderLoading(false);
    }
  };

  fetchOrders();
}, []);

  /* ── Logout ── */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  /* ── Not logged in ── */
  if (!token) {
    return (
      <Box sx={{ bgcolor: "#F4F6FB", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ color: "#111", fontWeight: 700, fontFamily: FONT }}>
            Please login to view your profile.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/login")}
            sx={{ bgcolor: "#6366F1", borderRadius: 3, textTransform: "none", fontWeight: 700, fontFamily: FONT }}>
            Go to Login
          </Button>
        </Stack>
      </Box>
    );
  }

  /* ── Derived values from real data ── */
  const coins       = user?.coins || 0;
  const tier        = getTier(coins);
  const maxCoins    = tierProgressMax(coins);
  const loyaltyPct  = Math.min((coins / maxCoins) * 100, 100);

  // Total amount spent across all orders
  const totalSpent  = orders.reduce((sum, o) => sum + (o.amount || 0), 0);

  // Latest 3 orders
  const recentOrders = orders.slice(0, 3);

  // Coins saved (coinsUsed across all orders)
  const coinsSaved  = orders.reduce((sum, o) => sum + (o.coinsUsed || 0), 0);

  /* ════════════════════ RENDER ════════════════════ */
  return (
    <Box sx={{ bgcolor: "#F4F6FB", minHeight: "100vh", py: { xs: 4, md: 8 }, fontFamily: FONT }}>
      <Container maxWidth="md">

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3, fontFamily: FONT }}>{error}</Alert>
        )}

        {/* ═══ HERO CARD ═══ */}
        <Paper className="bp-fadeup" elevation={0} sx={{
          borderRadius: { xs: 4, md: 6 }, overflow: "hidden",
          border: "1px solid #E5E7EB",
          boxShadow: "0 16px 48px rgba(0,0,0,0.07)",
        }}>
          {/* Banner */}
          <Box sx={{
            height: { xs: 90, md: 120 },
            background: "linear-gradient(120deg,#6366F1 0%,#A855F7 50%,#EC4899 100%)",
            position: "relative", overflow: "hidden",
          }}>
            <Box sx={{ position: "absolute", top: -20, right: -20, width: 160, height: 160, borderRadius: "50%", bgcolor: "rgba(255,255,255,.07)" }} />
            <Box sx={{ position: "absolute", top: 20, right: 80, width: 80, height: 80, borderRadius: "50%", bgcolor: "rgba(255,255,255,.05)" }} />
          </Box>

          <Box sx={{ px: { xs: 3, md: 5 }, pb: { xs: 3, md: 4 } }}>
            <Grid container spacing={3} alignItems="flex-end">

              {/* ── Avatar ── */}
              <Grid item xs={12} sm="auto">
                <Box sx={{ position: "relative", mt: { xs: -6, md: -7 }, display: "inline-block" }}>
                  {userLoading ? (
                    <Skeleton variant="circular" width={110} height={110} />
                  ) : (
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <Box className="bp-float" sx={{
                          bgcolor: tier.color, color: "#fff", borderRadius: 1.5,
                          px: 1, py: 0.2, fontSize: ".62rem", fontWeight: 800,
                          letterSpacing: .5, fontFamily: FONT,
                          border: "2px solid #fff", boxShadow: "0 4px 10px rgba(0,0,0,.15)",
                        }}>
                          {tier.label.toUpperCase()}
                        </Box>
                      }
                    >
                      <Avatar className="bp-pulse" sx={{
                        width: { xs: 96, md: 120 }, height: { xs: 96, md: 120 },
                        fontSize: { xs: "2.8rem", md: "3.4rem" },
                        background: "linear-gradient(135deg,#6366F1 0%,#A855F7 100%)",
                        color: "#fff", fontWeight: 800,
                        border: "5px solid #fff",
                        boxShadow: "0 8px 24px rgba(99,102,241,.3)",
                        fontFamily: FONT,
                      }}>
                        {user?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                  )}
                  <Tooltip title="Change photo">
                    <IconButton
                      onClick={() => alert("Upload profile picture – coming soon!")}
                      sx={{
                        position: "absolute", bottom: 4, right: -4,
                        bgcolor: "#111", color: "#fff", width: 28, height: 28,
                        "&:hover": { bgcolor: "#333" },
                        border: "2px solid #fff", boxShadow: "0 4px 10px rgba(0,0,0,.2)",
                      }}
                    >
                      <EditIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>

              {/* ── Info ── */}
              <Grid item xs={12} sm>
                {userLoading ? (
                  <Stack spacing={1}>
                    <Skeleton variant="text" width="55%" height={40} />
                    <Skeleton variant="text" width="75%" />
                    <Skeleton variant="text" width="45%" />
                  </Stack>
                ) : (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    flexWrap="wrap" gap={2}
                  >
                    <Box>
                      {/* Name + verified chip */}
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" mb={0.4}>
                        <Typography sx={{
                          fontWeight: 800, color: "#111", fontFamily: FONT,
                          fontSize: { xs: "1.5rem", md: "2rem" }, lineHeight: 1.1,
                        }}>
                          {user?.name}
                        </Typography>
                        <Chip
                          icon={<StarIcon sx={{ fontSize: "13px !important", color: "#fff !important" }} />}
                          label="VERIFIED"
                          size="small"
                          sx={{ bgcolor: "#6366F1", color: "#fff", fontSize: ".6rem", fontWeight: 700, letterSpacing: .8, fontFamily: FONT, height: 20 }}
                        />
                      </Stack>

                      {/* Email */}
                      <Typography sx={{ color: "#6B7280", fontSize: ".9rem", mb: .5, fontFamily: FONT }}>
                        {user?.email}
                      </Typography>

                      {/* Phone + location row */}
                      <Stack direction="row" spacing={2} flexWrap="wrap">
                        {user?.phone && (
                          <Stack direction="row" spacing={.4} alignItems="center">
                            <PhoneIcon sx={{ fontSize: 13, color: "#9CA3AF" }} />
                            <Typography sx={{ color: "#9CA3AF", fontSize: ".76rem", fontFamily: FONT }}>
                              {user.phone}
                            </Typography>
                          </Stack>
                        )}
                        {/* City from most recent order address */}
                        {orders[0]?.address?.city && (
                          <Stack direction="row" spacing={.4} alignItems="center">
                            <LocationOnIcon sx={{ fontSize: 13, color: "#9CA3AF" }} />
                            <Typography sx={{ color: "#9CA3AF", fontSize: ".76rem", fontFamily: FONT }}>
                              {orders[0].address.city}, {orders[0].address.state}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Box>

                    <Button
                      onClick={() => alert("Edit Profile – coming soon!")}
                      variant="outlined"
                      sx={{
                        borderColor: "#6366F1", color: "#6366F1",
                        borderRadius: "10px", px: 3, py: 1,
                        textTransform: "none", fontWeight: 700, fontFamily: FONT,
                        "&:hover": { bgcolor: "#EEF2FF", borderColor: "#4F46E5" },
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* ═══ STATS ═══ */}
        <Grid container spacing={2} sx={{ mt: 2  }}>
          {[
            { icon: <WorkspacePremiumIcon sx={{ fontSize: 28 }} />, value: coins,                label: "BLISS COINS",   color: "#F59E0B", delay: 100 },
            { icon: <LocalMallIcon        sx={{ fontSize: 28 }} />, value: orders.length,        label: "TOTAL ORDERS",  color: "#6366F1", delay: 200, onClick: () => navigate("/orders") },
            { icon: <ConfirmationNumberIcon sx={{ fontSize: 28 }}/>, value: coinsSaved,          label: "COINS SAVED",   color: "#EC4899", delay: 300 },
            { icon: <FavoriteIcon         sx={{ fontSize: 28 }} />, value: user?.redeemedCoupons?.length || 0, label: "COUPONS USED", color: "#10B981", delay: 400 },
          ].map((s, i) => (
           <Grid
  item
  xs={6}
  sm={3}
  key={i}
  display="flex"
  justifyContent={{ xs: "center", sm: "stretch" }}
>
  <StatCard {...s} loading={userLoading || orderLoading} />
</Grid>
          ))}
        </Grid>

        {/* ═══ LOYALTY PROGRESS ═══ */}
        <Paper className="bp-fadeup" elevation={0} sx={{
          mt: 3, p: { xs: 2.5, md: 3.5 },
          borderRadius: 4, border: "1px solid #FDE68A",
          background: "linear-gradient(135deg,#FFF7ED 0%,#FFFBF5 100%)",
          animationDelay: "500ms",
        }}>
          {userLoading ? (
            <Stack spacing={1.5}>
              <Skeleton variant="text" width="40%" height={28} />
              <Skeleton variant="rectangular" height={10} sx={{ borderRadius: 5 }} />
            </Stack>
          ) : (
            <>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} mb={2}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <EmojiEventsIcon sx={{ color: tier.color, fontSize: 30 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#111", fontFamily: FONT, fontSize: "1.02rem" }}>
                      {tier.label} Member
                    </Typography>
                    <Typography sx={{ color: "#92400E", fontSize: ".76rem", fontFamily: FONT }}>
                      {tier.next
                        ? `${tier.needed} coins to reach ${tier.next}`
                        : "🏆 You've reached the highest tier!"}
                    </Typography>
                  </Box>
                </Stack>
                <Chip
                  label={`${coins.toLocaleString()} coins`}
                  sx={{ bgcolor: tier.color, color: "#fff", fontWeight: 800, fontFamily: FONT }}
                />
              </Stack>

              {/* Progress bar */}
              <Box sx={{ height: 10, borderRadius: 10, bgcolor: "#FDE68A", overflow: "hidden" }}>
                <Box sx={{
                  height: "100%", width: `${loyaltyPct}%`,
                  background: `linear-gradient(90deg,${tier.color} 0%,#FBBF24 100%)`,
                  borderRadius: 10,
                  transition: "width 1.3s cubic-bezier(.22,.68,0,1.2)",
                }} />
              </Box>
              <Stack direction="row" justifyContent="space-between" mt={.8}>
                <Typography sx={{ color: "#92400E", fontSize: ".72rem", fontFamily: FONT }}>0</Typography>
                <Typography sx={{ color: "#92400E", fontSize: ".72rem", fontFamily: FONT, fontWeight: 700 }}>
                  {Math.round(loyaltyPct)}% complete
                </Typography>
                <Typography sx={{ color: "#92400E", fontSize: ".72rem", fontFamily: FONT }}>{maxCoins.toLocaleString()}</Typography>
              </Stack>
            </>
          )}
        </Paper>

        {/* ═══ RECENT ORDERS ═══ */}
        <Box sx={{ mt: 4 }} className="bp-fadeup" style={{ animationDelay: "600ms" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5} px={.5}>
            <Typography sx={{ fontWeight: 700, color: "#111", fontFamily: FONT, fontSize: "1.08rem" }}>
              Recent Orders
            </Typography>
            {orders.length > 0 && (
              <Button size="small" onClick={() => navigate("/orders")}
                endIcon={<ArrowForwardIosIcon sx={{ fontSize: "11px !important" }} />}
                sx={{ color: "#6366F1", textTransform: "none", fontWeight: 700, fontFamily: FONT, "&:hover": { bgcolor: "#EEF2FF" } }}>
                View All ({orders.length})
              </Button>
            )}
          </Stack>

          <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #E5E7EB", overflow: "hidden" }}>

            {/* Loading skeletons */}
            {orderLoading && [0, 1, 2].map(i => (
              <Box key={i} sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
                <Skeleton variant="rounded" width={52} height={52} sx={{ borderRadius: 2.5, flexShrink: 0 }} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton variant="text" width="30%" height={16} />
                  <Skeleton variant="text" width="20%" height={14} />
                </Box>
              </Box>
            ))}

            {/* Empty state */}
            {!orderLoading && recentOrders.length === 0 && (
              <Box sx={{ p: { xs: 4, md: 5 }, textAlign: "center" }}>
                <LocalMallIcon sx={{ fontSize: 48, color: "#E5E7EB", mb: 1.5 }} />
                <Typography sx={{ color: "#9CA3AF", fontFamily: FONT, fontSize: ".95rem", fontWeight: 600 }}>
                  No orders yet
                </Typography>
                <Typography sx={{ color: "#D1D5DB", fontFamily: FONT, fontSize: ".82rem", mb: 2.5 }}>
                  Looks like you haven't placed any orders yet.
                </Typography>
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  sx={{ bgcolor: "#6366F1", borderRadius: 3, textTransform: "none", fontFamily: FONT, fontWeight: 700 }}
                >
                  Browse Products
                </Button>
              </Box>
            )}

            {/* Real order rows */}
            {!orderLoading && recentOrders.map((order, i) => {
              /* ── Order fields from YOUR schema ── */
              // order.items[]   → { id, name, image, price, quantity }
              // order.amount    → total amount paid
              // order.coinsUsed → coins redeemed
              // order.address   → { name, email, phone, address1, city, state, pincode }
              // order.createdAt → timestamp

              const firstItem  = order.items?.[0];
              const extraCount = (order.items?.length || 1) - 1;

              // Status: your schema has no status field — derive from age for display
              // If you add status later, use order.status directly
              const orderDate = new Date(order.createdAt);

const daysAgo = Math.floor((new Date() - orderDate) / 86400000);

const derivedStatus =
  daysAgo <= 2 ? "Processing"
  : daysAgo <= 5 ? "Shipped"
  : "Delivered";

const statusToUse = order.status || derivedStatus;
const cfg = STATUS_CFG[statusToUse] || STATUS_CFG.Delivered;

              const dateStr = orderDate.toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
              });

              return (
                <React.Fragment key={order._id}>
                  <Box
                    onClick={() => navigate(`/orders/${order._id}`)}
                    sx={{
                      p: { xs: 2, md: 2.5 }, display: "flex", alignItems: "center",
                      justifyContent: "space-between", cursor: "pointer",
                      gap: 2, transition: "background .18s",
                      "&:hover": { bgcolor: "#F9FAFB" },
                    }}
                  >
                    {/* Product image */}
                    <Box sx={{
                      width: 52, height: 52, borderRadius: 2.5, flexShrink: 0,
                      bgcolor: "#F3F4F6", display: "flex", alignItems: "center",
                      justifyContent: "center", overflow: "hidden",
                    }}>
                      {firstItem?.image
                        ? <img src={firstItem.image} alt={firstItem.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <LocalMallIcon sx={{ color: "#CBD5E1", fontSize: 22 }} />
                      }
                    </Box>

                    {/* Order details */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {/* Product name */}
                      <Typography sx={{
                        fontWeight: 700, color: "#111", fontFamily: FONT, fontSize: ".88rem",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {firstItem?.name || "Order"}
                        {extraCount > 0 && (
                          <Typography component="span" sx={{ color: "#9CA3AF", fontFamily: FONT, fontSize: ".76rem", ml: .6 }}>
                            +{extraCount} more item{extraCount > 1 ? "s" : ""}
                          </Typography>
                        )}
                      </Typography>

                      {/* Status badge + date */}
                      <Stack direction="row" spacing={1} alignItems="center" mt={.3} flexWrap="wrap">
                        <Box sx={{
                          display: "inline-flex", alignItems: "center", gap: .4,
                          bgcolor: cfg.bg, color: cfg.color,
                          px: 1, py: .25, borderRadius: 2,
                          fontSize: ".7rem", fontWeight: 800, fontFamily: FONT,
                        }}>
                          {cfg.icon}
                          {statusToUse}
                        </Box>
                        <Typography sx={{ color: "#9CA3AF", fontSize: ".72rem", fontFamily: FONT }}>
                          · {dateStr}
                        </Typography>
                      </Stack>

                      {/* Amount + coins used */}
                      <Stack direction="row" spacing={1.5} alignItems="center" mt={.2}>
                        <Typography sx={{ color: "#374151", fontSize: ".8rem", fontFamily: FONT, fontWeight: 700 }}>
                          ₹{order.amount?.toLocaleString("en-IN")}
                        </Typography>
                        {order.coinsUsed > 0 && (
                          <Typography sx={{
                            color: "#F59E0B", fontSize: ".72rem", fontFamily: FONT, fontWeight: 700,
                            bgcolor: "#FFFBEB", px: .8, py: .1, borderRadius: 1.5,
                          }}>
                            🪙 {order.coinsUsed} coins used
                          </Typography>
                        )}
                        {/* Delivery address city */}
                        {order.address?.city && (
                          <Typography sx={{ color: "#9CA3AF", fontSize: ".72rem", fontFamily: FONT }}>
                            → {order.address.city}
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    <ArrowForwardIosIcon sx={{ fontSize: 13, color: "#D1D5DB", flexShrink: 0 }} />
                  </Box>
                  {i < recentOrders.length - 1 && <Divider sx={{ mx: 2 }} />}
                </React.Fragment>
              );
            })}
          </Paper>
        </Box>

        {/* ═══ SPEND SUMMARY ═══ */}
        {!orderLoading && orders.length > 0 && (
          <Paper className="bp-fadeup" elevation={0} sx={{
            mt: 3, p: { xs: 2.5, md: 3 },
            borderRadius: 4,
            background: "linear-gradient(120deg,#6366F1,#A855F7,#EC4899)",
            overflow: "hidden", position: "relative",
            animationDelay: "700ms",
          }}>
            <Box sx={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", bgcolor: "rgba(255,255,255,.08)" }} />
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
              <Box>
                <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".74rem", fontWeight: 700, letterSpacing: 1.5, fontFamily: FONT }}>
                  BLISS MEMBER SINCE
                </Typography>
                <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem", fontFamily: FONT }}>
                  {user?.memberSince || new Date(user?.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </Typography>
              </Box>
              <Stack direction="row" spacing={3}>
                {[
                  { n: orders.length,                            l: "Orders"    },
                  { n: `₹${(totalSpent/1000).toFixed(1)}K`,     l: "Spent"     },
                  { n: coins.toLocaleString(),                   l: "Coins"     },
                ].map(s => (
                  <Box key={s.l} sx={{ textAlign: "center" }}>
                    <Typography sx={{ color: "#fff", fontWeight: 800, fontFamily: FONT, fontSize: "1.2rem" }}>{s.n}</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: ".7rem", fontFamily: FONT }}>{s.l}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Paper>
        )}

        {/* ═══ ACCOUNT SETTINGS ═══ */}
        <Box sx={{ mt: 4 }} className="bp-fadeup" style={{ animationDelay: "800ms" }}>
          <Typography sx={{ fontWeight: 700, color: "#111", fontFamily: FONT, fontSize: "1.08rem", mb: 1.5, px: .5 }}>
            Account Settings
          </Typography>
          <Paper elevation={0} sx={{ borderRadius: 4, border: "1px solid #E5E7EB", overflow: "hidden" }}>
            <RowItem icon={<ShieldMoonIcon />}    label="Privacy & Password"  sublabel="Manage password & 2FA"        onClick={() => navigate("/security")}      delay={850}  accent="#6366F1" />
            <Divider sx={{ mx: 2 }} />
            <RowItem icon={<LocalMallIcon />}     label="Delivery Addresses"  sublabel="From your past orders"        onClick={() => navigate("/addresses")}     delay={900}  accent="#10B981" />
            <Divider sx={{ mx: 2 }} />
            <RowItem icon={<PaymentIcon />}       label="Payment Methods"     sublabel="Cards, UPI & wallets"         onClick={() => navigate("/payments")}      delay={950}  accent="#F59E0B" />
            <Divider sx={{ mx: 2 }} />
            <RowItem icon={<NotificationsIcon />} label="Notifications"       sublabel="Email, SMS & push"            onClick={() => navigate("/notifications")} delay={1000} accent="#EC4899" />
            <Divider sx={{ mx: 2 }} />
            <RowItem icon={<HelpOutlineIcon />}   label="Help & Support"      sublabel="FAQs and contact us"          onClick={() => navigate("/support")}       delay={1050} accent="#0EA5E9" />
          </Paper>
        </Box>

        {/* ═══ LOGOUT ═══ */}
        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          fullWidth
          className="bp-fadeup"
          sx={{
            mt: 4, py: 1.5,
            color: "#DC2626", border: "1px solid #FECACA",
            borderRadius: "14px", fontWeight: 700, fontFamily: FONT,
            textTransform: "none", fontSize: ".95rem",
            bgcolor: "#FFF5F5", animationDelay: "1100ms",
            "&:hover": { bgcolor: "#FEF2F2", border: "1px solid #DC2626" },
          }}
        >
          Logout from Session
        </Button>

        <Box sx={{ height: { xs: 32, md: 16 } }} />
      </Container>
    </Box>
  );
};

export default Profile;