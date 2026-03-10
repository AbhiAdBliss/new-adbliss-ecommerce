import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';


import Coupn from "../assets/AppleS-imgs/coupn-img.png";

import { loyaltyProducts } from "../data/loyaltyProducts";


export default function LoyaltyCoupon() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return (stored && stored !== "undefined") ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("userUpdated", handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener("userUpdated", handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  return (
    <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh", pb: 10 }}>
      {/* HEADER SECTION */}
      <Box sx={{ 
        bgcolor: "#1e293b", 
        color: "white", 
        py: { xs: 6, md: 8 }, 
        textAlign: "center",
        mb: 6,
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}>
        <Container>
          <Chip 
            icon={<ConfirmationNumberIcon sx={{ color: "#f7e895 !important" }} />} 
            label="Member Exclusive" 
            sx={{ bgcolor: "rgba(247, 232, 149, 0.1)", color: "#f7e895", mb: 2, fontWeight: "bold" }} 
          />
          <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: "2rem", md: "3.5rem" } }}>
            Loyalty Rewards
          </Typography>
          <Typography sx={{ mt: 1, color: "#94a3b8" }}>
            Your Balance: <span style={{ color: "#f7e895", fontWeight: "bold" }}>{user?.coins ?? 0} Coins</span>
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Grid container spacing={4} justifyContent="center">
          {loyaltyProducts.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} lg={4} sx={{ display: "flex" }}>
              <Card
                onClick={() => navigate(`/loyalty-checkout/${item.slug}`)}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  width: 420,
                  cursor: "pointer",
                  position: "relative",
                  bgcolor: "#fcf8e3",
                  border: "1px solid #d4c8a4",
                  overflow: "hidden", 
                  // FLEXBOX MAGIC STARTS HERE
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* DIAGONAL LUCKY COUPON RIBBON */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 35,
                    left: -35,
                    transform: "rotate(-45deg)",
                    bgcolor: "#f7e895",
                    color: "#000",
                    width: "160px",
                    py: 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    zIndex: 2,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box component="img" src={Coupn} sx={{ width: 12, height: 13 }} />
                  <Typography sx={{ fontSize: "10px", fontWeight: "900", textTransform: 'uppercase' }}>
                    Loyalty Coupon
                  </Typography>
                </Box>

                {/* PRODUCT IMAGE CONTAINER */}
                <Box sx={{ height: 280, p: 2, pt: 2, display: "flex", justifyContent: "center", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    sx={{ 
                      height: "100%", 
                      objectFit: "contain",
                      transition: "transform 0.5s ease-in-out", 
                      ".MuiCard-root:hover &": {
                        transform: "scale(1.07)",
                      },
                    }}
                  />
                </Box>

                <CardContent sx={{ px: 4, pb: 5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1" sx={{ color: "#000", mb: 2, fontSize: '1.4rem', fontWeight: 700 }}>
                    {item.name}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {item.features.map((f, i) => (
                      <Typography key={i} sx={{ color: "#444", fontSize: '1rem', mb: 0.5 }}>
                        • {f}
                      </Typography>
                    ))}
                  </Box>

                  {/* SPACER: This pushes the price box to the bottom of the card content area */}
                  <Box sx={{ flexGrow: 1 }} />

                  {/* LARGE PRICE DISPLAY - Always at the bottom now */}
                  <Box>
  <Box sx={{ display: "flex", alignItems: "baseline" }}>
    <Typography
      fontSize={24}
      fontWeight={800}
      color="#000"
      sx={{ mr: 0.5 }}
    >
      ₹
    </Typography>

    <Typography
      fontSize={32}
      fontWeight={900}
      color="#000"
      sx={{ lineHeight: 1 }}
    >
      {item.price}
    </Typography>
  </Box>

  {/* COIN REWARD MESSAGE FOR ALL CARDS */}
  <Typography
    sx={{
      mt: 0.5,
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#896d9eff"
    }}
  >
Earn {item.price} Reward Coins on Purchase
  </Typography>
</Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}