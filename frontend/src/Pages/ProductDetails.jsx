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

// const createSlug = (name) =>
//   name
//     .toLowerCase()
//     .replace(/[()]/g, "")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");

const products = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 17 (256GB Storage, Black)",
    slug: "apple-iphone-17-256gb-storage-black",
    image: Apple1,
    price: 1,
    features: ["256 GB ROM","6.3 inch Super Retina XDR","48MP Camera","A19 Chip"]
  },
  {
    id: 2,
    brand: "Apple",
    name: "iPhone Air (256GB Storage, Sky Blue)",
    slug: "apple-iphone-air-256gb-storage-sky-blue",
    image: Apple2,
    price: 139990,
    features: ["256 GB ROM","6.7 inch OLED Display","64MP Camera","A18 Chip"]
  },
  {
    id: 3,
    brand: "Apple",
    name: "Macbook Air M4 Chip",
    slug: "apple-macbook-air-m4-chip",
    image: Apple3,
    price: 149,
    features: ["8GB RAM | 256GB SSD","13.6 inch Retina","M4 Chip","18hr Battery"]
  },
  {
    id: 4,
    brand: "Apple",
    name: "iPad 11th Gen 2025",
    slug: "apple-ipad-11th-gen-2025",
    image: Apple4,
    price: 49900,
    features: ["128 GB","11 inch Display","12MP Camera","A16 Chip"]
  },
  {
    id: 5,
    brand: "Apple",
    name: "Watch SE 3 GPS 44mm",
    slug: "apple-watch-se-3-gps-44mm",
    image: Apple5,
    price: 99,
    features: ["44mm Display","Heart Rate","GPS","Water Resistant"]
  },
  {
    id: 6,
    brand: "Apple",
    name: "Apple TV 4K",
    slug: "apple-tv-4k",
    image: Apple6,
    price: 19900,
    features: ["128 GB","4K HDR","Dolby Atmos","A15 Chip"]
  },
  {
    id: 7,
    brand: "Apple",
    name: "AirPods Pro 3",
    slug: "apple-airpods-pro-3",
    image: Apple7,
    price: 199,
    features: ["Noise Cancellation","Spatial Audio","MagSafe","30hr Battery"]
  },
  {
    id: 8,
    brand: "Apple",
    name: "iPhone 17 Pro",
    slug: "apple-iphone-17-pro",
    image: Apple8,
    price: 89900,
    features: ["256 GB","OLED Display","50MP Camera","A19 Pro Chip"]
  },
  {
    id: 9,
    brand: "Apple",
    name: "MagSafe Battery",
    slug: "apple-magsafe-battery",
    image: Apple9,
    price: 149,
    features: ["5000mAh","MagSafe","Fast Charging","Compact Design"]
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

  // MATCHING LOGIC: If Product ID is 1, 3, 5... (Odd), show Coupon. 
  // This matches Index 0, 2, 4... in your AppleSection.
  const hasCoupon = product.id % 2 !== 0;

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
      setOpenToast(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        if (!product) return;
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
  loading="lazy"
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
                
           <Typography variant="h4" sx={{ mt: 2, fontWeight: 900 }}>
  ₹{product.price.toLocaleString("en-IN")}
</Typography>
                
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

     <Snackbar
  open={openToast}
  autoHideDuration={3000}
  onClose={() => setOpenToast(false)}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
 <Alert
  onClose={() => setOpenToast(false)}
  severity="success"
  variant="filled"
  sx={{
    width: "100%",
    borderRadius: 3,
    bgcolor: "#1E3A8A",
    color: "#fff",
    fontWeight: 500,
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
  }}
>
  {toastMsg}
</Alert>
</Snackbar>

      {/* <Footer /> */}
    </Box>
  );
}