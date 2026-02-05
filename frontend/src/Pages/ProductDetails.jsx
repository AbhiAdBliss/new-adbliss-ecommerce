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
import { useParams } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
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
  { id: 1, name: "Apple iPhone 17 (256GB Storage, Black)", image: Apple1, price: "94,900" },
  { id: 2, name: "Apple iPhone Air (256GB Storage, Sky Blue)", image: Apple2, price: "69,900" },
  { id: 3, name: "Apple Macbook Air M4 Chip", image: Apple3, price: "1,24,900" },
  { id: 4, name: "Apple iPad 11th Gen 2025 Wi-Fi 128GB Blue", image: Apple4, price: "49,900" },
  { id: 5, name: "Apple Watch SE 3 GPS 44mm Midnight Aluminium Case", image: Apple5, price: "29,900" },
  { id: 6, name: "Apple TV 4K 128GB Wi-Fi + Ethernet Model", image: Apple6, price: "19,900" },
  { id: 7, name: "Apple AirPods Pro 3", image: Apple7, price: "24,900" },
  { id: 8, name: "Apple iPhone 17 Pro (256GB Storage, Cosmic Orange)", image: Apple8, price: "89,900" },
  { id: 9, name: "iPhone Air MagSafe Battery", image: Apple9, price: "9,900" },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [showAllOffers, setShowAllOffers] = useState(false);
  const { addToCart } = useCart(); // 🛒 USE CART

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
        <Grid container spacing={8} sx={{ maxWidth: "1400px", margin: "0 auto", flexWrap: "nowrap" }}>

          {/* LEFT SIDE — IMAGE + BUTTONS */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center", border: "1px solid #e4e3e3ff" }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{ width: "100%", maxWidth: 500 }}
              />
            </Paper>

            {/* BUTTONS BELOW IMAGE */}
            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => addToCart(product)} // 🛒 ADD TO CART ACTION
                sx={{ bgcolor: "#ab803bff", fontWeight: 600, py: 1.2 }}
              >
                ADD TO CART
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#1b6b9dff", fontWeight: 600, py: 1.2 }}
              >
                BUY NOW
              </Button>
            </Box>
          </Grid>

          {/* RIGHT SIDE — DETAILS */}
          <Grid item xs={12} md={8} sx={{ pl: { md: 4 } }}>
            <Typography variant="h5" fontWeight="bold">{product.name}</Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography color="text.secondary">(4,309 Ratings)</Typography>
            </Box>

            <Typography variant="h3" fontWeight="bold" color="#c0974b">
              ₹{product.price}
            </Typography>

            <Typography color="green" sx={{ mt: 1 }}>
              Extra ₹5000 off • Limited Time Offer
            </Typography>

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
                sx={{ color: "#2874f0", width: "fit-content", fontWeight: 600, cursor: "pointer", mt: 1 }}
                onClick={() => setShowAllOffers(!showAllOffers)}
              >
                {showAllOffers ? "Show less ▲" : "See more offers ▼"}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* DELIVERY */}
            <Typography variant="h6" fontWeight={600}>Delivery</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
              <LocationOnIcon color="action" />
              <TextField variant="standard" placeholder="Enter Delivery Pincode" sx={{ width: 220 }} />
              <Button sx={{ textTransform: "none", fontWeight: 600 }}>Check</Button>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* HIGHLIGHTS */}
            <Typography variant="h6" fontWeight={600}>Highlights</Typography>
            <Box sx={{ pl: 3, color: "text.secondary" }}>
              <Typography>128 GB ROM</Typography>
              <Typography>17.02 cm (6.7 inch) Super Retina XDR Display</Typography>
              <Typography>48MP + 12MP | 12MP Front Camera</Typography>
              <Typography>A18 Chip, 6 Core Processor</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* EASY PAYMENT */}
            <Typography variant="h6" fontWeight={600}>Easy Payment Options</Typography>
            <Box sx={{ pl: 3, color: "text.secondary" }}>
              <Typography>No cost EMI starting from ₹6,242/month</Typography>
              <Typography>Cash on Delivery</Typography>
              <Typography>Net banking & Credit / Debit / ATM card</Typography>
            </Box>
            <Button sx={{ textTransform: "none", px: 0 }}>View Details</Button>

            <Divider sx={{ my: 1 }} />

            {/* SELLER */}
            <Typography variant="h6" fontWeight={600}>Seller</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography color="#2874f0" fontWeight={600}>Truenet Commerce</Typography>
              <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#2874f0", color: "#fff", px: 1, borderRadius: 1, fontSize: 12 }}>
                4.5 <StarIcon sx={{ fontSize: 14, ml: 0.5 }} />
              </Box>
            </Box>
            <Box sx={{ pl: 3, color: "text.secondary" }}>
              <Typography>7 Days Brand Support <HelpOutlineIcon sx={{ fontSize: 14 }} /></Typography>
              <Typography>GST invoice available <HelpOutlineIcon sx={{ fontSize: 14 }} /></Typography>
            </Box>
            <Button sx={{ textTransform: "none", px: 0 }}>See other sellers</Button>

            <Divider sx={{ my: 1 }} />

            {/* DESCRIPTION */}
            <Typography variant="h6" fontWeight={600}>Description</Typography>
            <Typography color="text.secondary">
              iPhone 16 Plus. Built for Apple Intelligence. Featuring Camera Control.
              48 MP Fusion camera. Five vibrant colours. And A18 chip.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
}
