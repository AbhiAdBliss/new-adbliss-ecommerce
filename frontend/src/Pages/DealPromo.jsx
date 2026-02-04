import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Register from "./Register";

import Deal1 from "../assets/Deals/Deal1.png";
import Deal2 from "../assets/Deals/Deal2.png";
import Deal3 from "../assets/Deals/Deal3.png";
import Deal4 from "../assets/Deals/Deal4.png";
import Deal5 from "../assets/Deals/Deal5.png";
import Deal6 from "../assets/Deals/Deal6.png";

const products = [
  { id: 1, name: "Samsung Galaxy S25 Ultra 5G", image: Deal1 },
  { id: 2, name: "Samsung Galaxy S25 5G", image: Deal2 },
  { id: 3, name: "Samsung Galaxy Z Fold7 5G", image: Deal3 },
  { id: 4, name: "Samsung Galaxy S25 FE", image: Deal4 },
  { id: 5, name: "Samsung Galaxy Z Flip 7 FE", image: Deal5 },
  { id: 6, name: "Samsung Galaxy S24 Ultra", image: Deal6 },
];

export default function DealPromo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  return (
    <Box sx={{ bgcolor: "#b0a9a4", minHeight: "100vh", py: 6 }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mb: 4, bgcolor: "#c0974b" }}>
          Back
        </Button>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} textAlign="center">
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {product?.name}
            </Typography>
            <Box
              component="img"
              src={product?.image}
              alt={product?.name}
              sx={{ width: "100%", maxWidth: "400px", objectFit: "contain" }}
            />
            <Typography mt={2} color="text.secondary">
              Latest Samsung product with stunning design and performance.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Register />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
