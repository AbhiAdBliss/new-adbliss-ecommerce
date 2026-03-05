import React, { useState } from "react";
import { Box, Typography, Button, Stack, Paper, Slide } from "@mui/material";

const CookieConsent = () => {

  const [showBanner, setShowBanner] = useState(() => {
    const consent =
      typeof window !== "undefined"
        ? localStorage.getItem("cookieConsent")
        : true;
    return !consent;
  });

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleManage = () => {
    console.log("Manage cookies clicked");
  };

  return (
    <Slide direction="up" in={showBanner} mountOnEnter unmountOnExit>
      <Paper
        elevation={10}
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: 10, sm: 20 },
          right: { xs: 10, sm: "auto" },
          maxWidth: { xs: "100%", sm: 460 },
          bgcolor: "#121212", // same as header
          color: "#fff",
          p: 3,
          borderRadius: 3,
          border: "1px solid #2F80ED",
          zIndex: 10000,
          backdropFilter: "blur(10px)",
        }}
      >
        <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
          We use cookies to improve your experience and analyze traffic. By
          clicking "Accept", you agree to our use of cookies.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          
          {/* Manage Button */}
          <Button
            onClick={handleManage}
            sx={{
              color: "#9B6DFF",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                color: "#fff",
              },
            }}
          >
            Manage Cookies
          </Button>

          {/* Accept Button */}
          <Button
            variant="contained"
            onClick={handleAccept}
            sx={{
              background: "linear-gradient(90deg,#2F80ED,#9B6DFF)", // same as your site buttons
              color: "#fff",
              fontWeight: "bold",
              px: 3,
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0 4px 14px rgba(47,128,237,0.4)",
              "&:hover": {
                background: "linear-gradient(90deg,#1f6fd1,#7c52ff)",
              },
            }}
          >
            Accept
          </Button>

        </Stack>
      </Paper>
    </Slide>
  );
};

export default CookieConsent;