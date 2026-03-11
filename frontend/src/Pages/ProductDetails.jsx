import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
  Stack,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/useCart";
import Register from "../Pages/Register";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { motion as Motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import StorageIcon from "@mui/icons-material/Storage";

import Apple1 from "../assets/AppleS-imgs/Apple1.png";
import Apple2 from "../assets/AppleS-imgs/Apple2.png";
import Apple3 from "../assets/AppleS-imgs/Apple3.png";
import Apple4 from "../assets/AppleS-imgs/Apple4.png";
import Apple5 from "../assets/AppleS-imgs/Apple5.png";
import Apple6 from "../assets/AppleS-imgs/Apple6.png";
import Apple7 from "../assets/AppleS-imgs/Apple7.png";
import Apple8 from "../assets/AppleS-imgs/Apple8.png";
import Apple9 from "../assets/AppleS-imgs/Apple9.png";

const products = [
{
  id: 1,
  brand: "Apple",
  name: "iPhone 17 (256GB Storage, Black)",
  slug: "apple-iphone-17-256gb-storage-black",
  image: Apple1,
  price: 89900,
  features: [
    "256 GB ROM",
    "6.3 inch Super Retina XDR",
    "48MP Camera",
    "A19 Chip",
  ],
  highlights: [
    { title: "256 GB ROM", desc: "Store thousands of photos & videos" },
    { title: "A19 Chip", desc: "Ultra-fast performance and smooth gaming" },
    { title: "48MP Camera", desc: "Professional photography with great zoom" },
    { title: "12MP Front Camera", desc: "Sharp selfies and FaceTime calls" },
    { title: "6.3\" OLED Display", desc: "Immersive Super Retina XDR viewing" },
  ]
},

{
  id: 2,
  brand: "Apple",
  name: "iPhone Air (256GB Storage, Sky Blue)",
  slug: "apple-iphone-air-256gb-storage-sky-blue",
  image: Apple2,
  price: 139990,
  features: [
    "256 GB ROM",
    "6.7 inch OLED Display",
    "64MP Camera",
    "A18 Chip",
  ],
  highlights: [
    { title: "256 GB ROM", desc: "Large storage for apps, photos and videos" },
    { title: "A18 Chip", desc: "High speed processing and multitasking" },
    { title: "64MP Camera", desc: "Detailed photos with improved zoom" },
    { title: "12MP Front Camera", desc: "Clear selfies and video calls" },
    { title: "6.7\" OLED Display", desc: "Large immersive viewing experience" },
  ]
},

{
  id: 3,
  brand: "Apple",
  name: "Macbook Air M4 Chip",
  slug: "apple-macbook-air-m4-chip",
  image: Apple3,
  price: 114900,
  features: [
    "8GB RAM | 256GB SSD",
    "13.6 inch Retina",
    "M4 Chip",
    "18hr Battery",
  ],
  highlights: [
    { title: "M4 Chip", desc: "Next-generation Apple Silicon performance" },
    { title: "13.6\" Retina Display", desc: "Stunning colors and sharp text" },
    { title: "256GB SSD", desc: "Fast storage and quick app loading" },
    { title: "18 Hour Battery", desc: "All-day battery for work and travel" },
    { title: "Lightweight Design", desc: "Ultra portable aluminium body" },
  ]
},

{
  id: 4,
  brand: "Apple",
  name: "iPad 11th Gen 2025",
  slug: "apple-ipad-11th-gen-2025",
  image: Apple4,
  price: 49900,
  features: ["128 GB", "11 inch Display", "12MP Camera", "A16 Chip"],
  highlights: [
    { title: "128 GB Storage", desc: "Store apps, photos and files easily" },
    { title: "A16 Chip", desc: "Smooth performance and gaming" },
    { title: "11\" Display", desc: "Large immersive screen for movies & work" },
    { title: "12MP Camera", desc: "Clear photos and video calls" },
  ]
},

{
  id: 5,
  brand: "Apple",
  name: "Watch SE 3 GPS 44mm",
  slug: "apple-watch-se-3-gps-44mm",
  image: Apple5,
  price: 29900,
  features: ["44mm Display", "Heart Rate", "GPS", "Water Resistant"],
  highlights: [
    { title: "44mm Retina Display", desc: "Bright display for easy viewing" },
    { title: "Heart Rate Sensor", desc: "Track your health and fitness" },
    { title: "Built-in GPS", desc: "Track outdoor workouts accurately" },
    { title: "Water Resistant", desc: "Perfect for swimming and workouts" },
  ]
},

{
  id: 6,
  brand: "Apple",
  name: "Apple TV 4K",
  slug: "apple-tv-4k",
  image: Apple6,
  price: 19900,
  features: ["128 GB", "4K HDR", "Dolby Atmos", "A15 Chip"],
  highlights: [
    { title: "4K HDR", desc: "Ultra-high definition streaming quality" },
    { title: "Dolby Atmos", desc: "Immersive surround sound experience" },
    { title: "A15 Chip", desc: "Fast navigation and smooth apps" },
    { title: "Apple Ecosystem", desc: "Works seamlessly with iPhone & iPad" },
  ]
},

{
  id: 7,
  brand: "Apple",
  name: "AirPods Pro 3",
  slug: "apple-airpods-pro-3",
  image: Apple7,
  price: 24900,
  features: [
    "Noise Cancellation",
    "Spatial Audio",
    "MagSafe",
    "30hr Battery",
  ],
  highlights: [
    { title: "Active Noise Cancellation", desc: "Block unwanted noise" },
    { title: "Spatial Audio", desc: "Theatre-like sound experience" },
    { title: "MagSafe Charging", desc: "Easy magnetic charging support" },
    { title: "30 Hour Battery", desc: "Long listening time with case" },
  ]
},

{
  id: 8,
  brand: "Apple",
  name: "iPhone 17 Pro",
  slug: "apple-iphone-17-pro",
  image: Apple8,
  price: 129900,
  features: ["256 GB", "OLED Display", "50MP Camera", "A19 Pro Chip"],
  highlights: [
    { title: "A19 Pro Chip", desc: "Extreme speed and performance" },
    { title: "50MP Camera", desc: "Professional photography system" },
    { title: "256GB Storage", desc: "Store thousands of photos and apps" },
    { title: "OLED Display", desc: "Vibrant colours and sharp visuals" },
  ]
},

{
  id: 9,
  brand: "Apple",
  name: "MagSafe Battery",
  slug: "apple-magsafe-battery",
  image: Apple9,
  price: 10900,
  features: ["5000mAh", "MagSafe", "Fast Charging", "Compact Design"],
  highlights: [
    { title: "5000mAh Battery", desc: "Extra power for your iPhone" },
    { title: "MagSafe", desc: "Perfect magnetic alignment charging" },
    { title: "Fast Charging", desc: "Quick power boost when needed" },
    { title: "Compact Design", desc: "Slim portable battery pack" },
  ]
}
];

const highlightIcons = [
  <StorageIcon sx={{ fontSize: 28, color: "#555" }} />,
  <MemoryIcon sx={{ fontSize: 28, color: "#555" }} />,
  <CameraAltIcon sx={{ fontSize: 28, color: "#555" }} />,
  <PhotoCameraFrontIcon sx={{ fontSize: 28, color: "#555" }} />,
  <PhoneIphoneIcon sx={{ fontSize: 28, color: "#555" }} />,
];


export default function ProductDetails() {
  const navigate = useNavigate();
  const { param } = useParams();

  const product = React.useMemo(() => {
    return (
      products.find((p) => p.id === Number(param)) ||
      products.find((p) => p.slug === param)
    );
  }, [param]);

  const discount = 8;
const originalPrice = Math.round(product.price / (1 - discount / 100));

  const { addToCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const [openToast, setOpenToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">Product not found</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setToastMsg("🔐 Please login or register first");
      setOpenToast(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        addToCart(product);
        setLoading(false);
        setToastMsg("🛒 Item added to cart");
        setOpenToast(true);
      }, 700);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setToastMsg("🔐 Please login or register first");
      setOpenToast(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        addToCart(product);
        navigate("/checkout");
      }, 700);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box>
      {/* LOADER */}
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: 9999,
          backgroundColor: "rgba(0,0,0,0.85)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <ShoppingBagIcon sx={{ fontSize: 60, color: "#2F80ED" }} />
          <Typography variant="h6">Preparing your order...</Typography>
          <CircularProgress size={45} sx={{ color: "#2F80ED" }} />
        </Stack>
      </Backdrop>

      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 8 },
          bgcolor: "#f7f7f7ff",
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{ maxWidth: "1600px", margin: "0 auto" }}
        >
          {/* PRODUCT IMAGE SECTION */}
          <Grid item xs={12} md={isLoggedIn ? 4 : 4}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: "#fff",
                border: "1px solid #e4e3e3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: { md: "400px" },
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  maxWidth: isLoggedIn ? 460 : 340,
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Paper>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  bgcolor: "#374151",
                  fontWeight: 700,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#1f2937",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
                  },
                }}
              >
                ADD TO CART
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  bgcolor: "#2F80ED",
                  fontWeight: 700,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#1e6fd9",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(37,99,235,0.4)",
                  },
                }}
              >
                BUY NOW
              </Button>
            </Stack>
          </Grid>

          {/* PRODUCT DETAILS SECTION */}
          <Grid
            item
            xs={12}
            sx={{
              maxWidth: {
                xs: "100%",
                sm: isLoggedIn ? 420 : 340,
                md: isLoggedIn ? 460 : 360,
                lg: isLoggedIn ? 580 : 380,
              },

              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box sx={{ height: "100%", mt: 1 }}>
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ fontSize: { xs: "1.5rem", md: "1.6rem" } }}
              >
                {product.name}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
              >
                Premium Apple product with guaranteed performance.
              </Typography>


