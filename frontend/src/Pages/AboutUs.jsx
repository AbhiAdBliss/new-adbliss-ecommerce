import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  Stack,
  Container,
  Button,
} from "@mui/material";
import { motion as Motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import StarIcon from "@mui/icons-material/Star";
import AppleIcon from "@mui/icons-material/Apple";

/* ── Framer variants ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

/* ── Data ─────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "9+", label: "Apple Products" },
  { value: "4.8★", label: "Avg. Rating" },
  { value: "3 Days", label: "Avg. Delivery" },
];

const VALUES = [
  {
    icon: <VerifiedIcon sx={{ fontSize: 28, color: "#2F80ED" }} />,
    title: "100% Genuine",
    desc: "Every product is sourced directly from Apple's authorised supply chain. No fakes, no compromises.",
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 28, color: "#22c55e" }} />,
    title: "Fast Delivery",
    desc: "Pan-India delivery in 3 days or less. Same-day dispatch for orders placed before 2 PM.",
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 28, color: "#f59e0b" }} />,
    title: "24/7 Support",
    desc: "Our team is always on standby. Chat, call or email — we respond within minutes.",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 28, color: "#a855f7" }} />,
    title: "Loyalty Rewards",
    desc: "Earn coins on every purchase and redeem them for exclusive discounts on your next order.",
  },
  {
    icon: <StorefrontIcon sx={{ fontSize: 28, color: "#ef4444" }} />,
    title: "Best Prices",
    desc: "We negotiate hard so you don't have to. Guaranteed lowest prices on all Apple products.",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 28, color: "#06b6d4" }} />,
    title: "Community First",
    desc: "Built by Apple fans, for Apple fans. We understand what matters to our customers.",
  },
];

const TEAM = [
  { name: "Arjun Mehta", role: "Founder & CEO", initial: "A", color: "#2F80ED" },
  { name: "Priya Sharma", role: "Head of Operations", initial: "P", color: "#22c55e" },
  { name: "Rahul Nair", role: "Lead Developer", initial: "R", color: "#f59e0b" },
  { name: "Sneha Iyer", role: "Customer Success", initial: "S", color: "#a855f7" },
];

export default function AboutUs() {
  return (
    <Box sx={{ bgcolor: "#f7f7f7", minHeight: "100vh" }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "#0f0f0f",
          pt: { xs: 8, md: 14 },
          pb: { xs: 8, md: 12 },
          px: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <Box sx={{
          position: "absolute", top: -80, left: -80, width: 400, height: 400,
          borderRadius: "50%", bgcolor: "#2F80ED", opacity: 0.06,
          filter: "blur(80px)", pointerEvents: "none",
        }} />
        <Box sx={{
          position: "absolute", bottom: -60, right: -60, width: 320, height: 320,
          borderRadius: "50%", bgcolor: "#a855f7", opacity: 0.07,
          filter: "blur(70px)", pointerEvents: "none",
        }} />

        <Container maxWidth="md">
          <Motion.div variants={stagger} initial="hidden" animate="show">
            <Box sx={{ textAlign: "center" }}>

              <Motion.div variants={fadeUp}>
                <Chip
                  icon={<AppleIcon sx={{ fontSize: 14, color: "#fff !important" }} />}
                  label="Official Apple Reseller · Est. 2021"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    mb: 3,
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    color: "#fff",
                    fontSize: { xs: "2rem", sm: "2.8rem", md: "3.8rem" },
                    lineHeight: 1.15,
                    letterSpacing: "-0.03em",
                    mb: 3,
                  }}
                >
                  We bring Apple to{" "}
                  <Box component="span" sx={{ color: "#2F80ED" }}>your doorstep</Box>
                </Typography>
              </Motion.div>

              <Motion.div variants={fadeUp}>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: { xs: "0.95rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    maxWidth: 560,
                    mx: "auto",
                  }}
                >
                  Shopnbliss was born from a simple belief — everyone deserves access to
                  world-class Apple technology, delivered fast, at the best price, with zero hassle.
                </Typography>
              </Motion.div>

            </Box>
          </Motion.div>

          {/* Stats Row */}
          
<Container maxWidth="lg" > 
  <Motion.div variants={stagger} initial="hidden" animate="show">
    <Grid 
      container 
      spacing={5} 
      sx={{ mt: 6 }}
      justifyContent="center"
    >
      {STATS.map((s, i) => (
        <Grid item xs={6} sm={3} md={3} key={i} sx={{ display: "flex" }}>
          <Motion.div
            variants={fadeUp}
            style={{ display: "flex", width: "100%" }}
          >
       <Box
  sx={{
   
   
    width:{xs:50, md:120},
    height:{xs:50, md:120},

    p: 3,
    textAlign: "center",
    borderRadius: 4,
    bgcolor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    transition: "all 0.3s ease",
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.07)",
      transform: "translateY(-6px)",
      borderColor: "rgba(255,255,255,0.2)",
    }
  }}
>
              <Typography
                sx={{
                  fontSize: { xs: "1.4rem", md: "2.2rem" },
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "0.6rem", md: "0.7rem" },
                  color: "rgba(255,255,255,0.45)",
                  mt: 1.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textAlign: "center"
                }}
              >
                {s.label}
              </Typography>
            </Box>
          </Motion.div>
        </Grid>
      ))}
    </Grid>
  </Motion.div>
