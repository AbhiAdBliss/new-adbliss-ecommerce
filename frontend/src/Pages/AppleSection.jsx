import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  { id: 1, name: "Apple iPhone 17 (256GB Storage, Black)", image: Apple1 },
  { id: 2, name: "Apple iPhone Air (256GB Storage, Sky Blue)", image: Apple2 },
  { id: 3, name: "Apple Macbook Air M4 Chip", image: Apple3 },
  { id: 4, name: "Apple iPad 11th Gen 2025 Wi-Fi 128GB Blue", image: Apple4 },
  { id: 5, name: "Apple Watch SE 3 GPS 44mm Midnight Aluminium Case", image: Apple5 },
  { id: 6, name: "Apple TV 4K 128GB Wi-Fi + Ethernet Model", image: Apple6 },
  { id: 7, name: "Apple AirPods Pro 3", image: Apple7 },
  { id: 8, name: " Apple iPhone 17 Pro (256GB Storage, Cosmic Orange)", image: Apple8 },
  { id: 9, name: "iPhone Air MagSafe Battery", image: Apple9 },

];

export default function AppleSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "white", py: { xs: 4, md: 8 }, mt: 5 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Best Of Apple
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          mb={4}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          Explore premium Apple devices loved by everyone.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {products.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              lg={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  width: 360,
                  maxWidth: "100%",
                  height: 430,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                   boxShadow: "0 6px 16px rgba(45, 44, 44, 0.2)",
                }}
              >
                {/* Image */}
                <Box sx={{ height: 220, bgcolor: "#fff", p: 1 }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Title */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "56px",
                    }}
                  >
                    {item.name}
                  </Typography>
                </CardContent>

                {/* Button */}
                <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/promo/${item.id}`)}
                    sx={{
                      width: "140px",
                      height: "40px",
                      bgcolor: "#c0974bff",
                      color: "#fff",
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "#ce8908ff",
                      },
                    }}
                  >
                    View Deal
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
