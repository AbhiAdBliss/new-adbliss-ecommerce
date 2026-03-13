import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Stack,
  IconButton,
  LinearProgress,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

/* ── Star Rating Utility ─────────────────────────────────────────────── */
function StarRating({ rating, size = 18 }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (i <= Math.floor(rating))
          return <StarIcon key={i} sx={{ fontSize: size, color: "#f59e0b" }} />;
        if (i - rating < 1)
          return <StarHalfIcon key={i} sx={{ fontSize: size, color: "#f59e0b" }} />;
        return <StarBorderIcon key={i} sx={{ fontSize: size, color: "#f59e0b" }} />;
      })}
    </Box>
  );
}

export default function RatingsReviews({ product }) {
  const scrollRef = useRef(null);
  const [helpful, setHelpful] = useState({});

  const scroll = (dir) => {
    if (scrollRef.current) {
      // Adjusted scroll distance for better UX
      const scrollAmount = window.innerWidth < 600 ? window.innerWidth * 0.8 : 340;
      scrollRef.current.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
    }
  };

  const handleHelpful = (idx, val) => {
    setHelpful((prev) => ({ ...prev, [idx]: prev[idx] === val ? null : val }));
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* ── Section Title ──────────────────────────────────────────── */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.4rem", md: "1.7rem" },
          mb: 4,
          color: "#111",
          letterSpacing: "-0.02em",
        }}
      >
        Reviews
      </Typography>

      {/* ── Top Row: Product image + Rating summary + Bars ─────────── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 4, lg: 8 },
          alignItems: { xs: "stretch", lg: "center" },
          mb: 8,
        }}
      >
        {/* Responsive Product Image Container */}
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: "100%", lg: 400 },
            height: { xs: 280, sm: 340 },
            borderRadius: 5,
            bgcolor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #f1f3f5"
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              maxWidth: "85%",
              maxHeight: "85%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Rating summary + bars */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 4,
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "3.5rem", md: "4.5rem" },
                fontWeight: 900,
                color: "#111",
                lineHeight: 1,
              }}
            >
              {product.rating}
            </Typography>
            <Box>
              <StarRating rating={product.rating} size={24} />
              <Typography sx={{ fontSize: "0.85rem", color: "#6b7280", mt: 0.5, fontWeight: 500 }}>
                Verified ratings from {product.reviewCount.toLocaleString("en-IN")} customers
              </Typography>
            </Box>
          </Box>

          {/* Rating breakdown bars */}
          <Stack spacing={2} sx={{ width: "100%", maxWidth: 500 }}>
            {[5, 4, 3, 2, 1].map((star) => (
              <Box key={star} sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", color: "#111", minWidth: 12 }}>
                  {star}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={product.ratingBreakdown[star]}
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#edf2f7",
                    "& .MuiLinearProgress-bar": { bgcolor: "#111", borderRadius: 4 },
                  }}
                />
                <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600, minWidth: 35 }}>
                  {product.ratingBreakdown[star]}%
                </Typography>
              </Box>
            ))}
          </Stack>

          <Button
            variant="contained"
            sx={{
              mt: 5,
              bgcolor: "#111",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              px: 4,
              py: 1.6,
              width: { xs: "100%", sm: "auto" },
              borderRadius: 3,
              textTransform: "none",
              "&:hover": { bgcolor: "#333", transform: "translateY(-2px)" },
              transition: "all 0.2s",
            }}
          >
            Add Your Rating
          </Button>
        </Box>
      </Box>

      {/* ── Review Cards Carousel ───────────────────────────────────── */}
      <Box sx={{ position: "relative", mx: { xs: -2, md: 0 } }}> {/* Negative margin on mobile to allow edge-to-edge scroll */}
  {/* Carousel Navigation - Hidden on mobile */}
  <IconButton
    onClick={() => scroll(-1)}
    sx={{
      display: { xs: "none", md: "flex" },
      position: "absolute",
      left: -1, // Moved out slightly for better look
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      bgcolor: "#fff",
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      "&:hover": { bgcolor: "#f9fafb" },
    }}
  >
    <ChevronLeftIcon />
  </IconButton>

  <Box
    ref={scrollRef}
    sx={{
      display: "flex",
      gap: { xs: 2, md: 2.5 },
      overflowX: "auto",
      scrollSnapType: "x mandatory",
      // IMPORTANT: px: 4 on mobile gives that "starting offset" so the first card isn't stuck to the wall
      px: { xs: 3, md: 1 }, 
      pb: 4,
      pt: 1,
      "&::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
      // Smooth out the momentum scrolling on iOS
      WebkitOverflowScrolling: "touch",
    }}
  >
    {product.reviews.map((review, idx) => (
      <Paper
        key={idx}
        elevation={0}
        sx={{
         
          minWidth: { xs: "280px", sm: "340px", md: "380px" },
          maxWidth: { xs: "280px", sm: "340px", md: "380px" },
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 5,
          border: "1px solid #eef0f2",
          bgcolor: "#fff",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          transition: "all 0.3s ease",
          "&:hover": { 
            borderColor: "#d1d5db", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)" 
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 44, height: 44, bgcolor: "#f1f5f9", color: "#475569", fontWeight: 700, fontSize: '0.9rem' }}>
            {review.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{review.name}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarRating rating={review.rating} size={13} />
              <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}>
                {review.rating.toFixed(1)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography sx={{ 
          fontSize: { xs: "0.82rem", md: "0.9rem" }, 
          color: "#4b5563", 
          lineHeight: 1.7, 
          flex: 1, 
          fontStyle: "italic" 
        }}>
          "{review.comment}"
        </Typography>

        <Box sx={{ pt: 2, borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600 }}>
            Helpful?
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" onClick={() => handleHelpful(idx, "yes")}>
              <SentimentSatisfiedIcon sx={{ fontSize: 18, color: helpful[idx] === "yes" ? "#22c55e" : "#cbd5e1" }} />
            </IconButton>
            <IconButton size="small" onClick={() => handleHelpful(idx, "no")}>
              <SentimentDissatisfiedIcon sx={{ fontSize: 18, color: helpful[idx] === "no" ? "#ef4444" : "#cbd5e1" }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    ))}
  </Box>

  <IconButton
    onClick={() => scroll(1)}
    sx={{
      display: { xs: "none", md: "flex" },
      position: "absolute",
      right: -1,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 10,
      bgcolor: "#fff",
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      "&:hover": { bgcolor: "#f9fafb" },
    }}
  >
    <ChevronRightIcon />
  </IconButton>
</Box>
    </Box>
  );
}