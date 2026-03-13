import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion as Motion, useInView } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import BoltIcon from "@mui/icons-material/Bolt";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import PeopleIcon from "@mui/icons-material/People";
import AppleIcon from "@mui/icons-material/Apple";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import VerifiedIcon from "@mui/icons-material/Verified";

// Assets
import Coupn from "../assets/AppleS-imgs/coupn-img.png";
import Apple1 from "../assets/AppleS-imgs/Apple1.png";
import Apple2 from "../assets/AppleS-imgs/Apple2.png";
import Apple3 from "../assets/AppleS-imgs/Apple3.png";
import Apple4 from "../assets/AppleS-imgs/Apple4.png";
import Apple5 from "../assets/AppleS-imgs/Apple5.png";
import Apple6 from "../assets/AppleS-imgs/Apple6.png";
import Apple7 from "../assets/AppleS-imgs/Apple7.png";
import Apple8 from "../assets/AppleS-imgs/Apple8.png";
import Apple9 from "../assets/AppleS-imgs/Apple9.png";
import bannerVideo from "../assets/Home-images/home-video1.mp4";

/* ── Products Data ─────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 17 (256GB Storage, Black)",
    slug: "apple-iphone-17-256gb-storage-black",
    image: Apple1,
    price: 89900,
    category: "iPhone",
    features: [
      "256 GB ROM",
      "6.3 inch Super Retina XDR",
      "48MP Camera",
      "A19 Chip",
    ],
    badge: "New Launch",
  },
  {
    id: 2,
    brand: "Apple",
    name: "iPhone Air (256GB Storage, Sky Blue)",
    slug: "apple-iphone-air-256gb-storage-sky-blue",
    image: Apple2,
    price: 139990,
    category: "iPhone",
    features: [
      "256 GB ROM",
      "6.7 inch OLED Display",
      "64MP Camera",
      "A18 Chip",
    ],
    badge: "Bestseller",
  },
  {
    id: 3,
    brand: "Apple",
    name: "Macbook Air M4 Chip",
    slug: "apple-macbook-air-m4-chip",
    image: Apple3,
    price: 114900,
    category: "Mac",
    features: [
      "8GB RAM | 256GB SSD",
      "13.6 inch Retina",
      "M4 Chip",
      "18hr Battery",
    ],
    badge: "Top Rated",
  },
  {
    id: 4,
    brand: "Apple",
    name: "iPad 11th Gen 2025",
    slug: "apple-ipad-11th-gen-2025",
    image: Apple4,
    price: 49900,
    category: "iPad",
    features: ["128 GB", "11 inch Display", "12MP Camera", "A16 Chip"],
    badge: "",
  },
  {
    id: 5,
    brand: "Apple",
    name: "Watch SE 3 GPS 44mm",
    slug: "apple-watch-se-3-gps-44mm",
    image: Apple5,
    price: 29900,
    category: "Watch",
    features: ["44mm Display", "Heart Rate", "GPS", "Water Resistant"],
    badge: "",
  },
  {
    id: 6,
    brand: "Apple",
    name: "Apple TV 4K",
    slug: "apple-tv-4k",
    image: Apple6,
    price: 19900,
    category: "Accessories",
    features: ["128 GB", "4K HDR", "Dolby Atmos", "A15 Chip"],
    badge: "",
  },
  {
    id: 7,
    brand: "Apple",
    name: "AirPods Pro 3",
    slug: "apple-airpods-pro-3",
    image: Apple7,
    price: 24900,
    category: "AirPods",
    features: [
      "Noise Cancellation",
      "Spatial Audio",
      "MagSafe",
      "30hr Battery",
    ],
    badge: "Hot",
  },
  {
    id: 8,
    brand: "Apple",
    name: "iPhone 17 Pro",
    slug: "apple-iphone-17-pro",
    image: Apple8,
    price: 129900,
    category: "iPhone",
    features: ["256 GB", "OLED Display", "50MP Camera", "A19 Pro Chip"],
    badge: "Pro",
  },
  {
    id: 9,
    brand: "Apple",
    name: "MagSafe Battery",
    slug: "apple-magsafe-battery",
    image: Apple9,
    price: 10900,
    category: "Accessories",
    features: ["5000mAh", "MagSafe", "Fast Charging", "Compact Design"],
    badge: "",
  },
];

const CATEGORIES = [
  "All",
  "iPhone",
  "Mac",
  "iPad",
  "Watch",
  "AirPods",
  "Accessories",
];

const BADGE_COLORS = {
  "New Launch": { bg: "#dbeafe", color: "#1d4ed8" },
  Bestseller: { bg: "#fef3c7", color: "#d97706" },
  "Top Rated": { bg: "#dcfce7", color: "#16a34a" },
  Hot: { bg: "#fee2e2", color: "#dc2626" },
  Pro: { bg: "#f3e8ff", color: "#7c3aed" },
};

/* ── Animated Counter ──────────────────────────────────────────────── */
function AnimatedStat({ value, label, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <Box ref={ref} sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: { xs: "2rem", md: "2.8rem" },
          fontWeight: 900,
          color: "#0f172a",
          lineHeight: 1,
        }}
      >
        {prefix}
        {count.toLocaleString("en-IN")}
        {suffix}
      </Typography>
      <Typography
        sx={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, mt: 0.5 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

/* ── Product Card ──────────────────────────────────────────────────── */
function ProductCard({ item, index }) {
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);

  const oldPrice = Math.round(item.price * 1.15);
  const discount = Math.round(((oldPrice - item.price) / oldPrice) * 100);
  const hasCoupon = false;
  const badgeStyle = BADGE_COLORS[item.badge] || null;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() =>
          navigate(
            hasCoupon
              ? `/product/${item.id}/loyality-coupon`
              : `/product/${item.slug}`,
          )
        }
        sx={{
          borderRadius: 4,
          width: { xs: "100%", sm: 380, md: 400 },
          maxWidth: 400,
          height: 450,
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
          bgcolor: "#fff",
          border: "1px solid #beccdaff",

          boxShadow: hovered
            ? "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1.5px #2F80ED"
            : "0 2px 12px rgba(0,0,0,0.05)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Lucky Coupon Badge */}
        {hasCoupon && (
          <Box
            sx={{
              position: "absolute",
              top: 30,
              left: -35,
              transform: "rotate(-45deg)",
              bgcolor: "#f7e895ff",
              color: "#000",
              pl: 0.5,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              zIndex: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              width: "140px",
            }}
          >
            <Box
              component="img"
              src={Coupn}
              alt="coupon"
              sx={{ width: 12, height: 14, objectFit: "contain" }}
            />
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "900",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              Lucky Coupon
            </Typography>
          </Box>
        )}

        {/* Category badge */}
        {badgeStyle && (
          <Box sx={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
            <Chip
              label={item.badge}
              size="small"
              sx={{
                bgcolor: badgeStyle.bg,
                color: badgeStyle.color,
                fontWeight: 700,
                fontSize: "0.68rem",
                height: 22,
                border: `1px solid ${badgeStyle.color}22`,
              }}
            />
          </Box>
        )}

        {/* Wishlist button */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setWished(!wished);
          }}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 2,
            bgcolor: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            width: 34,
            height: 34,
            "&:hover": { bgcolor: "#fff", transform: "scale(1.1)" },
            transition: "all 0.2s",
          }}
        >
          {wished ? (
            <FavoriteIcon sx={{ fontSize: 17, color: "#ef4444" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 17, color: "#94a3b8" }} />
          )}
        </IconButton>

        {/* Discount badge */}
        <Box
          sx={{
            position: "absolute",
            top: hovered ? 52 : 14,
            right: 14,
            zIndex: 2,
            transition: "top 0.3s ease",
          }}
        >
          <Box
            sx={{
              bgcolor: "#22c55e",
              color: "#fff",
              fontSize: "0.7rem",
              fontWeight: 800,
              px: 1,
              py: 0.3,
              borderRadius: 1,
            }}
          >
            {discount}% OFF
          </Box>
        </Box>

        {/* IMAGE */}
        <Box
          sx={{
            position: "relative",
            height: 220,
            bgcolor: "#f8fafc",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Subtle glow on hover */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: hovered
                ? "radial-gradient(circle at center, rgba(47,128,237,0.06) 0%, transparent 70%)"
                : "transparent",
              transition: "background 0.4s",
            }}
          />

          {/* Rating */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              bgcolor: "#388e3c",
              color: "#fff",
              px: 1,
              py: "2px",
              borderRadius: 1,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 0.4,
              zIndex: 1,
              boxShadow: "0 2px 6px rgba(56,142,60,0.4)",
            }}
          >
            4.5 <StarIcon sx={{ fontSize: 13 }} />
          </Box>

          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{
              height: "80%",
              width: "80%",
              objectFit: "contain",
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: hovered ? "scale(1.1) translateY(-4px)" : "scale(1)",
            }}
          />
        </Box>

        {/* CONTENT */}
        <CardContent sx={{ px: 2.5, pt: 2, pb: "16px !important" }}>
          <Typography
            sx={{
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "#2F80ED",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              mb: 0.3,
            }}
          >
            {item.brand}
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#0f172a",
              lineHeight: 1.3,
              mb: 1,
              minHeight: 40,
            }}
          >
            {item.name}
          </Typography>

          {/* Features */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6, mb: 1.8 }}>
            {item.features.slice(0, 3).map((f, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#f1f5f9",
                  color: "#475569",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {f}
              </Box>
            ))}
          </Box>

          {/* Price row */}
          <Box
            sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 0.5 }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "1.35rem",
                color: "#0f172a",
                lineHeight: 1,
              }}
            >
              ₹{item.price.toLocaleString("en-IN")}
            </Typography>
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#94a3b8",
                fontSize: "0.9rem",
              }}
            >
              ₹{oldPrice.toLocaleString("en-IN")}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ color: "#16a34a", fontWeight: 700, fontSize: "0.8rem" }}
            >
              Save ₹{(oldPrice - item.price).toLocaleString("en-IN")}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "#94a3b8",
                display: "flex",
                alignItems: "center",
                gap: 0.3,
              }}
            >
              <LocalShippingOutlinedIcon sx={{ fontSize: 13 }} /> Free delivery
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   APPLE SECTION
══════════════════════════════════════════════════════════════════════ */
export default function AppleSection() {
  // const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Box sx={{ bgcolor: "#f8fafc" }}>
      {/* ── MARQUEE ──────────────────────────────────────────────────── */}

      {/* ── HERO VIDEO ───────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "55vh", md: "750px" },
          overflow: "hidden",
        }}
      >
        <Box
          component="video"
          src={bannerVideo}
          autoPlay
          muted
          loop
          playsInline
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 60%, rgba(15,23,42,0.9) 100%)",
          }}
        />

        {/* Hero content */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            px: 2,
          }}
        >
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", sm: "2.8rem", md: "4rem" },
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                mb: 2,
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              Experience Apple
              <Box component="span" sx={{ color: "#2F80ED", display: "block" }}>
                Innovation
              </Box>
            </Typography>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography
              sx={{
                color: "rgba(255,255,255,0.65)",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                mb: 4,
                maxWidth: 480,
              }}
            >
              Premium devices. Unmatched performance. Delivered fast to your
              door.
            </Typography>
          </Motion.div>

          
        </Box>

        {/* Scroll indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            animation: "bounce 2s ease-in-out infinite",
            "@keyframes bounce": {
              "0%,100%": { transform: "translateX(-50%) translateY(0)" },
              "50%": { transform: "translateX(-50%) translateY(-8px)" },
            },
          }}
        >
          <Box
            sx={{
              width: 1.5,
              height: 28,
              bgcolor: "rgba(255,255,255,0.35)",
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            SCROLL
          </Typography>
        </Box>
      </Box>

      {/* ── STATS STRIP ──────────────────────────────────────────────── */}
      <Box sx={{ bgcolor: "#f8fafc", py: { xs: 4, md: 5 }, mt: 8 }}>
  <Container maxWidth="lg">
    <Grid container spacing={4} justifyContent="center">

      {[
        {
          value: 50000,
          label: "Happy Customers",
          suffix: "+",
          icon: <PeopleIcon sx={{ fontSize: 42 }} />
        },
        {
          value: 9,
          label: "Apple Products",
          suffix: "+",
          icon: <AppleIcon sx={{ fontSize: 42 }} />
        },
        {
          value: 48,
          label: "Hour Delivery",
          suffix: "hr",
          icon: <LocalShippingIcon sx={{ fontSize: 42 }} />
        },
        {
          value: 100,
          label: "Genuine Guarantee",
          suffix: "%",
          icon: <VerifiedIcon sx={{ fontSize: 42 }} />
        }
      ].map((stat, i) => (
        <Grid item xs={6} md={3} key={i} display="flex" justifyContent="center">

          <Motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >

            <Box
              sx={{
                width: 200,
                textAlign: "center",
                p: 3,
                borderRadius: 4,
                bgcolor: "#fff",
                boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
                transition: "all .35s ease",
                border:'1px solid #d7d7d7ff',
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.12)"
                }
              }}
            >

              {/* Floating animated icon */}
              <Motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  color: "#6366F1",
                  marginBottom: 10
                }}
              >
                {stat.icon}
              </Motion.div>

              {/* Counter */}
              <AnimatedStat {...stat} />

            </Box>

          </Motion.div>

        </Grid>
      ))}

    </Grid>
  </Container>
