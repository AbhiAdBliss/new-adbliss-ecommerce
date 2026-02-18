import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Rating,
  Paper,
  TextField,
  Divider
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "../context/useCart";
import Footer from "../Components/Footer";

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
      "1 Year Apple Warranty"
    ]
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
      "1 Year Warranty"
    ]
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
      "1 Year Warranty"
    ]
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
      "1 Year Warranty"
    ]
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
      "1 Year Warranty"
    ]
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
      "1 Year Warranty"
    ]
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
      "1 Year Warranty"
    ]
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
      "1 Year Warranty"
    ]
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
      "1 Year Warranty"
    ]
  }
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate()
  const product = products.find(p => p.id === Number(id));
  const [showAllOffers, setShowAllOffers] = useState(false);
  const { addToCart } = useCart();
  const priceNumber = Number(product.price.replace(/,/g, ""));
const oldPrice = Math.round(priceNumber * 1.15);
const discount = Math.round(((oldPrice - priceNumber) / oldPrice) * 100);


  const offers = [
    "5% cashback on Axis Bank Flipkart Debit Card up to ₹750 per month",
    "5% cashback on Flipkart Axis Bank Credit Card up to ₹4,000 per statement quarter",
    "5% cashback on Flipkart SBI Credit Card up to ₹4,000 per calendar quarter",
    "Get extra ₹5000 off",
    "No cost EMI ₹6,242/month. Standard EMI also available",
    "Up to ₹30 Cashback on BHIM Payments App. Min Order Value ₹199",
    "Flat ₹400 off on Flipkart Bajaj Finserv Insta EMI Card. Min Booking Amount ₹40,000",
    "Flat ₹15 Cashback on MobiKwik UPI Transaction. Min Order Value ₹499",
    "Flat ₹20 Cashback on Paytm UPI payments. Min Order Value ₹49"
  ];

  if (!product) return <Typography sx={{ mt: 10 }}>Product not found</Typography>;

  return (
    <Box>
      <Box sx={{ mt: 10, px: { xs: 2, md: 6 }, py: 4, bgcolor: "white" }}>
        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ maxWidth: "1400px", margin: "0 auto" }}>

          {/* LEFT SIDE */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center", border: "1px solid #e4e3e3ff" }}>
              <Box component="img" src={product.image} alt={product.name} sx={{ width: "100%", maxWidth: 500 }} />
            </Paper>

            <Box
  sx={{
    mt: 2,
    display: "flex",
    gap: 2,
    flexDirection: { xs: "column", sm: "row" },
  }}
>
  {/* ADD TO CART */}
  <Button
    fullWidth
    variant="contained"
    onClick={() => addToCart(product)}
    sx={{
      bgcolor: "#2F80ED",
      color: "#fff",
      fontWeight: 600,
      py: 1.2,
      borderRadius: "10px",
      boxShadow: "0 4px 14px rgba(47,128,237,0.4)",
      transition: "all 0.3s ease",

      "&:hover": {
        bgcolor: "#1C6DD0",
        boxShadow: "0 6px 18px rgba(28,109,208,0.5)",
        transform: "translateY(-2px)",
      },

      "&:active": {
        transform: "scale(0.97)",
      },
    }}
  >
    ADD TO CART
  </Button>

  {/* BUY NOW */}
  <Button
    fullWidth
    variant="contained"
    onClick={() => {
      addToCart(product);
      navigate("/checkout");
    }}
    sx={{
      bgcolor: "#9B6DFF",
      color: "#fff",
      fontWeight: 600,
      py: 1.2,
      borderRadius: "10px",
      boxShadow: "0 4px 14px rgba(155,109,255,0.4)",
      transition: "all 0.3s ease",

      "&:hover": {
        bgcolor: "#7C4DFF",
        boxShadow: "0 6px 18px rgba(124,77,255,0.5)",
        transform: "translateY(-2px)",
      },

      "&:active": {
        transform: "scale(0.97)",
      },
    }}
  >
    BUY NOW
  </Button>
</Box>


          </Grid>

          {/* RIGHT SIDE */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="bold">{product.name}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography color="text.secondary">(4,309 Ratings)</Typography>
            </Box>

            {/* 🔥 PRICE UI */}
<Box sx={{ mt: 1 }}>

  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

    {/* NEW PRICE */}
    <Typography
      sx={{
        fontSize: { xs: 28, md: 36 },
        fontWeight: 700,
        color: "#c0974b"
      }}
    >
      ₹{priceNumber.toLocaleString("en-IN")}
    </Typography>

    {/* OLD PRICE */}
    <Typography
      sx={{
        textDecoration: "line-through",
        color: "#878787",
        fontSize: "18px"
      }}
    >
      ₹{oldPrice.toLocaleString("en-IN")}
    </Typography>

    {/* DISCOUNT */}
    <Typography
      sx={{
        color: "#388e3c",
        fontWeight: 600,
        fontSize: "16px"
      }}
    >
      {discount}% off
    </Typography>

  </Box>

  {/* EXTRA OFFER */}
  <Typography
    sx={{
      color: "#388e3c",
      mt: 1,
      fontSize: "15px",
      fontWeight: 500
    }}
  >
    Extra ₹5000 off • Limited Time Offer
  </Typography>

</Box>


            {/* OFFERS */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold">Available Offers</Typography>
              {(showAllOffers ? offers : offers.slice(0, 4)).map((offer, i) => (
                <Box key={i} sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <LocalOfferIcon sx={{ color: "green", fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">{offer}</Typography>
                </Box>
              ))}
              <Typography
                sx={{ color: "#2874f0", fontWeight: 600, cursor: "pointer", mt: 1 }}
                onClick={() => setShowAllOffers(!showAllOffers)}
              >
                {showAllOffers ? "Show less ▲" : "See more offers ▼"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* DELIVERY */}
            <Typography variant="h6" fontWeight={600}>Delivery</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2, flexWrap: "wrap" }}>
              <LocationOnIcon color="action" />
              <TextField variant="standard" placeholder="Enter Delivery Pincode" sx={{ width: { xs: "100%", sm: 220 } }} />
              <Button sx={{ textTransform: "none", fontWeight: 600 }}>Check</Button>
            </Box>

            <Divider sx={{ my: 1 }} />

<Box sx={{ pl: 2, color: "text.secondary" }}>
  {product.features?.map((feature, index) => (
    <Box key={index} sx={{ display: "flex", gap: 1 }}>
      <Typography>•</Typography>
      <Typography>{feature}</Typography>
    </Box>
  ))}
</Box>



            <Divider sx={{ my: 1 }} />

            <Typography variant="h6" fontWeight={600}>Seller</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography color="#2874f0" fontWeight={600}>Truenet Commerce</Typography>
              <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#2874f0", color: "#fff", px: 1, borderRadius: 1, fontSize: 12 }}>
                4.5 <StarIcon sx={{ fontSize: 14, ml: 0.5 }} />
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography variant="h6" fontWeight={600}>Description</Typography>
            <Typography color="text.secondary">
              iPhone built for Apple Intelligence. Featuring Camera Control, 48 MP camera and A18 chip.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}