</Container>
        </Container>
      </Box>

      {/* ── OUR STORY ─────────────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">

            {/* Left text */}
            <Grid item xs={12} md={6}>
              <Motion.div variants={fadeUp}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 4, height: 28, bgcolor: "#2F80ED", borderRadius: 2 }} />
                  <Typography sx={{
                    fontSize: "0.8rem", fontWeight: 700, color: "#2F80ED",
                    textTransform: "uppercase", letterSpacing: "0.1em",
                  }}>
                    Our Story
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{
                  fontWeight: 800, color: "#111", mb: 3,
                  lineHeight: 1.3, fontSize: { xs: "1.6rem", md: "2.1rem" },
                }}>
                  From a small idea to India's trusted Apple store
                </Typography>
                <Typography sx={{ color: "#6b7280", lineHeight: 1.9, fontSize: "0.97rem", mb: 2 }}>
                  Founded in Chennai in 2021, Shopnbliss started as a small passion project by a
                  group of Apple enthusiasts who were frustrated by overpriced grey-market products
                  and unreliable sellers.
                </Typography>
                <Typography sx={{ color: "#6b7280", lineHeight: 1.9, fontSize: "0.97rem", mb: 2 }}>
                  We set out to create an e-commerce experience that felt as premium as the products
                  we sell — transparent pricing, fast delivery, and a customer support team that
                  actually cares.
                </Typography>
                <Typography sx={{ color: "#6b7280", lineHeight: 1.9, fontSize: "0.97rem" }}>
                  Today, we serve over 50,000 customers across India and continue to grow — staying
                  true to our founding values of authenticity, speed and delight.
                </Typography>
              </Motion.div>
            </Grid>

            {/* Right timeline */}
            <Grid item xs={12} md={6}>
              <Motion.div variants={fadeUp}>
                <Box
                  sx={{
                    bgcolor: "#0f0f0f",
                    borderRadius: 5,
                    p: { xs: 3, md: 5 },
                          maxWidth: 500,   
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{
                    position: "absolute", top: -40, right: -40, width: 200, height: 200,
                    borderRadius: "50%", bgcolor: "#2F80ED", opacity: 0.08, filter: "blur(50px)",
                  }} />
                  <Stack spacing={3}>
                    {[
                      { year: "2021", event: "Shopnbliss founded in Chennai, Tamil Nadu" },
                      { year: "2022", event: "Crossed 5,000 orders · Launched loyalty coins program" },
                      { year: "2023", event: "Pan-India shipping · 10,000+ happy customers" },
                      { year: "2024", event: "Became Apple Authorised Reseller · New warehouse launched" },
                      { year: "2025", event: "50,000+ customers · Full Apple ecosystem coverage" },
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 2.5, alignItems: "flex-start" }}>
                        <Box sx={{ minWidth: 44 }}>
                          <Typography sx={{
                            fontSize: "0.72rem", fontWeight: 800, color: "#2F80ED",
                            bgcolor: "rgba(47,128,237,0.12)", px: 1, py: 0.4,
                            borderRadius: 1, display: "inline-block",
                          }}>
                            {item.year}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1, borderLeft: "2px solid rgba(255,255,255,0.06)", pl: 2.5 }}>
                          <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                            {item.event}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Motion.div>
            </Grid>

          </Grid>
        </Motion.div>
      </Container>

      <Divider sx={{ mx: { xs: 3, md: 8 }, opacity: 0.4 }} />

   {/* ── OUR VALUES ────────────────────────────────────────────────── */}
<Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
  <Motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Typography sx={{
        fontSize: "0.8rem", fontWeight: 700, color: "#2F80ED",
        textTransform: "uppercase", letterSpacing: "0.1em", mb: 1,
      }}>
        Why Choose Us
      </Typography>
      <Typography variant="h4" sx={{
        fontWeight: 800, color: "#111",
        fontSize: { xs: "1.7rem", md: "2.2rem" },
      }}>
        Built on values that matter
      </Typography>
    </Box>
  </Motion.div>

  <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
    <Grid container spacing={3} justifyContent="center">
      {VALUES.map((v, i) => (
        <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex' }}>
          <Motion.div 
            variants={fadeUp} 
            style={{ display: 'flex', width: '100%' }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                bgcolor: "#fff",
                width: "100%",
                // This ensures the height matches the width for a "square" look
                // Adjust to "1 / 0.8" if you want them slightly rectangular
                aspectRatio: { md: "1 / 1", sm: "auto" }, 
                minHeight: { xs: 280, md: 'auto' },
                display: "flex",    
                flexDirection: "column",
                justifyContent: "center", // Centers content vertically
                alignItems: "center",     // Centers content horizontally
                textAlign: "center",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  borderColor: "#2F80ED",
                },
              }}
            >
              <Box sx={{
                width: 60, height: 60, borderRadius: 3,
                bgcolor: "#f0f6ff", display: "flex",
                alignItems: "center", justifyContent: "center", mb: 3,
              }}>
                {v.icon}
              </Box>

              <Typography sx={{ fontWeight: 700, fontSize: "1.15rem", color: "#111", mb: 1.5 }}>
                {v.title}
              </Typography>

              <Typography sx={{ 
                color: "#6b7280", 
                fontSize: "0.9rem", 
                lineHeight: 1.6,
                maxWidth: "280px" // Prevents text from stretching too wide
              }}>
                {v.desc}
              </Typography>
            </Paper>
          </Motion.div>
        </Grid>
      ))}
    </Grid>
  </Motion.div>
</Container>

      <Divider sx={{ mx: { xs: 3, md: 8 }, opacity: 0.4 }} />

      {/* ── TEAM ──────────────────────────────────────────────────────── */}
      {/* <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography sx={{
              fontSize: "0.8rem", fontWeight: 700, color: "#2F80ED",
              textTransform: "uppercase", letterSpacing: "0.1em", mb: 1,
            }}>
              The Team
            </Typography>
            <Typography variant="h4" sx={{
              fontWeight: 800, color: "#111",
              fontSize: { xs: "1.7rem", md: "2.2rem" },
            }}>
              People behind Shopnbliss
            </Typography>
          </Box>
        </Motion.div>

        <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
            {TEAM.map((member, i) => (
              <Grid item xs={6} sm={6} md={3} key={i}>
                <Motion.div variants={fadeUp}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: { xs: 2, md: 3 },
                      borderRadius: 4,
                      bgcolor: "#fff",
                      border: "1px solid #e5e7eb",
                      transition: "all 0.25s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 10px 28px rgba(0,0,0,0.07)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 64, md: 80 },
                        height: { xs: 64, md: 80 },
                        bgcolor: member.color,
                        fontSize: { xs: "1.4rem", md: "1.8rem" },
                        fontWeight: 800,
                        mx: "auto",
                        mb: 1.5,
                        boxShadow: `0 8px 20px ${member.color}40`,
                      }}
                    >
                      {member.initial}
                    </Avatar>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.95rem" }, color: "#111" }}>
                      {member.name}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "0.72rem", md: "0.78rem" }, color: "#9ca3af", mt: 0.3 }}>
                      {member.role}
                    </Typography>
                  </Box>
                </Motion.div>
              </Grid>
            ))}
          </Grid>
        </Motion.div>
      </Container> */}

      {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "#0f0f0f",
          py: { xs: 8, md: 12 },
          px: 2,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 500, height: 300, borderRadius: "50%",
          bgcolor: "#2F80ED", opacity: 0.05, filter: "blur(80px)",
        }} />

        <Container maxWidth="sm">
          <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Motion.div variants={fadeUp}>
              <StarIcon sx={{ color: "#f59e0b", fontSize: 36, mb: 2 }} />
              <Typography variant="h4" sx={{
                fontWeight: 800, color: "#fff", mb: 2,
                fontSize: { xs: "1.6rem", md: "2.2rem" },
              }}>
                Ready to experience the best?
              </Typography>
              <Typography sx={{
                color: "rgba(255,255,255,0.5)", mb: 4,
                fontSize: { xs: "0.9rem", md: "0.97rem" },
                lineHeight: 1.7,
              }}>
                Browse our full collection of Apple products — genuine, competitively priced, and delivered fast.
              </Typography>
              <Button
                component="a"
                href="/apple"
                sx={{
                  display: "inline-block",
                  bgcolor: "#2F80ED",
                  color: "#fff",
                  fontWeight: 700,
                  px: { xs: 3.5, md: 4 },
                  py: { xs: 1.4, md: 1.6 },
                  borderRadius: 2.5,
                  textDecoration: "none",
                  fontSize: { xs: "0.88rem", md: "0.95rem" },
                  transition: "all 0.2s",
                  cursor:'pointer',
                  "&:hover": {
                    bgcolor: "#1e6fd9",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(47,128,237,0.4)",
                  },
                }}
              >
                Shop Now 
              </Button>
            </Motion.div>
          </Motion.div>
        </Container>
      </Box>

    </Box>
  );
}