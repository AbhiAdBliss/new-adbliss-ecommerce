import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Chip } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [visible, setVisible] = useState(false);
  const [checkAnim, setCheckAnim] = useState(false);

  useEffect(() => {
    const orderPlaced = sessionStorage.getItem("orderSuccess");
    const user = localStorage.getItem("user");
    if (!orderPlaced || !user) {
      navigate("/");
    }
    sessionStorage.removeItem("orderSuccess");

    // staggered entrance
    setTimeout(() => setVisible(true), 100);
    setTimeout(() => setCheckAnim(true), 400);
  }, [navigate]);

  const steps = [
    { icon: <InventoryOutlinedIcon sx={{ fontSize: 18 }} />, label: "Order Confirmed", done: true },
    { icon: <LocalShippingOutlinedIcon sx={{ fontSize: 18 }} />, label: "Dispatching Soon", done: false },
    { icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} />, label: "Out for Delivery", done: false },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#06090f",
        position: "relative",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Background glow blobs */}
      <Box sx={{
        position: "absolute", top: "10%", left: "15%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(47,128,237,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", bottom: "10%", right: "10%",
        width: 350, height: 350, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Particle dots */}
      {[...Array(6)].map((_, i) => (
        <Box key={i} sx={{
          position: "absolute",
          width: { xs: 3, md: 4 },
          height: { xs: 3, md: 4 },
          borderRadius: "50%",
          bgcolor: i % 2 === 0 ? "rgba(47,128,237,0.4)" : "rgba(34,197,94,0.4)",
          top: `${15 + i * 13}%`,
          left: i % 2 === 0 ? `${5 + i * 8}%` : `${75 + i * 3}%`,
          animation: "float 3s ease-in-out infinite",
          animationDelay: `${i * 0.5}s`,
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-12px)" },
          },
        }} />
      ))}

      {/* Card */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: 460 },
          maxWidth: 460,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Top green glow line */}
        <Box sx={{
          position: "absolute", top: 0, left: "20%", right: "20%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
          borderRadius: "50%",
        }} />

        <Box
          sx={{
            borderRadius: "24px",
            background: "linear-gradient(145deg, #0e1420 0%, #0a1018 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
            overflow: "hidden",
          }}
        >
          {/* Header section */}
          <Box sx={{
            pt: 5, pb: 4, px: 4,
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(34,197,94,0.05) 0%, transparent 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            {/* Animated checkmark */}
            <Box sx={{
              position: "relative",
              width: 80, height: 80,
              mx: "auto", mb: 3,
            }}>
              {/* Outer ring */}
              <Box sx={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                border: "2px solid rgba(34,197,94,0.2)",
                animation: "pulse-ring 2s ease-out infinite",
                "@keyframes pulse-ring": {
                  "0%": { transform: "scale(1)", opacity: 1 },
                  "100%": { transform: "scale(1.5)", opacity: 0 },
                },
              }} />
              {/* Inner circle */}
              <Box sx={{
                width: "100%", height: "100%",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))",
                border: "1.5px solid rgba(34,197,94,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: checkAnim ? "scale(1)" : "scale(0.5)",
                opacity: checkAnim ? 1 : 0,
                transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s",
              }}>
                <CheckCircleOutlineIcon sx={{
                  fontSize: 40,
                  color: "#22c55e",
                  filter: "drop-shadow(0 0 8px rgba(34,197,94,0.5))",
                }} />
              </Box>
            </Box>

            <Chip
              label="Payment Successful"
              size="small"
              sx={{
                bgcolor: "rgba(34,197,94,0.1)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.25)",
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.05em",
                mb: 2,
              }}
            />

            <Typography sx={{
              fontWeight: 800,
              fontSize: { xs: "1.6rem", sm: "1.9rem" },
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              mb: 1,
            }}>
              Order Confirmed!
            </Typography>
            <Typography sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.88rem",
              lineHeight: 1.6,
            }}>
              Thank you for shopping with ShopnBliss. <br />
              Your order is now being processed.
            </Typography>
          </Box>

          {/* Order ID section */}
          <Box sx={{ px: 4, py: 3, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <Box sx={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              bgcolor: "rgba(47,128,237,0.06)",
              border: "1px solid rgba(47,128,237,0.15)",
              borderRadius: "12px",
              px: 2.5, py: 2,
            }}>
              <Box>
                <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", mb: 0.3 }}>
                  Order ID
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", fontFamily: "monospace", letterSpacing: "0.04em" }}>
                  #{orderId}
                </Typography>
              </Box>
              <Box sx={{
                bgcolor: "rgba(47,128,237,0.12)",
                border: "1px solid rgba(47,128,237,0.2)",
                borderRadius: "8px",
                px: 1.5, py: 0.6,
              }}>
                <Typography sx={{ fontSize: "0.7rem", color: "#2F80ED", fontWeight: 700 }}>
                  Processing
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Delivery steps */}
          <Box sx={{ px: 4, py: 3, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", mb: 2.5 }}>
              Delivery Status
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  <Box sx={{ textAlign: "center", flex: 1 }}>
                    <Box sx={{
                      width: 38, height: 38,
                      borderRadius: "50%",
                      mx: "auto", mb: 1,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      bgcolor: step.done ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${step.done ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.08)"}`,
                      color: step.done ? "#22c55e" : "rgba(255,255,255,0.2)",
                    }}>
                      {step.icon}
                    </Box>
                    <Typography sx={{
                      fontSize: "0.68rem", fontWeight: 600,
                      color: step.done ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
                      lineHeight: 1.3,
                    }}>
                      {step.label}
                    </Typography>
                  </Box>
                  {i < steps.length - 1 && (
                    <Box sx={{
                      flex: 1, height: "1.5px", mx: 0.5, mb: 3.5,
                      background: i === 0
                        ? "linear-gradient(90deg, rgba(34,197,94,0.5), rgba(255,255,255,0.08))"
                        : "rgba(255,255,255,0.06)",
                    }} />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>

          {/* Info row */}
          <Box sx={{
            px: 4, py: 2.5,
            display: "flex", alignItems: "center", gap: 1.5,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            <SupportAgentOutlinedIcon sx={{ fontSize: 18, color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
              A confirmation email will be sent shortly. Need help?{" "}
              <Box component="span" sx={{ color: "#2F80ED", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                Contact Support
              </Box>
            </Typography>
          </Box>

          {/* Buttons */}
          <Box sx={{ px: 4, py: 3.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/apple")}
              sx={{
                py: 1.5,
                fontWeight: 700,
                fontSize: "0.92rem",
                borderRadius: "12px",
                textTransform: "none",
                bgcolor: "#2F80ED",
                boxShadow: "0 4px 20px rgba(47,128,237,0.35)",
                "&:hover": {
                  bgcolor: "#1e6fd9",
                  boxShadow: "0 6px 24px rgba(47,128,237,0.5)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Continue Shopping
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate("/")}
              sx={{
                py: 1.2,
                fontWeight: 600,
                fontSize: "0.85rem",
                borderRadius: "12px",
                textTransform: "none",
                color: "rgba(255,255,255,0.3)",
                "&:hover": { color: "rgba(255,255,255,0.7)", bgcolor: "rgba(255,255,255,0.04)" },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>

        {/* Bottom tagline */}
        <Typography sx={{
          textAlign: "center", mt: 3,
          fontSize: "0.72rem", color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.05em",
        }}>
          ShopnBliss · Genuine Apple Products · Fast Delivery
        </Typography>
      </Box>
    </Box>
  );
}