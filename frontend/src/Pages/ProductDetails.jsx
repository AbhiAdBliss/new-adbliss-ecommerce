import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "../context/useCart";
import Footer from "../Components/Footer";
import Register from "../Pages/Register";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GoldCoin from "../assets/AppleS-imgs/coin-img.png";
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

const products = [
  {
    id: 1,
    name: "Apple iPhone 17 (256GB Storage, Black)",
    image: Apple1,
    price: "94,900",
    features: [
      "256 GB ROM",
      "16.0 cm (6.3 inch) Super Retina XDR Display",
      "48MP + 48MP | 18MP Front Camera",
      "A19 Chip, 6 Core Processor",
      "1 Year Apple Warranty",
    ],
  },
  {
    id: 2,
    name: "Apple iPhone Air (256GB Storage, Sky Blue)",
    image: Apple2,
    price: "69,900",
    features: [
      "256 GB ROM",
      "6.7 inch OLED Display",
      "64MP Camera",
      "A18 Chip",
      "1 Year Warranty",
    ],
  },
  {
    id: 3,
    name: "Apple Macbook Air M4 Chip",
    image: Apple3,
    price: "1,24,900",
    features: [
      "8GB RAM | 256GB SSD",
      "13.6 inch Retina Display",
      "M4 Chip Processor",
      "18 Hours Battery",
      "1 Year Warranty",
    ],
  },
  {
    id: 4,
    name: "Apple iPad 11th Gen 2025",
    image: Apple4,
    price: "49,900",
    features: [
      "128 GB ROM",
      "11 inch Display",
      "12MP Camera",
      "A16 Chip",
      "1 Year Warranty",
    ],
  },
  {
    id: 5,
    name: "Apple Watch SE 3 GPS 44mm",
    image: Apple5,
    price: "29,900",
    features: [
      "44mm Display",
      "Heart Rate Monitor",
      "GPS Enabled",
      "Water Resistant",
      "1 Year Warranty",
    ],
  },
  {
    id: 6,
    name: "Apple TV 4K",
    image: Apple6,
    price: "19,900",
    features: [
      "128 GB Storage",
      "4K HDR",
      "Dolby Atmos",
      "A15 Chip",
      "1 Year Warranty",
    ],
  },
  {
    id: 7,
    name: "Apple AirPods Pro 3",
    image: Apple7,
    price: "24,900",
    features: [
      "Active Noise Cancellation",
      "Spatial Audio",
      "MagSafe Charging",
      "30 Hours Battery",
      "1 Year Warranty",
    ],
  },
  {
    id: 8,
    name: "Apple iPhone 17 Pro",
    image: Apple8,
    price: "89,900",
    features: [
      "256 GB ROM",
      "OLED Display",
      "50MP Camera",
      "A19 Pro Chip",
      "1 Year Warranty",
    ],
  },
  {
    id: 9,
    name: "MagSafe Battery Pack",
    image: Apple9,
    price: "9,900",
    features: [
      "5000mAh Battery",
      "MagSafe Compatible",
      "Fast Charging",
      "Compact Design",
      "1 Year Warranty",
    ],
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  // Check if user exists in localStorage
  const isLoggedIn = localStorage.getItem("user");

  const [openToast, setOpenToast] = React.useState(false);

  if (!product)
    return <Typography sx={{ mt: 10 }}>Product not found</Typography>;

  // --- Handlers ---
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setOpenToast(true);
    } else {
      addToCart(product);
      navigate("/cart"); // Redirect to cart page after adding
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setOpenToast(true);
    } else {
      addToCart(product);
      navigate("/checkout"); // Redirect to checkout
    }
  };

  return (
    <Box>
      <Box sx={{ mt: 12, px: { xs: 2, md: 6 }, py: 4, bgcolor: "white" }}>
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          sx={{ maxWidth: "1400px", margin: "0 auto" }}
        >
          {/* LEFT SIDE */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                border: "1px solid #e4e3e3ff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 🔥 COIN STICKER */}
              <Box
                sx={{
                  position: "absolute",
                  top: 15,
                  left: -35,
                  transform: "rotate(-45deg)",
                  bgcolor: "#f7e895ff",
                  color: "#000",
                  pl: 3,
                  pr: 2,
                  py: 0.4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 0.5,
                  zIndex: 2,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  width: "140px",
                }}
              >
                <Box
                  component="img"
                  src={Coupn}
                  alt="coin"
                  sx={{
                    width: 16,
                    height: 16,
                    objectFit: "contain",
                    color:'white',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
               Lucky Coupon
                </Typography>
              </Box>

              {/* PRODUCT IMAGE */}
              <Box
                component="img"
                src={product?.image}
                alt={product?.name}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  objectFit: "contain",
                }}
              />
            </Paper>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  bgcolor: "#2F80ED",
                  color: "#fff",
                  fontWeight: 600,
                  py: 1.2,
                  borderRadius: "10px",
                  boxShadow: "0 4px 14px rgba(47,128,237,0.4)",
                }}
              >
                ADD TO CART
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  bgcolor: "#9B6DFF",
                  color: "#fff",
                  fontWeight: 600,
                  py: 1.2,
                  borderRadius: "10px",
                  boxShadow: "0 4px 14px rgba(155,109,255,0.4)",
                }}
              >
                BUY NOW
              </Button>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={8}>
            <Grid
              container
              spacing={6}
              alignItems="flex-start"
              direction={{ xs: "column", md: "row" }}
            >
              <Grid item xs={12} md={7} pt={3} sx={{ width: "320px" }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h5">
                Shop now for a chance to win, or enjoy 100% cashback.
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ pl: 2, color: "text.secondary" }}>
                  {product.features?.map((feature, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 1 }}>
                      <Typography>•</Typography>
                      <Typography>{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                
              </Grid>

              {/* SIDEBAR: Only show Register if NOT logged in */}
              {!isLoggedIn && (
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      border: "1px solid #e4e3e3",
                      borderRadius: 2,
                      // p: 2,
                      bgcolor: "#fafafa",
                      position: { md: "sticky" },
                      top: { md: 100 },
                      maxWidth: "520px",
                      width: "100%",
                      ml: { md: "auto" },
                     
                     
                    }}
                  >
                    <Register isEmbedded/>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          🔐 Please login or register first to continue
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}
