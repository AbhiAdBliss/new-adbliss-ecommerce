"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  Stack,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function SpaceLogin() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= FORGOT ================= */
  const [open, setOpen] = useState(false);
  const [otpStep, setOtpStep] = useState(1);
  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  /* ================= AUTO LOGIN (FIXED) ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ redirect properly
    if (token) {
      navigate("/apple", { replace: true });
    }
  }, [navigate]);

  /* ================= INPUT ================= */
  const handleInputChange = (field) => (e) => {
    const value =
      field === "rememberMe" ? e.target.checked : e.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors({});
    setApiError("");
  };

  /* ================= LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.password) newErrors.password = "Password required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://13.233.120.37:5000/api/login",
        formData
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      window.dispatchEvent(new Event("userUpdated"));
      navigate("/apple");

    } catch (err) {
      setApiError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE ================= */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://13.233.120.37:5000/api/google-login",
        { token: credentialResponse.credential }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/apple");
    } catch {
      setApiError("Google login failed ❌");
    }
  };

  /* ================= OTP ================= */
  const sendOtp = async () => {
    try {
      setForgotLoading(true);
      setForgotError("");
      setForgotMsg("");

      await axios.post("http://13.233.120.37:5000/api/send-otp", {
        email: forgotData.email,
      });

      setOtpStep(2);
      setForgotMsg("OTP sent successfully ✅");
    } catch {
      setForgotError("Failed to send OTP ❌");
    } finally {
      setForgotLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setForgotLoading(true);
      await axios.post("http://13.233.120.37:5000/api/verify-otp", {
        email: forgotData.email,
        otp: forgotData.otp,
      });

      setOtpStep(3);
      setForgotMsg("OTP verified ✅");
    } catch {
      setForgotError("Invalid OTP ❌");
    } finally {
      setForgotLoading(false);
    }
  };

  const resetPassword = async () => {
    try {
      setForgotLoading(true);

      await axios.post("http://13.233.120.37:5000/api/reset-password", {
        email: forgotData.email,
        newPassword: forgotData.newPassword,
      });

      setForgotMsg("Password updated 🎉");

      setTimeout(() => {
        setOpen(false);
        setOtpStep(1);
      }, 1500);
    } catch {
      setForgotError("Reset failed ❌");
    } finally {
      setForgotLoading(false);
    }
  };

  /* ================= UI ================= */
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
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          textAlign: "center"
        }}
      >
        <Stack spacing={2}>

          <Typography variant="h4" fontWeight="bold">
            Welcome Back
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Login to your account
          </Typography>

          {apiError && <Alert severity="error">{apiError}</Alert>}

          <TextField
            label="Email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange("email")}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={formData.password}
            onChange={handleInputChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <Stack direction="row" justifyContent="space-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={handleInputChange("rememberMe")}
                />
              }
              label="Remember me"
            />

            <MuiLink component="button" onClick={() => setOpen(true)}>
              Forgot password?
            </MuiLink>
          </Stack>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              bgcolor: "#111",
              borderRadius: "8px",
              py: 1.2,
              fontWeight: "bold",
              "&:hover": { bgcolor: "#333" }
            }}
          >
            {loading ? <CircularProgress size={24} /> : "SIGN IN"}
          </Button>

          <Typography variant="body2">
            Don’t have an account?{" "}
            <MuiLink component="button" onClick={() => navigate("/register")}>
              Sign Up
            </MuiLink>
          </Typography>

          <Divider>or</Divider>

          <Box display="flex" justifyContent="center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setApiError("Google login failed")}
            />
          </Box>

        </Stack>
      </Paper>

      {/* MODAL (UNCHANGED) */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            {forgotMsg && <Alert severity="success">{forgotMsg}</Alert>}
            {forgotError && <Alert severity="error">{forgotError}</Alert>}

            {otpStep === 1 && (
              <>
                <TextField
                  label="Email"
                  fullWidth
                  value={forgotData.email}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, email: e.target.value })
                  }
                />
                <Button onClick={sendOtp}>
                  {forgotLoading ? <CircularProgress size={20} /> : "Send OTP"}
                </Button>
              </>
            )}

            {otpStep === 2 && (
              <>
                <TextField
                  label="OTP"
                  fullWidth
                  value={forgotData.otp}
                  onChange={(e) =>
                    setForgotData({ ...forgotData, otp: e.target.value })
                  }
                />
                <Button onClick={verifyOtp}>Verify OTP</Button>
              </>
            )}

            {otpStep === 3 && (
              <>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={forgotData.newPassword}
                  onChange={(e) =>
                    setForgotData({
                      ...forgotData,
                      newPassword: e.target.value,
                    })
                  }
                />
                <Button onClick={resetPassword}>Reset Password</Button>
              </>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}