{/*=== Price */}
<Box sx={{ mt: { xs: 1.5, md: 2 } }}>
  <Typography
    variant="h4"
    sx={{
      fontWeight: 900,
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: { xs: "center", md: "flex-start" },
      gap: { xs: 0.8, md: 1.2 },
      flexWrap: "wrap", // prevents overflow on mobile
      fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" }
    }}
  >
    ₹{product.price.toLocaleString("en-IN")}

    <Typography
      component="span"
      sx={{
        textDecoration: "line-through",
        color: "#6b7280",
        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.6rem" },
        fontWeight: 500
      }}
    >
      ₹{originalPrice.toLocaleString("en-IN")}
    </Typography>

    <Typography
      component="span"
      sx={{
        color: "#38cb49ff",
        fontWeight: 700,
        fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" }
      }}
    >
      {discount}% OFF
    </Typography>
  </Typography>

  <Typography
    sx={{
      color: "#9b810fff",
      fontWeight: 600,
      fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
      mt: 0.5,
      textAlign: { xs: "center", md: "left" }
    }}
  >
    Inclusive of all taxes
  </Typography>
</Box>

       <Divider sx={{ my: 2 }} />

{/* =====section Product highlights === */}

 {isLoggedIn && ( 
  <Box sx={{ mt: { xs: 4, md: 6 } }}>

  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      mb: { xs: 3, md: 4 },
      fontSize: { xs: "1.6rem", md: "2rem" },
      textAlign: { xs: "center", md: "left" }
    }}
  >
    Product highlights
  </Typography>

  <Stack
    spacing={{ xs: 2.5, md: 3 }}
    sx={{ alignItems: { xs: "center", md: "flex-start" } }}
  >
    {product.highlights.map((item, index) => (

      <Box
        key={index}
        sx={{
          display: "flex",
          gap: { xs: 1.5, md: 2 },
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          flexDirection: { xs: "column", sm: "row" },
          width: "100%"
        }}
      >

        {/* ICON BOX */}
        <Box
          sx={{
            width: { xs: 50, md: 60 },
            height: { xs: 50, md: 60 },
            borderRadius: 3,
            bgcolor: "#e9eff6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: { xs: "auto", sm: 0 }
          }}
        >
          {highlightIcons[index]}
        </Box>

        {/* TEXT */}
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography
            sx={{
              fontSize: { xs: "15px", md: "18px" },
              fontWeight: 500,
              color: "#666"
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 500,
              color: "#222"
            }}
          >
            {item.desc}
          </Typography>
        </Box>

      </Box>
    ))}
  </Stack>

