import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import CategoriesSection from "./CategoriesSection";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";


import adimg1 from "../assets/ad-images/ad-img1.png";
import adimg2 from "../assets/ad-images/ad-img2.png";
import adimg3 from "../assets/ad-images/ad-img3.png";
import adimg4 from "../assets/ad-images/ad-img4.png";

const ads = [
  { img: adimg1 },
  { img: adimg2 },
  { img: adimg3 },
  { img: adimg4 }
];

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/register");

  return (
    <>
      <CategoriesSection />

      {/* 🔥 Exclusive Deals Section */}
      <Box sx={{ mt: { xs: 6, md: 10 }, px: { xs: 2, sm: 3, md: 6 }, pb: { xs: 8, md: 12 } }}>
  <Typography
    variant="h3"
    fontWeight="bold"
    mb={2}
    textAlign="center"
    sx={{
      letterSpacing: 1,
      fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" }
    }}
  >
    Exclusive Tech Deals
  </Typography>

  <Typography
    variant="body1"
    textAlign="center"
    mb={{ xs: 4, sm: 5, md: 6 }}
    sx={{
      color: "#666",
      maxWidth: "700px",
      mx: "auto",
      fontSize: { xs: "0.95rem", sm: "1rem" }
    }}
  >
    Discover unbeatable offers on the latest devices and premium accessories.
  </Typography>

  <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} justifyContent="center">
    {ads.map((ad, index) => (
      <Grid
        item
        xs={12}
        sm={10}
        md={6}
        key={index}
        sx={{
          display: "flex",
          justifyContent: "center",
          animation: `fadeUp 0.8s ease forwards`,
          animationDelay: `${index * 0.2}s`,
          opacity: 0
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: { xs: 220, sm: 260, md: 340 },
            borderRadius: 5,
            overflow: "hidden",
            bgcolor: "#000",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
            }
          }}
        >
          <CardActionArea sx={{ height: "100%", width: "100%" }} onClick={handleClick}>
            <CardMedia
              component="img"
              image={ad.img}
              alt="Offer"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                "&:hover": { transform: "scale(1.08)" }
              }}
            />
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>


      {/*==== ⭐ Why Shop With Us Section */}
 <Box
  sx={{
    px: { xs: 2, sm: 3, md: 8 },
    py: { xs: 6, sm: 8, md: 12 },
    background: "linear-gradient(135deg, rgba(122,89,52,0.08), rgba(0,0,0,0.04))",
    backdropFilter: "blur(6px)",
    borderRadius: 5,
  }}
>
  <Typography
    variant="h4"
    fontWeight="bold"
    textAlign="center"
    mb={2}
    sx={{
      color: "#3e2f1c",
      letterSpacing: 1,
      fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" }
    }}
  >
    Why Customers Love Shopping With Us
  </Typography>

  <Typography
    textAlign="center"
    mb={{ xs: 5, sm: 6, md: 8 }}
    sx={{
      color: "#6d5c48",
      maxWidth: 600,
      mx: "auto",
      fontSize: { xs: "0.9rem", sm: "1rem" }
    }}
  >
    Premium service, trusted quality, and a seamless shopping experience crafted just for you.
  </Typography>

  <Grid
    container
    spacing={{ xs: 3, sm: 4, md: 4 }}
    justifyContent="center"
    alignItems="stretch"
  >
    {[
      { icon: "🚚", title: "Fast & Free Delivery", text: "Lightning-fast shipping with zero hidden charges." },
      { icon: "🔒", title: "Secure Payments", text: "Encrypted transactions with trusted payment systems." },
      { icon: "💎", title: "Premium Quality", text: "Only genuine, high-quality products you can rely on." }
    ].map((item, i) => (
      <Grid
        item
        key={i}
        xs={12}     
        sm={6}      
        md={4}     
        sx={{ display: "flex" }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: { xs: 3, sm: 3.5, md: 4 },
            borderRadius: 4,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            transition: "all 0.4s ease",
            animation: `fadeUp 0.8s ease forwards`,
            animationDelay: `${i * 0.2}s`,
            opacity: 0,
            width: "100%",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.15)"
            }
          }}
        >
          <Box sx={{ fontSize: { xs: 36, sm: 42, md: 50 }, mb: 2 }}>
            {item.icon}
          </Box>

          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#3e2f1c", fontSize: { xs: "1rem", sm: "1.1rem" } }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{ color: "#6d5c48", fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
          >
            {item.text}
          </Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>



{/* section 3 */}

{/* ⚙️ How We Work Section */}
<Box
  sx={{
    pt:5,
    px: { xs: 2, md: 8 },
    py: 12,
    borderRadius: 5,
    textAlign: "center"
  }}
