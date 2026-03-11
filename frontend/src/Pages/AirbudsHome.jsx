import React from "react";
import { Box, Typography, Container } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import BoltIcon from "@mui/icons-material/Bolt";
import AirbudsHomeimg from "../assets/Home-images/AirbudsHome-img.png";

export default function AirbudsHome() {
  return (
<Container maxWidth="xl" sx={{ mt: 4 }}>
 <Box
  sx={{
    position: "relative",
    borderRadius: "24px",            
    overflow: "hidden",
    minHeight: { xs: 400, md: 620 },
    display: "flex",
    alignItems: "center",
    color: "white",
    px: { xs: 3, md: 8 },
    backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,0.85), rgba(252,251,251,0.1)),
      url(${AirbudsHomeimg})
    `,
    backgroundSize: "cover",     
    backgroundPosition: { xs: "right center", md: "center" },
    backgroundRepeat: "no-repeat", 
  }}
>
        {/* Content */}
       <Box
  sx={{
    maxWidth: { xs: "100%", md: 520 },
    textAlign: { xs: "center", md: "left" }
  }}
>
          
          {/* Top badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: "30px",
              bgcolor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              mb: 3,
              fontSize: "0.9rem",
              mt:{md:0,xs:2}
            }}
          >
            <CheckIcon sx={{ fontSize: 18, }} />
            7 Hours per charge
          </Box>

          {/* Heading */}
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Get Airbuds Pro & Listen
            <br />
            Wherever You Want!
          </Typography>

          {/* Subtitle */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.1rem",
              mb: 4,
            }}
          >
            Power that keeps you going
          </Typography>

          {/* Glass Card */}
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              p: 3,
              maxWidth: 350,
              mb:{md:0,xs:2}

            }}
          >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <BoltIcon />
              <Typography fontWeight={600}>
                All-Day Battery Life
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              A quick 10-minute charge gives you 2 more hours of uninterrupted music.
            </Typography>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}