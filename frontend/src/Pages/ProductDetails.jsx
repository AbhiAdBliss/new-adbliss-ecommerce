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
import Footer from "../Components/Footer";
import Register from "../Pages/Register";
import Coupn from "../assets/AppleS-imgs/coupn-img.png";
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
  { id: 1, name: "Apple iPhone 17 (256GB Storage, Black)", image: Apple1, price: "199", features: ["256 GB ROM", "16.0 cm (6.3 inch) Super Retina XDR Display", "48MP + 48MP | 18MP Front Camera", "A19 Chip, 6 Core Processor", "1 Year Apple Warranty"] },
  { id: 2, name: "Apple iPhone Air (256GB Storage, Sky Blue)", image: Apple2, price: "69,900", features: ["256 GB ROM", "6.7 inch OLED Display", "64MP Camera", "A18 Chip", "1 Year Warranty"] },
  { id: 3, name: "Apple Macbook Air M4 Chip", image: Apple3, price: "149", features: ["8GB RAM | 256GB SSD", "13.6 inch Retina Display", "M4 Chip Processor", "18 Hours Battery", "1 Year Warranty"] },
  { id: 4, name: "Apple iPad 11th Gen 2025", image: Apple4, price: "49,900", features: ["128 GB ROM", "11 inch Display", "12MP Camera", "A16 Chip", "1 Year Warranty"] },
  { id: 5, name: "Apple Watch SE 3 GPS 44mm", image: Apple5, price: "99", features: ["44mm Display", "Heart Rate Monitor", "GPS Enabled", "Water Resistant", "1 Year Warranty"] },
  { id: 6, name: "Apple TV 4K", image: Apple6, price: "19,900", features: ["128 GB Storage", "4K HDR", "Dolby Atmos", "A15 Chip", "1 Year Warranty"] },
  { id: 7, name: "Apple AirPods Pro 3", image: Apple7, price: "199", features: ["Active Noise Cancellation", "Spatial Audio", "MagSafe Charging", "30 Hours Battery", "1 Year Warranty"] },
  { id: 8, name: "Apple iPhone 17 Pro", image: Apple8, price: "89,900", features: ["256 GB ROM", "OLED Display", "50MP Camera", "A19 Pro Chip", "1 Year Warranty"] },
  { id: 9, name: "MagSafe Battery Pack", image: Apple9, price: "149", features: ["5000mAh Battery", "MagSafe Compatible", "Fast Charging", "Compact Design", "1 Year Warranty"] },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  const isLoggedIn = localStorage.getItem("user");
  const [openToast, setOpenToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (!product) return <Typography sx={{ mt: 10, textAlign: 'center' }}>Product not found</Typography>;

  // MATCHING LOGIC: If Product ID is 1, 3, 5... (Odd), show Coupon. 
  // This matches Index 0, 2, 4... in your AppleSection.
  const hasCoupon = product.id % 2 !== 0;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setOpenToast(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        addToCart(product);
        navigate("/cart");
      }, 700);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
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
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)" }}>
        <Stack spacing={3} alignItems="center">
          <ShoppingBagIcon sx={{ fontSize: 60, color: "#2F80ED" }} />
          <Typography variant="h6">Preparing your order...</Typography>
          <CircularProgress size={45} sx={{ color: "#2F80ED" }} />
        </Stack>
      </Backdrop>

      <Box sx={{  px: { xs: 2, md: 3 }, py: 8, bgcolor: "#f7f7f7ff" }}>
        <Grid container spacing={{ xs: 4, md: 5 }} sx={{ maxWidth: "1600px", margin: "0 auto", }}>
          
          {/* LEFT SIDE: PRODUCT IMAGE & BADGE */}
          <Grid item xs={12} md={4}>
  <Paper
  sx={{
    p: 3,
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,

    bgcolor: hasCoupon 
     ? "#fdf7e3ff" : "#fff",

    border: hasCoupon
    ? "1px solid #f6c453" : "1px solid #e4e3e3ff",
  }}
>
              {/* LUCKY COUPON BADGE - Exact same style as AppleSection */}
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
                  <Box component="img" src={Coupn} alt="coupon" sx={{ width: 12, height: 14, objectFit: "contain" }} />
                  <Typography sx={{ fontSize: "10px", fontWeight: "900", whiteSpace: "nowrap", textTransform: 'uppercase' }}>
                    Lucky Coupon
                  </Typography>
                </Box>
              )}

              <Box
                component="img"
                src={product?.image}
                alt={product?.name}
                sx={{ width: "100%", maxWidth: 360, objectFit: "contain" }}
              />
            </Paper>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
              <Button fullWidth variant="contained" onClick={handleAddToCart}
                sx={{ bgcolor: "#2F80ED", color: "#fff", fontWeight: 700, py: 1.5, borderRadius: "12px" }}>
                ADD TO CART
              </Button>
              <Button fullWidth variant="contained" onClick={handleBuyNow}
                sx={{ bgcolor: "#9B6DFF", color: "#fff", fontWeight: 700, py: 1.5, borderRadius: "12px" }}>
                BUY NOW
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT SIDE: PRODUCT INFO */}
          <Grid item xs={12} md={8} >
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ width:400}} md={!isLoggedIn ? 7 : 12}>
                <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>{product.name}</Typography>
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h5" sx={{ fontWeight: 600, color: hasCoupon ? "#2F80ED" : "#121212" }}>
                  {hasCoupon 
                    ? "Shop now for a chance to win, or enjoy 100% cashback." 
                    : "Premium Apple product with guaranteed performance."}
                </Typography>
                
                <Typography variant="h4" sx={{ mt: 2, fontWeight: 900 }}>₹{product.price}</Typography>
                
                <Divider sx={{ my: 2 }} />

                <Box sx={{ color: "text.secondary" }}>
                  {product.features?.map((feature, index) => (
                    <Stack key={index} direction="row" spacing={1} sx={{ mb: 0.5 }}>
                      <Typography sx={{ color: "#2F80ED", fontWeight: 'bold' }}>•</Typography>
                      <Typography variant="body1">{feature}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Grid>

              {!isLoggedIn && (
               <Grid item xs={12} lg={5} sx={{ display: 'flex', justifyContent: { xs: 'center', lg: 'flex-end' } }}>
  <Box 
    sx={{ 
      border: "1px solid #e4e3e3",
      bgcolor: "#fafafa", 
      borderRadius: 4,
      width: "100%", 
      maxWidth: { xs: "100%", sm: "500px", md: "520px" }, 
      position: { xs: "static", lg: "sticky" }, 
      top: { lg: 100 }, 
      mt: { xs: 4, lg: 0 },
      overflow: "hidden",
      boxShadow: { xs: "none", md: "0 4px 20px rgba(0,0,0,0.05)" }
    }}
  >
    <Register isEmbedded />
  </Box>
</Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Snackbar open={openToast} autoHideDuration={3000} onClose={() => setOpenToast(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setOpenToast(false)} severity="warning" variant="filled" sx={{ width: "100%", borderRadius: 3 ,bgcolor:'#0a0a0aff' }}>
          🔐 Please login or register first to continue
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
}