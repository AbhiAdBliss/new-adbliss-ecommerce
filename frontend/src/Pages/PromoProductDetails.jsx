import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Radio,
  Divider,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useParams } from "react-router-dom";

import Apple1 from "../assets/AppleS-imgs/Apple1.png";
import Apple2 from "../assets/AppleS-imgs/Apple2.png";
import Apple3 from "../assets/AppleS-imgs/Apple3.png";
import Apple4 from "../assets/AppleS-imgs/Apple4.png";
import Apple5 from "../assets/AppleS-imgs/Apple5.png";
import Apple6 from "../assets/AppleS-imgs/Apple6.png";
import Apple7 from "../assets/AppleS-imgs/Apple7.png";
import Apple8 from "../assets/AppleS-imgs/Apple8.png";
import Apple9 from "../assets/AppleS-imgs/Apple9.png";

const productData = {
  1: {
    name: "Apple iPhone 17 (256GB Storage, Black)",
    images: [Apple1, Apple8, Apple2, Apple9],
    price: "₹89,900",
    oldPrice: "₹94,900",
    discount: "5% off",
  },
  2: {
    name: "Apple iPhone Air (256GB Storage, Sky Blue)",
    images: [Apple2, Apple1, Apple8, Apple9],
    price: "₹79,900",
    oldPrice: "₹84,900",
    discount: "6% off",
  },
  3: {
    name: "Apple Macbook Air M4 Chip",
    images: [Apple3, Apple1, Apple2],
    price: "₹1,14,900",
    oldPrice: "₹1,19,900",
    discount: "4% off",
  },
  4: {
    name: "Apple iPad 11th Gen 2025 Wi-Fi 128GB Blue",
    images: [Apple4, Apple2, Apple1],
    price: "₹39,900",
    oldPrice: "₹44,900",
    discount: "10% off",
  },
  5: {
    name: "Apple Watch SE 3 GPS 44mm Midnight Aluminium Case",
    images: [Apple5, Apple1],
    price: "₹29,900",
    oldPrice: "₹32,900",
    discount: "9% off",
  },
  6: {
    name: "Apple TV 4K 128GB Wi-Fi + Ethernet Model",
    images: [Apple6, Apple1],
    price: "₹17,900",
    oldPrice: "₹19,900",
    discount: "10% off",
  },
  7: {
    name: "Apple AirPods Pro 3",
    images: [Apple7, Apple1],
    price: "₹24,900",
    oldPrice: "₹26,900",
    discount: "7% off",
  },
  8: {
    name: "Apple iPhone 17 Pro (256GB Storage, Cosmic Orange)",
    images: [Apple8, Apple1, Apple2],
    price: "₹1,19,900",
    oldPrice: "₹1,24,900",
    discount: "4% off",
  },
  9: {
    name: "iPhone Air MagSafe Battery",
    images: [Apple9, Apple2],
    price: "₹9,900",
    oldPrice: "₹11,900",
    discount: "16% off",
  },
};

export default function PromoProductDetails() {
  const { id } = useParams();
  const product = productData[id];
  const [selectedImg, setSelectedImg] = useState(product.images[0]);

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, bgcolor: "#f1f3f6", minHeight: "100vh" }}>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={4}>
          {/* LEFT IMAGE SECTION */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              {/* Thumbnails */}
              <Grid item xs={2}>
                <Stack spacing={1}>
                  {product.images.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      onClick={() => setSelectedImg(img)}
                      sx={{
                        width: "100%",
                        border: selectedImg === img ? "2px solid #2874f0" : "1px solid #ddd",
                        borderRadius: 1,
                        cursor: "pointer",
                        p: 0.5,
                      }}
                    />
                  ))}
                </Stack>
              </Grid>

              {/* Main Image */}
              <Grid item xs={10}>
                <Box
                  component="img"
                  src={selectedImg}
                  sx={{ width: "100%", objectFit: "contain" }}
                />
              </Grid>
            </Grid>

            {/* Buttons */}
            <Stack direction="row" spacing={2} mt={3}>
              <Button variant="contained" fullWidth sx={{ bgcolor: "#ff9f00", py: 1.5 }}>
                ADD TO CART
              </Button>
              <Button variant="contained" fullWidth sx={{ bgcolor: "#fb641b", py: 1.5 }}>
                BUY NOW
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT DETAILS SECTION */}
          <Grid item xs={12} md={7}>
            <Typography variant="h5" fontWeight={600}>
              {product.name}
            </Typography>

            {/* Rating */}
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <Box sx={{ bgcolor: "#388e3c", color: "white", px: 1, borderRadius: 1 }}>
                4.6 ★
              </Box>
              <Typography variant="body2" color="text.secondary">
                4,304 Ratings & 229 Reviews
              </Typography>
            </Stack>

            {/* Price */}
            <Stack direction="row" spacing={2} alignItems="center" mt={2}>
              <Typography variant="h4" fontWeight={700}>{product.price}</Typography>
              <Typography sx={{ textDecoration: "line-through", color: "gray" }}>
                {product.oldPrice}
              </Typography>
              <Typography color="green" fontWeight={600}>{product.discount}</Typography>
            </Stack>

            <Typography variant="body2" mt={1}>
              + ₹156 Protect Promise Fee
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Offers */}
            <Typography variant="h6" fontWeight={600}>
              Available offers
            </Typography>

            {[
              "5% cashback on Axis Bank Flipkart Debit Card",
              "5% cashback on Flipkart Axis Credit Card",
              "5% cashback on Flipkart SBI Credit Card",
              "Special Price Get extra ₹5000 off",
            ].map((offer, i) => (
              <Stack direction="row" spacing={1} alignItems="center" mt={1} key={i}>
                <LocalOfferIcon sx={{ color: "green", fontSize: 20 }} />
                <Typography variant="body2">{offer}</Typography>
              </Stack>
            ))}

            <Divider sx={{ my: 3 }} />

            {/* Buy Options */}
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Radio checked />
                <Box>
                  <Typography fontWeight={600}>Buy without Exchange</Typography>
                  <Typography variant="body2">{product.price}</Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Radio />
                <Box>
                  <Typography fontWeight={600}>Buy with Exchange</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Up to ₹53,500 off
                  </Typography>
                  <Typography variant="body2" color="error">
                    Enter pincode to check if exchange is available
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
