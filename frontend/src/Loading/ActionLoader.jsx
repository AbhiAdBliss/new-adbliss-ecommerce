import React from "react";
import { Backdrop, Typography, Box, Stack } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

/* ─── Inject keyframes once ─── */
if (!document.getElementById("bliss-action-loader-styles")) {
  const s = document.createElement("style");
  s.id = "bliss-action-loader-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap');

    @keyframes alSpin        { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
    @keyframes alSpinRev     { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
    @keyframes alPulse       { 0%,100%{transform:scale(1) translateY(0); opacity:1} 50%{transform:scale(1.18) translateY(-4px); opacity:.85} }
    @keyframes alGlow        { 0%,100%{box-shadow:0 0 24px rgba(99,102,241,.5)} 50%{box-shadow:0 0 56px rgba(168,85,247,.8),0 0 90px rgba(236,72,153,.3)} }
    @keyframes alDot         { 0%,80%,100%{transform:scale(.6);opacity:.3} 40%{transform:scale(1.3);opacity:1} }
    @keyframes alFadeUp      { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes alOrbit       { from{transform:rotate(0deg)   translateX(46px) rotate(0deg)}   to{transform:rotate(360deg)  translateX(46px) rotate(-360deg)} }
    @keyframes alOrbitRev    { from{transform:rotate(180deg) translateX(34px) rotate(-180deg)} to{transform:rotate(540deg)  translateX(34px) rotate(-540deg)} }
    @keyframes alShimmer     { 0%{background-position:-300px 0} 100%{background-position:300px 0} }
    @keyframes alTextBlink   { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes alBgPulse     { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes alScaleIn     { from{opacity:0;transform:scale(.7)} to{opacity:1;transform:scale(1)} }

    .al-spin      { animation: alSpin     1.6s linear infinite; }
    .al-spin-rev  { animation: alSpinRev  2.4s linear infinite; }
    .al-pulse     { animation: alPulse    1.8s ease-in-out infinite; }
    .al-glow      { animation: alGlow     2.2s ease-in-out infinite; }
    .al-orbit     { animation: alOrbit    1.8s linear infinite; }
    .al-orbit-rev { animation: alOrbitRev 2.8s linear infinite; }
    .al-scale-in  { animation: alScaleIn  .45s cubic-bezier(.22,.68,0,1.2) both; }
  `;
  document.head.appendChild(s);
}

const FONT = "'Nunito', sans-serif";

const ActionLoader = ({ open, text = "Processing..." }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 9999,
        background: "rgba(10, 8, 24, 0.88)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {open && (
        <Stack spacing={3.5} alignItems="center" className="al-scale-in">

          {/* ── Spinner + Icon ── */}
          <Box sx={{ position: "relative", width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>

            {/* Outer spinning ring */}
            <Box className="al-spin" sx={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              border: "2.5px solid transparent",
              borderTopColor: "#6366F1",
              borderRightColor: "#A855F7",
            }} />

            {/* Middle reverse dashed ring */}
            <Box className="al-spin-rev" sx={{
              position: "absolute", inset: 10,
              borderRadius: "50%",
              border: "2px dashed rgba(236,72,153,0.45)",
            }} />

            {/* Orbiting dot 1 */}
            <Box sx={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
              <Box className="al-orbit" sx={{
                width: 9, height: 9, borderRadius: "50%",
                bgcolor: "#6366F1", boxShadow: "0 0 8px #6366F1",
                position: "absolute", top: -4.5, left: -4.5,
              }} />
            </Box>

            {/* Orbiting dot 2 */}
            <Box sx={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
              <Box className="al-orbit-rev" sx={{
                width: 6, height: 6, borderRadius: "50%",
                bgcolor: "#EC4899", boxShadow: "0 0 6px #EC4899",
                position: "absolute", top: -3, left: -3,
              }} />
            </Box>

            {/* Centre glowing icon box */}
            <Box className="al-pulse al-glow" sx={{
              width: 60, height: 60, borderRadius: "50%",
              background: "linear-gradient(135deg,#6366F1 0%,#A855F7 50%,#EC4899 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", zIndex: 2,
            }}>
              <ShoppingCartCheckoutIcon sx={{ fontSize: 28, color: "#fff" }} />
            </Box>
          </Box>

          {/* ── Text ── */}
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{
              fontFamily: FONT, fontWeight: 800,
              fontSize: "1.1rem", color: "#fff",
              letterSpacing: ".5px",
              animation: "alFadeUp .5s ease both",
            }}>
              {text}
            </Typography>
            <Typography sx={{
              fontFamily: FONT, fontWeight: 500,
              fontSize: ".78rem",
              color: "rgba(255,255,255,0.38)",
              mt: .5, letterSpacing: ".5px",
              animation: "alTextBlink 2s ease-in-out infinite",
            }}>
              Please don't close this window
            </Typography>
          </Box>

          {/* ── Three bouncing dots ── */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {[0, 1, 2].map(i => (
              <Box key={i} sx={{
                width: 8, height: 8, borderRadius: "50%",
                background: ["#6366F1", "#A855F7", "#EC4899"][i],
                animation: `alDot 1.3s ease-in-out infinite`,
                animationDelay: `${i * 0.18}s`,
              }} />
            ))}
          </Box>

        </Stack>
      )}
    </Backdrop>
  );
};

export default ActionLoader;