import React from "react";
import { Box, Container, Typography, Grid, TextField, Button, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#111", color: "#fff", pt: { xs: 6, md: 8 }, pb: 4,  }}>
      <Container>

        {/* TOP FOOTER */}
        <Grid container spacing={6}>

          {/* BRAND */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Adbliss Ecommerce
            </Typography>
            <Typography variant="body2" sx={{ color: "#bbb", maxWidth: 300, mx: { xs: "auto", md: 0 } }}>
              Your one-stop shop for premium gadgets, accessories, and electronics
              at unbeatable prices. Fast delivery and secure payments.
            </Typography>

            {/* SOCIAL ICONS */}
            <Box sx={{ mt: 3 }}>
              <IconButton sx={{ color: "#fff" }}><FacebookIcon /></IconButton>
              <IconButton sx={{ color: "#fff" }}><InstagramIcon /></IconButton>
              <IconButton sx={{ color: "#fff" }}><TwitterIcon /></IconButton>
              <IconButton sx={{ color: "#fff" }}><YouTubeIcon /></IconButton>
            </Box>
          </Grid>

          {/* QUICK LINKS */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography fontWeight="bold" gutterBottom>Shop</Typography>
            {["Mobiles", "Laptops", "Accessories", "Speakers", "Wearables"].map((item) => (
              <Typography key={item} variant="body2" sx={{ color: "#bbb", mb: 1, cursor: "pointer", "&:hover": { color: "#fff" } }}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* SUPPORT */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography fontWeight="bold" gutterBottom>Support</Typography>
            {["Contact Us", "FAQs", "Shipping", "Returns", "Order Tracking"].map((item) => (
              <Typography key={item} variant="body2" sx={{ color: "#bbb", mb: 1, cursor: "pointer", "&:hover": { color: "#fff" } }}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* NEWSLETTER */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
            <Typography fontWeight="bold" gutterBottom>Stay Updated</Typography>
            <Typography variant="body2" sx={{ color: "#bbb", mb: 2 }}>
              Subscribe to get special offers, free giveaways, and product launches.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                maxWidth: { xs: "100%", sm: "400px" },
                mx: { xs: "auto", md: 0 }
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Enter your email"
                fullWidth
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#c0974b",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": { bgcolor: "#a87f3b" }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>

        </Grid>

        {/* BOTTOM BAR */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: 6,
            pt: 3,
            textAlign: "center",
            color: "#aaa",
            fontSize: { xs: "12px", md: "14px" }
          }}
        >
          © {new Date().getFullYear()} Adbliss Ecommerce. All rights reserved.
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;