>
  <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "#3e2f1c" }}>
    How We Work
  </Typography>

  <Typography
    mb={8}
    sx={{ color: "#6d5c48", maxWidth: 650, mx: "auto" }}
  >
    From browsing to delivery, we make your shopping experience smooth, secure, and satisfying.
  </Typography>

  <Grid container spacing={6} justifyContent="center">
    {[
      {
        icon: <TravelExploreIcon sx={{ fontSize: 50, color: "#6C63FF" }} />,
        title: "Browse Products",
        text: "Explore our wide range of premium tech products and find the perfect match."
      },
      {
        icon: <ShoppingCartCheckoutIcon sx={{ fontSize: 50, color: "#FF8A65" }} />,
        title: "Place Your Order",
        text: "Secure checkout with multiple payment options for a smooth transaction."
      },
      {
        icon: <LocalShippingIcon sx={{ fontSize: 50, color: "#26A69A" }} />,
        title: "Fast Delivery",
        text: "We ship quickly and safely so your product reaches you in perfect condition."
      },
      {
        icon: <SupportAgentIcon sx={{ fontSize: 50, color: "#AB47BC" }} />,
        title: "Enjoy & Support",
        text: "Enjoy your purchase with our reliable customer support always ready to help."
      }
    ].map((item, i) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={3}
        key={i}
        sx={{ display: "flex" }}   
      >
        <Box
          sx={{
            flex: 1,
            height: 160,    
            width:450,             
            p: 4,
            borderRadius: 4,
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            transition: "all 0.4s ease",
            animation: `fadeUp 0.8s ease forwards`,
            animationDelay: `${i * 0.2}s`,
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.15)"
            }
          }}
        >
          <Box>
            <Box sx={{ mb: 2 }}>{item.icon}</Box>

            <Typography variant="h6" fontWeight="bold" mb={1} sx={{ color: "#3e2f1c" }}>
              {item.title}
            </Typography>
          </Box>

          <Typography sx={{ color: "#6d5c48", fontSize: "0.95rem" }}>
            {item.text}
          </Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>


<style>
{`
@keyframes fadeUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
`}
</style>


{/* section 4 */}
{/* 💬 Testimonials */}
<Box
  sx={{
    pt:5,

    px: { xs: 2, md: 8 },
    py: 12,
    textAlign: "center",
    background: "linear-gradient(135deg, rgba(122,89,52,0.15), rgba(122,89,52,0.05))",
    borderRadius: 5
  }}
>
  <Typography variant="h4" fontWeight="bold" mb={10} sx={{ color: "#3e2f1c" }}>
    What Our Customers Say
  </Typography>

  <Grid container spacing={6} justifyContent="center">
    {[
      {
        text: "Amazing deals and super fast delivery. My go-to tech store!",
        name: "Rahul Sharma"
      },
      {
        text: "The quality is top-notch and prices are unbeatable.",
        name: "Priya Verma"
      },
      {
        text: "Customer support is fantastic. Highly recommend!",
        name: "Amit Patel"
      }
    ].map((review, i) => (
      <Grid
        item
        xs={12}
        md={4}
        key={i}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          transition: "all 0.4s ease",
          animation: `fadeUp 0.8s ease forwards`,
          animationDelay: `${i * 0.2}s`,
          opacity: 0,
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
          }
        }}
      >
        <Typography sx={{ mb: 2, fontStyle: "italic", color: "#6d5c48" }}>
          “{review.text}”
        </Typography>
        <Typography fontWeight="bold" sx={{ color: "#3e2f1c" }}>
          — {review.name}
        </Typography>
      </Grid>
    ))}
  </Grid>
</Box>


<style>
{`
@keyframes fadeUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
`}
</style>



{/* section  */}


{/* 🔥 Limited Offer Strip */}
<Box
  sx={{

    py: 6,
    textAlign: "center",
background: "linear-gradient(90deg, #776248ff, #6f5b39ff, #7c6747ff)",
    color: "#fff"
  }}
>
  <Typography variant="h5" fontWeight="bold" mb={1}>
    Limited Time Mega Deals ⏳
  </Typography>

  <Typography variant="body1" sx={{ color: "#ccc", mb: 3 }}>
    Don’t miss out — Register now and unlock exclusive discounts!
  </Typography>

  <Button
    variant="contained"
    onClick={() => navigate("/register")}
    sx={{
      background: "#c0974b",
      color: "#fff",
      px: 4,
      py: 1.2,
      borderRadius: "30px",
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "16px",
      boxShadow: "0 8px 20px rgba(192,151,75,0.4)",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "#a97f38",
        transform: "translateY(-3px)",
        boxShadow: "0 12px 25px rgba(192,151,75,0.6)"
      }
    }}
  >
    See More
  </Button>
</Box>




      <Footer />

      {/* ✨ Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              transform: translateY(40px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default HomePage;
