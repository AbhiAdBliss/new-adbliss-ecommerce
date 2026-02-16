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

import bannerVideo from "../assets/Home-images/home-video1.mp4";
import Footer from "../Components/Footer";
import Deals from "./Deals";

const products = [
  { id: 1, name: "Apple iPhone 17 (256GB Storage, Black)", image: Apple1 },
  { id: 2, name: "Apple iPhone Air (256GB Storage, Sky Blue)", image: Apple2 },
  { id: 3, name: "Apple Macbook Air M4 Chip", image: Apple3 },
  { id: 4, name: "Apple iPad 11th Gen 2025 Wi-Fi 128GB Blue", image: Apple4 },
  { id: 5, name: "Apple Watch SE 3 GPS 44mm Midnight Aluminium Case", image: Apple5 },
  { id: 6, name: "Apple TV 4K 128GB Wi-Fi + Ethernet Model", image: Apple6 },
  { id: 7, name: "Apple AirPods Pro 3", image: Apple7 },
  { id: 8, name: "Apple iPhone 17 Pro (256GB Storage, Cosmic Orange)", image: Apple8 },
  { id: 9, name: "iPhone Air MagSafe Battery", image: Apple9 },
];

export default function AppleSection() {
const navigate = useNavigate();


  return (
    <Box>

      {/* 🎬 HERO VIDEO SECTION */}
     <Box
  sx={{
    position: "relative",
    width: "100%",
    height: { xs: "55vh", md: "750px" }, 
    minHeight: { xs: 420, md: 750 },
    overflow: "hidden"
  }}
>
  {/* VIDEO */}
  <Box
    component="video"
    src={bannerVideo}
    autoPlay
    muted
    loop
    playsInline
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      position: "absolute",
      top: 0,
      left: 0
    }}
  />

  {/* DARK OVERLAY */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      bgcolor: "rgba(0,0,0,0.45)"
    }}
  />

  {/* TEXT CONTENT */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textAlign: "center",
      px: { xs: 2, md: 4 }
    }}
  >
    <Typography
      sx={{
        fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
        fontWeight: "bold"
      }}
    >
      Experience Apple Innovation
    </Typography>

    <Typography
      sx={{
        mt: 1,
        opacity: 0.9,
        fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }
      }}
    >
      Premium devices. Unmatched performance.
    </Typography>
  </Box>
</Box>


      {/* 🛍 PRODUCT SECTION */}
      <Box sx={{ py: { xs: 4, md: 8 }, mt:7 }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
            sx={{ textAlign: { xs: "center", sm: "center" } }}
          >
            Best Of Apple
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            mb={4}
            sx={{ textAlign: { xs: "center", sm: "center" } }}
          >
            Explore premium Apple devices loved by everyone.
          </Typography>

          <Grid container spacing={3} justifyContent="center" marginTop={6}>
            {products.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
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
                  <Box sx={{ height: 220, bgcolor: "#fff", p: 1 }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ height: "100%", width: "100%", objectFit: "contain" }}
                    />
                  </Box>

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

                  <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
                 <Button
  variant="contained"
  onClick={() => navigate(`/product/${item.id}`)}
  sx={{
    width: "140px",
    height: "40px",
    bgcolor: "#c0974bff",
    color: "#fff",
    borderRadius: "10px",
    textTransform: "none",
    fontWeight: 600,
    "&:hover": { bgcolor: "#ce8908ff" },
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

{/* deal Page */}

{/* <Deals/> */}

      {/* Footer part */}

      <Footer/>

    </Box>
  );
}