</Box>

  )}

              {/* SHOW FEATURES ONLY IF LOGGED IN */}
             
            </Box>
          </Grid>

          {/* REGISTER CARD SECTION */}
          {!isLoggedIn && (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #e4e3e3",
                  bgcolor: "#fafafa",
                  borderRadius: 4,
                  width: "100%",
                  maxWidth: { md: 550 },
                  mx: "auto",
                  overflow: "hidden",
                }}
              >
                <Register isEmbedded />
              </Box>
            </Grid>
          )}
        </Grid>

        {/* EXTRA PRODUCT DETAILS (ONLY FOR LOGGED IN USERS) */}

        {isLoggedIn && (
          <Motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ maxWidth: "90%", margin: "0 auto" }}
          >
            <Divider sx={{ my: 4, opacity: 0.6 }} />

            {/* Section: Description */}
            <Motion.div variants={item}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
              >
                <div
                  style={{
                    width: 4,
                    height: 24,
                    backgroundColor: "#000",
                    borderRadius: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight={800}
                  letterSpacing="-0.02em"
                >
                  Product Overview
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  fontSize: "1.05rem",
                  mb: 4,
                  textAlign: "justify",
                }}
              >
                Experience cutting-edge Apple technology designed for
                performance, elegance, and reliability. This device delivers
                exceptional speed, stunning display quality, and seamless
                integration with the Apple ecosystem.
              </Typography>
            </Motion.div>

            <Divider sx={{ my: 5 }} />

            {/* Section: Trust Badges */}
            <Motion.div variants={item}>
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 4,
                  background: "linear-gradient(135deg,#f8fbff,#eef4ff)",
                  border: "1px solid #e3ecff",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{
                    mb: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#1e293b",
                  }}
                >
                  Why Shop With Us?
                </Typography>

                <Grid container spacing={2}>
                  {[
                    {
                      icon: <VerifiedIcon sx={{ color: "#2F80ED" }} />,
                      text: "100% Genuine Apple Products",
                    },
                    {
                      icon: <SecurityIcon sx={{ color: "#22c55e" }} />,
                      text: "Secure Payments via Razorpay",
                    },
                    {
                      icon: <LocalShippingIcon sx={{ color: "#f59e0b" }} />,
                      text: "Fast Nationwide Delivery",
                    },
                    {
                      icon: <EmojiEventsIcon sx={{ color: "#eab308" }} />,
                      text: "Earn Loyalty Coins on Purchases",
                    },
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.2,
                          borderRadius: 2,
                          transition: "all .25s",
                          "&:hover": {
                            background: "#ffffff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: "#334155",
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Motion.div>
          </Motion.div>
        )}
      </Box>

      {/* TOAST */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="warning"
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 3,
            bgcolor: "#2F80ED",
            color: "white",
            fontWeight: 500,
          }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
