import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

/* ─── Inject keyframes once ─── */
if (!document.getElementById("bliss-loading-styles")) {
  const s = document.createElement("style");
  s.id = "bliss-loading-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');

    @keyframes blPulse {
      0%, 100% { transform: scale(1);   opacity: 1; }
      50%       { transform: scale(1.15); opacity: 0.85; }
    }
    @keyframes blSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes blSpinReverse {
      from { transform: rotate(0deg); }
      to   { transform: rotate(-360deg); }
    }
    @keyframes blFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes blDot {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
      40%            { transform: scale(1.2); opacity: 1;   }
    }
    @keyframes blShimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
    @keyframes blGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4); }
      50%       { box-shadow: 0 0 50px rgba(168,85,247,0.7), 0 0 80px rgba(236,72,153,0.3); }
    }
    @keyframes blOrbit {
      from { transform: rotate(0deg)   translateX(52px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(52px) rotate(-360deg); }
    }
    @keyframes blOrbit2 {
      from { transform: rotate(180deg) translateX(38px) rotate(-180deg); }
      to   { transform: rotate(540deg) translateX(38px) rotate(-540deg); }
    }
    @keyframes blProgressFill {
      0%   { width: 0%; }
      100% { width: 100%; }
    }

    .bl-spin         { animation: blSpin        1.6s linear infinite; }
    .bl-spin-reverse { animation: blSpinReverse  2.4s linear infinite; }
    .bl-pulse        { animation: blPulse        2s   ease-in-out infinite; }
    .bl-glow         { animation: blGlow         2.5s ease-in-out infinite; }
    .bl-orbit1       { animation: blOrbit        2s   linear infinite; }
    .bl-orbit2       { animation: blOrbit2       3s   linear infinite; }
  `;
  document.head.appendChild(s);
}

/* ─── Cycling messages ─── */
const MESSAGES = [
  "Loading amazing deals...",
  "Preparing your experience...",
  "Almost there...",
  // "Fetching the best products...",
];

const LoadingPage = () => {
  const [msgIndex, setMsgIndex]     = useState(0);
  const [fadeMsg,  setFadeMsg]      = useState(true);
  const [progress, setProgress]     = useState(0);

  /* Cycle messages */
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeMsg(false);
      setTimeout(() => {
        setMsgIndex(i => (i + 1) % MESSAGES.length);
        setFadeMsg(true);
      }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  /* Fake progress bar */
  useEffect(() => {
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 95) { clearInterval(t); return p; }
        return p + Math.random() * 6;
      });
    }, 180);
    return () => clearInterval(t);
  }, []);

  return (
    <Box sx={{
      height: "100vh",
      background: "linear-gradient(145deg, #0f0f1a 0%, #1a1040 50%, #0f0f1a 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", position: "relative",
      fontFamily: "'Nunito', sans-serif",
    }}>

      {/* ── Background blobs ── */}
      <Box sx={{
        position: "absolute", width: 500, height: 500,
        borderRadius: "50%", top: "-15%", left: "-10%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", width: 400, height: 400,
        borderRadius: "50%", bottom: "-10%", right: "-8%",
        background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Floating particles ── */}
      {[...Array(6)].map((_, i) => (
        <Box key={i} sx={{
          position: "absolute",
          width: 4 + (i % 3) * 3,
          height: 4 + (i % 3) * 3,
          borderRadius: "50%",
          background: ["#6366F1","#A855F7","#EC4899","#6366F1","#F59E0B","#10B981"][i],
          top:  `${15 + i * 13}%`,
          left: `${8  + i * 14}%`,
          opacity: 0.5,
          animation: `blPulse ${1.5 + i * 0.4}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }} />
      ))}

      {/* ── Centre loader ── */}
      <Box sx={{ position: "relative", mb: 4 }}>

        {/* Outer spinning ring */}
        <Box className="bl-spin" sx={{
          width: 130, height: 130,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#6366F1",
          borderRightColor: "#A855F7",
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }} />

        {/* Middle reverse ring */}
        <Box className="bl-spin-reverse" sx={{
          width: 108, height: 108,
          borderRadius: "50%",
          border: "2px dashed rgba(236,72,153,0.4)",
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }} />

        {/* Orbiting dot 1 */}
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0,
        }}>
          <Box className="bl-orbit1" sx={{
            width: 10, height: 10, borderRadius: "50%",
            bgcolor: "#6366F1",
            boxShadow: "0 0 8px #6366F1",
            position: "absolute",
            top: "-5px", left: "-5px",
          }} />
        </Box>

        {/* Orbiting dot 2 */}
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0,
        }}>
          <Box className="bl-orbit2" sx={{
            width: 7, height: 7, borderRadius: "50%",
            bgcolor: "#EC4899",
            boxShadow: "0 0 6px #EC4899",
            position: "absolute",
            top: "-3.5px", left: "-3.5px",
          }} />
        </Box>

        {/* Centre icon box */}
        <Box className="bl-pulse bl-glow" sx={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg,#6366F1 0%,#A855F7 50%,#EC4899 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", zIndex: 2,
          mx: "auto",
        }}>
          <ShoppingBagIcon sx={{ fontSize: 36, color: "#fff" }} />
        </Box>
      </Box>

      {/* ── Brand name ── */}
      <Typography sx={{
        fontWeight: 900,
        fontSize: { xs: "1.9rem", md: "2.4rem" },
        fontFamily: "'Nunito', sans-serif",
        letterSpacing: "3px",
        background: "linear-gradient(90deg,#818CF8,#C084FC,#F472B6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "blFadeUp .8s ease both",
        animationDelay: ".1s",
        mb: .5,
      }}>
        ShopnBliss
      </Typography>

      <Typography sx={{
        color: "rgba(255,255,255,0.3)",
        fontSize: ".72rem",
        letterSpacing: "4px",
        textTransform: "uppercase",
        fontFamily: "'Nunito', sans-serif",
        animation: "blFadeUp .8s ease both",
        animationDelay: ".25s",
        mb: 4,
      }}>
        Premium Shopping
      </Typography>

      {/* ── Progress bar ── */}
      <Box sx={{
        width: { xs: 220, md: 280 },
        mb: 2.5,
        animation: "blFadeUp .8s ease both",
        animationDelay: ".4s",
      }}>
        <Box sx={{
          height: 4, borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}>
          <Box sx={{
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg,#6366F1,#A855F7,#EC4899)",
            borderRadius: 4,
            transition: "width 0.2s ease",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              right: 0, top: 0,
              width: 40, height: "100%",
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.4))",
              animation: "blShimmer 1.2s ease-in-out infinite",
            }
          }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: .6 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.25)", fontSize: ".68rem", fontFamily: "'Nunito', sans-serif" }}>
            {Math.round(Math.min(progress, 100))}%
          </Typography>
        </Box>
      </Box>

      {/* ── Cycling message ── */}
      <Typography sx={{
        color: "rgba(255,255,255,0.5)",
        fontSize: ".82rem",
        fontFamily: "'Nunito', sans-serif",
        letterSpacing: "1px",
        transition: "opacity .3s ease, transform .3s ease",
        opacity: fadeMsg ? 1 : 0,
        transform: fadeMsg ? "translateY(0)" : "translateY(6px)",
        animation: "blFadeUp .8s ease both",
        animationDelay: ".5s",
        mb: 4,
      }}>
        {MESSAGES[msgIndex]}
      </Typography>

      {/* ── Three bouncing dots ── */}
      <Box sx={{
        display: "flex", gap: 1,
        animation: "blFadeUp .8s ease both",
        animationDelay: ".6s",
      }}>
        {[0, 1, 2].map(i => (
          <Box key={i} sx={{
            width: 8, height: 8, borderRadius: "50%",
            background: ["#6366F1","#A855F7","#EC4899"][i],
            animation: `blDot 1.4s ease-in-out infinite`,
            animationDelay: `${i * 0.18}s`,
          }} />
        ))}
      </Box>

    </Box>
  );
};

export default LoadingPage;