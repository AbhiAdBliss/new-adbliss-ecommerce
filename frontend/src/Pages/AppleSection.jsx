import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";


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
import Footer from "../Components/Footer";

const createSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const products = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 17 (256GB Storage, Black)",
    slug: "apple-iphone-17-256gb-storage-black",
    image: Apple1,
    price: 199,
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

export default function AppleSection() {
  const navigate = useNavigate();



  return (
    <Box sx={{ bgcolor: "#F5F7FA" }}>
      {/* HERO SECTION */}
      <Box sx={{
        position: "relative",
        width: "100%",
        height: { xs: "55vh", md: "750px" },
        overflow: "hidden"
      }}>
        <Box component="video" src={bannerVideo} autoPlay muted loop playsInline
          sx={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }} 
        />
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.45)" }} />
        <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", textAlign: "center" }}>
          <Typography sx={{ fontSize: { xs: "1.8rem", md: "3rem" }, fontWeight: "bold" }}>Experience Apple Innovation</Typography>
          <Typography sx={{ mt: 1 }}>Premium devices. Unmatched performance.</Typography>
        </Box>
      </Box>

      {/* PRODUCTS SECTION */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" fontWeight="bold" textAlign="center">Best Of Apple</Typography>

          <Grid container spacing={3} mt={4} justifyContent="center">
            {products.map((item, index) => {
              // const oldPrice = Math.round(item.price * 1.15);
              // const discount = Math.round(((oldPrice - item.price) / oldPrice) * 100);
              
              // ALTERNATE LOGIC: Show badge on even-indexed items (0, 2, 4...)
              const hasCoupon = index % 2 === 0;

              return (
                <Grid item key={item.id} xs={12} sm={6} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
                 <Card
onClick={() =>
  navigate(
    hasCoupon
      ? `/product/${item.id}/loyality-coupon`
      : `/product/${createSlug(item.name)}`
  )
}
  sx={{
    borderRadius: 3,
    width: 420,
    height: 530,
    cursor: "pointer",
    overflow: "hidden",
    transition: "0.3s",
    position: "relative",

    bgcolor: hasCoupon  ? "#fdf7e3ff" : "#fff",
    border: hasCoupon
     ? "1px solid #f6c453" : "1px solid #e4e3e3ff",

    "&:hover .product-img": { transform: "scale(1.1)" }
  }}
>
                    {/* LUCKY COUPON BADGE - Alternating */}
                    {hasCoupon && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 30,
                          left: -35,
                          transform: "rotate(-45deg)",
                          bgcolor: "#f7e895ff",
                          color: "#000",
                         pl:0.5,
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

                    {/* IMAGE BOX */}
                    <Box sx={{ position: "relative", height: 220, p: 2, overflow: "hidden" }}>
                      <Box sx={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        bgcolor: "#388e3c",
                        color: "#fff",
                        px: 1,
                        py: "2px",
                        borderRadius: 1,
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        zIndex: 1
                      }}>
                        4.5 <StarIcon sx={{ fontSize: 14 }} />
                      </Box>

                      <CardMedia
                        component="img"
                        image={item.image}
                        className="product-img"
                        sx={{ height: "100%", objectFit: "contain", transition: "0.4s" }}
                      />
                    </Box>

                    {/* CONTENT */}
                    <CardContent>
                      <Typography fontWeight={600} fontSize={20}>{item.brand}</Typography>
                      <Typography sx={{ fontSize: 19, color: "#666", minHeight: 40 }}>{item.name}</Typography>

                      <Box sx={{ mt: 1 }}>
                        {item.features.slice(0, 3).map((f, i) => (
                          <Typography key={i} sx={{ fontSize: 16, color: "#555" }}>• {f}</Typography>
                        ))}
                      </Box>

                      <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
                        <Typography fontWeight="bold" sx={{ fontSize: 25 }}>₹{item.price.toLocaleString("en-IN")}</Typography>
                        {/* <Typography sx={{ textDecoration: "line-through", color: "#888", fontSize: 18 }}>
                          ₹{oldPrice.toLocaleString("en-IN")}
                        </Typography> */}
                      </Box>

                      {/* <Typography sx={{ color: "green", fontWeight: 600, fontSize: 16 }}>{discount}% off</Typography> */}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}