</Box>

      {/* ── PRODUCTS SECTION ─────────────────────────────────────────── */}
      <Box id="products-section" sx={{ py: { xs: 7, md: 10 } }}>
        <Container maxWidth="xl">
          {/* Section Header */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
              <Chip
                label="Apple Collection 2025"
                size="small"
                sx={{
                  bgcolor: "#dbeafe",
                  color: "#1d4ed8",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  mb: 2,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  mb: 1.5,
                }}
              >
                Best of Apple
              </Typography>
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  maxWidth: 480,
                  mx: "auto",
                }}
              >
                Discover the latest Apple devices — handpicked, genuine, and
                delivered fast.
              </Typography>
            </Box>
          </Motion.div>

          {/* Category Filter Tabs */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
                justifyContent: "center",
                mb: { xs: 4, md: 6 },
              }}
            >
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  variant={activeCategory === cat ? "contained" : "outlined"}
                  sx={{
                    borderRadius: 3,
                    px: 2.5,
                    py: 0.8,
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    textTransform: "none",
                    transition: "all 0.2s",
                    ...(activeCategory === cat
                      ? {
                          bgcolor: "#0f172a",
                          color: "#fff",
                          border: "1.5px solid #0f172a",
                          boxShadow: "0 4px 14px rgba(15,23,42,0.2)",
                          "&:hover": { bgcolor: "#1e293b" },
                        }
                      : {
                          borderColor: "#e2e8f0",
                          color: "#64748b",
                          bgcolor: "#fff",
                          "&:hover": {
                            borderColor: "#0f172a",
                            color: "#0f172a",
                            bgcolor: "#f8fafc",
                          },
                        }),
                  }}
                >
                  {cat}
                </Button>
              ))}
            </Box>
          </Motion.div>

          {/* Product Grid */}
          <Grid container spacing={3} justifyContent="center">
            {filtered.map((item, index) => (
              <Grid
                item
                key={item.id}
                xs={12}
                sm={6}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProductCard item={item} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── TRUST BADGES ─────────────────────────────────────────────── */}
      {/* <Box sx={{ bgcolor: "#0f172a", py: { xs: 3, md: 4 }, mt: 8}}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: (
                  <LocalShippingOutlinedIcon
                    sx={{ fontSize: 22, color: "#2F80ED" }}
                  />
                ),
                title: "Free Delivery",
                sub: "Pan India · 3–5 days",
              },
              {
                icon: <VerifiedIcon sx={{ fontSize: 22, color: "#22c55e" }} />,
                title: "100% Genuine",
                sub: "Authorised Apple Reseller",
              },
              {
                icon: <BoltIcon sx={{ fontSize: 22, color: "#f59e0b" }} />,
                title: "Same Day Dispatch",
                sub: "Orders before 2 PM",
              },
              {
                icon: (
                  <HeadsetMicOutlinedIcon
                    sx={{ fontSize: 22, color: "#a78bfa" }}
                  />
                ),
                title: "24/7 Support",
                sub: "Always here for you",
              },
            ].map((badge, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      // border:'2px solid red',
                      p: 2,
                      borderRadius: 3,
                      height: 60,
                      width: 200,

                      border: "1px solid rgba(255,255,255,0.07)",
                      bgcolor: "rgba(255,255,255,0.04)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.07)",
                        borderColor: "rgba(255,255,255,0.12)",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    <Box sx={{ flexShrink: 0 }}>{badge.icon}</Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {badge.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.7rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {badge.sub}
                      </Typography>
                    </Box>
                  </Box>
                </Motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box> */}

      {/* ── BOTTOM CTA BANNER ────────────────────────────────────────── */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
            py: { xs: 6, md: 8 },
            px: { xs: 2, md: 4 },
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            {/* Glow blobs */}
            <Box
              sx={{
                position: "absolute",
                top: -60,
                left: "25%",
                width: 300,
                height: 300,
                borderRadius: "50%",
                bgcolor: "#2F80ED",
                opacity: 0.08,
                filter: "blur(80px)",
                pointerEvents: "none",
              }}
            />

            <Chip
              label="Limited Time Offer"
              size="small"
              sx={{
                bgcolor: "rgba(239,68,68,0.15)",
                color: "#f87171",
                border: "1px solid rgba(239,68,68,0.3)",
                fontWeight: 700,
                fontSize: "0.72rem",
                mb: 3,
              }}
            />

            <Typography
              sx={{
                fontSize: { xs: "1.7rem", md: "2.8rem" },
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                mb: 1.5,
              }}
            >
              Use code{" "}
              <Box
                component="span"
                sx={{
                  color: "#2F80ED",
                  fontFamily: "monospace",
                  bgcolor: "rgba(47,128,237,0.12)",
                  px: 1.5,
                  borderRadius: 2,
                  border: "1px solid rgba(47,128,237,0.3)",
                }}
              >
                SAVE10
              </Box>{" "}
              for 10% off
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "0.9rem", md: "1rem" },
                mb: 4,
              }}
            >
              Apply at checkout to save on your entire order.
            </Typography>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#2F80ED",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                boxShadow: "0 8px 28px rgba(47,128,237,0.4)",
                "&:hover": {
                  bgcolor: "#1e6fd9",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Shop Now
            </Button>
          </Container>
        </Box>
      </Motion.div>
    </Box>
  );
}
