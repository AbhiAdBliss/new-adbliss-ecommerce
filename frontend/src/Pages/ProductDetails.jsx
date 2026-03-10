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
    features: ["256 GB ROM", "6.3 inch Super Retina XDR", "48MP Camera", "A19 Chip"]
  },
  {
    id: 2,
    brand: "Apple",
    name: "iPhone Air (256GB Storage, Sky Blue)",
    slug: "apple-iphone-air-256gb-storage-sky-blue",
    image: Apple2,
    price: 139990,
    features: ["256 GB ROM", "6.7 inch OLED Display", "64MP Camera", "A18 Chip"]
  },
  {
    id: 3,
    brand: "Apple",
    name: "Macbook Air M4 Chip",
    slug: "apple-macbook-air-m4-chip",
    image: Apple3,
    price: 114900,
    features: ["8GB RAM | 256GB SSD", "13.6 inch Retina", "M4 Chip", "18hr Battery"]
  },
  {
    id: 4,
    brand: "Apple",
    name: "iPad 11th Gen 2025",
    slug: "apple-ipad-11th-gen-2025",
    image: Apple4,
    price: 49900,
    features: ["128 GB", "11 inch Display", "12MP Camera", "A16 Chip"]
  },
  {
    id: 5,
    brand: "Apple",
    name: "Watch SE 3 GPS 44mm",
    slug: "apple-watch-se-3-gps-44mm",
    image: Apple5,
    price: 29900,
    features: ["44mm Display", "Heart Rate", "GPS", "Water Resistant"]
  },
  {
    id: 6,
    brand: "Apple",
    name: "Apple TV 4K",
    slug: "apple-tv-4k",
    image: Apple6,
    price: 19900,
    features: ["128 GB", "4K HDR", "Dolby Atmos", "A15 Chip"]
  },
  {
    id: 7,
    brand: "Apple",
    name: "AirPods Pro 3",
    slug: "apple-airpods-pro-3",
    image: Apple7,
    price: 24900,
    features: ["Noise Cancellation", "Spatial Audio", "MagSafe", "30hr Battery"]
  },
  {
    id: 8,
    brand: "Apple",
    name: "iPhone 17 Pro",
    slug: "apple-iphone-17-pro",
    image: Apple8,
    price: 129900,
    features: ["256 GB", "OLED Display", "50MP Camera", "A19 Pro Chip"]
  },
  {
    id: 9,
    brand: "Apple",
    name: "MagSafe Battery",
    slug: "apple-magsafe-battery",
    image: Apple9,
    price: 10900,
    features: ["5000mAh", "MagSafe", "Fast Charging", "Compact Design"]
  }
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

  return (
    <Box>
      {/* LOADER */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)" }}>
        <Stack spacing={3} alignItems="center">
          <ShoppingBagIcon sx={{ fontSize: 60, color: "#2F80ED" }} />
          <Typography variant="h6">Preparing your order...</Typography>
          <CircularProgress size={45} sx={{ color: "#2F80ED" }} />
        </Stack>
      </Backdrop>

      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 }, bgcolor: "#f7f7f7ff", minHeight: "100vh" }}>
        <Grid container spacing={4} sx={{ maxWidth: "1600px", margin: "0 auto" }}>
          
          {/* PRODUCT IMAGE SECTION */}
          <Grid item xs={12} md={4}>
            <Paper sx={{
              p: 3,
              textAlign: "center",
              borderRadius: 4,
              bgcolor: "#fff",
              border: "1px solid #e4e3e3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: { md: "400px" }
            }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{ width: "100%", maxWidth: 360, height: "auto", objectFit: "contain" }}
              />
            </Paper>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
              <Button fullWidth variant="contained" onClick={handleAddToCart}
                sx={{ bgcolor: "#374151", fontWeight: 700, py: 1.5, "&:hover": {
        bgcolor: "#1f2937",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.35)" } }}>
                ADD TO CART
              </Button>

              <Button fullWidth variant="contained" onClick={handleBuyNow}
                sx={{ bgcolor: "#2F80ED", fontWeight: 700, py: 1.5,  "&:hover": {
        bgcolor: "#1e6fd9",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 16px rgba(37,99,235,0.4)"
      } }}>
                BUY NOW
              </Button>
            </Stack>
          </Grid>

          {/* PRODUCT DETAILS SECTION */}
          <Grid item xs={12} md={isLoggedIn ? 8 : 4} width={350}>
            <Box sx={{ height: "100%",mt:1 }}>
              <Typography variant="h5" fontWeight={800} sx={{ fontSize: { xs: "1.5rem", md: "1.6rem" } }}>
                {product.name}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                Premium Apple product with guaranteed performance.
              </Typography>

              <Typography variant="h4" sx={{ mt: 2, fontWeight: 900, color: "#000" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>Key Features:</Typography>
                {product.features.map((feature, index) => (
                  <Stack key={index} direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Typography sx={{ color: "#2F80ED", fontWeight: "bold" }}>•</Typography>
                    <Typography variant="body1">{feature}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* REGISTER CARD SECTION */}
          {!isLoggedIn && (
            <Grid item xs={12} md={4}>
              <Box sx={{
                border: "1px solid #e4e3e3",
                bgcolor: "#fafafa",
                borderRadius: 4,
                width: "100%", 
                maxWidth: { md: 550 }, 
                mx: "auto",
                overflow: "hidden"
              }}>
                <Register isEmbedded />
              </Box>
            </Grid>
          )}

        </Grid>
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
    fontWeight: 500
  }}
>
  {toastMsg}
</Alert>
      </Snackbar>
    </Box>
  );
}