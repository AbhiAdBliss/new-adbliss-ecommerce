import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Register from "./Register";

import Apple1 from "../assets/AppleS-imgs/Apple1.png";
import Apple2 from "../assets/AppleS-imgs/Apple2.png";
import Apple3 from "../assets/AppleS-imgs/Apple3.png";
import Apple4 from "../assets/AppleS-imgs/Apple4.png";
import Apple5 from "../assets/AppleS-imgs/Apple5.png";
import Apple6 from "../assets/AppleS-imgs/Apple6.png";
import Apple7 from "../assets/AppleS-imgs/Apple7.png";
import Apple8 from "../assets/AppleS-imgs/Apple8.png";
import Apple9 from "../assets/AppleS-imgs/Apple9.png";
import Footer from "../Components/Footer";

const products = [
  { id: 1, name: "Apple iPhone 17 (256GB Storage, Black)", image: Apple1 },
  { id: 2, name: "Apple iPhone Air (256GB Storage, Sky Blue)", image: Apple2 },
  { id: 3, name: "Apple Macbook Air M4 Chip", image: Apple3 },
  { id: 4, name: "Apple iPad 11th Gen 2025 Wi-Fi 128GB Blue", image: Apple4 },
  { id: 5, name: "Apple Watch SE 3", image: Apple5 },
  { id: 6, name: "Apple TV 4K", image: Apple6 },
  { id: 7, name: "Apple AirPods Pro 3", image: Apple7 },
  { id: 8, name: "Apple iPhone 17 Pro (256GB Storage, Cosmic Orange)", image: Apple8 },
  { id: 9, name: "iPhone Air MagSafe Battery", image: Apple9 },
];

export default function PromoRegister() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#b0a9a4",
          minHeight: "100vh",
          py: { xs: 4, md: 6 },   
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3 } }}>

          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              mb: 4,
                 mt: { xs: 8, sm: 2 },
              bgcolor: "#c0974b",
              width: { xs: "20%", sm: "auto" } 
            }}
          >
            Back
          </Button>

          {/* RESPONSIVE LAYOUT */}
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {/* LEFT — PRODUCT IMAGE */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
                sx={{ px: { xs: 1, sm: 2 } }}
              >
                {product?.name}
              </Typography>

              <Box
                component="img"
                src={product?.image}
                alt={product?.name}
                sx={{
                  width: "100%",
                  maxWidth: { xs: "260px", sm: "320px", md: "380px" },
                  objectFit: "contain",
                }}
              />

              <Typography
                mt={2}
                color="text.secondary"
                sx={{ px: { xs: 2, md: 4 } }}
              >
                Latest Apple product with stunning design and performance.
              </Typography>
            </Grid>

            {/* RIGHT — REGISTER FORM */}
            <Grid item xs={12} md={6}>
              <Register />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
