import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Stack
} from "@mui/material";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    try {
      setError(""); setMessage("");

      await axios.post("/api/forgot-password", { email });

      setMessage("OTP sent to your email ✅");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP ❌");
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    try {
      setError(""); setMessage("");

      await axios.post("/api/verify-reset-otp", { email, otp });

      setMessage("OTP verified successfully ✅");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP ❌");
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async () => {
    try {
      setError(""); setMessage("");

      await axios.post("/api/reset-password", {
        email,
        newPassword
      });

      setMessage("Password updated successfully 🎉");
      setStep(1);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed ❌");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f4f4"
      }}
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Stack spacing={2}>

          <Typography variant="h5" textAlign="center">
            Forgot Password
          </Typography>

          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <TextField
                fullWidth
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
  <Button
    variant="contained"
    onClick={handleSendOtp}
    sx={{
      width: "150px",
      bgcolor: "#252424ff",
      cursor: "pointer",
      "&:hover": {
        bgcolor: "#333"
      }
    }}
  >
    Send OTP
  </Button>
</Box>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <TextField
                fullWidth
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button variant="contained" onClick={handleVerifyOtp}>
                Verify OTP
              </Button>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Button variant="contained" onClick={handleResetPassword}>
                Reset Password
              </Button>
            </>
          )}

        </Stack>
      </Paper>
    </Box>
  );
}