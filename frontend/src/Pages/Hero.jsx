import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import video1 from "../assets/video1.mp4";
import { Link } from "react-router-dom";



const Hero = () => {
  return (
    <Box>

   
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        overflow: "hidden"
      }}
    >
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2
        }}
      >
        <source src={video1} type="video/mp4" />
      </Box>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.35)",
          zIndex: -1
        }}
      />

      {/* Content (No Side Gaps Now) */}
      <Container maxWidth={false} disableGutters>
        <Box sx={{ maxWidth: "900px", mx: "auto", px: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3.5rem" },
              lineHeight: 1.2
            }}
          >
            The easiest way to sell online in India
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              color: "rgba(255,255,255,0.75)",
              fontSize: { xs: "1rem", md: "1.25rem" }
            }}
          >
            Build your brand, reach customers everywhere, and grow your
            business with a powerful e-commerce platform.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center"
            }}
          >
           <Button
  component={Link}
  to="/register"
  variant="contained"
  sx={{
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "30px",
    px: 4,
    py: 1.5,
    fontWeight: 600,
    textTransform: "none",
    width: { xs: "100%", sm: "auto" },
    maxWidth: "280px",
    textDecoration: "none",
    "&:hover": { backgroundColor: "#f2f2f2" }
  }}
>
  Start free trial
</Button>


            <Button
              variant="outlined"
              sx={{
                borderColor: "rgba(255,255,255,0.4)",
                color: "#fff",
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                textTransform: "none",
                width: { xs: "100%", sm: "auto" },
                maxWidth: "280px",
                "&:hover": { borderColor: "#fff" }
              }}
            >
              Watch demo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>


     </Box>
  );
};

export default Hero;
