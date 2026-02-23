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
  DialogActions
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ FORGOT PASSWORD MODAL
  const [open, setOpen] = useState(false);
  const [otpStep, setOtpStep] = useState(1);
  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [timer, setTimer] = useState(0);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotError, setForgotError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/apple");
  }, [navigate]);

  // ⏱ TIMER
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange =
    (field) => (event) => {
      const value =
        field === "rememberMe" ? event.target.checked : event.target.value;

      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors({});
      setApiError("");
    };

  // ================= LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://13.233.120.37:5000/api/login",
        formData
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userUpdated"));

      navigate("/apple");
    } catch (err) {
      setApiError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= OTP FUNCTIONS =================

  const sendOtp = async () => {
    try {
      setForgotLoading(true);
      setForgotError("");

      await axios.post("http://13.233.120.37:5000/api/send-otp", {
        email: forgotData.email,
      });

      setOtpStep(2);
      setTimer(60);
      setForgotMsg("OTP sent successfully ✅");
    } catch (err) {
      setForgotError(err.response?.data?.message || "Failed to send OTP");
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

      setForgotMsg("Password updated successfully 🎉");
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

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ width: 350 }}>
        <Stack spacing={2}>
          <Typography variant="h4" textAlign="center">
            Login
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
            <FormControlLabel control={<Checkbox />} label="Remember me" />

            <MuiLink component="button" onClick={() => setOpen(true)}>
              Forgot password?
            </MuiLink>
          </Stack>

          <Button variant="contained" onClick={handleSubmit}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>

          <Divider>or</Divider>

          <Button variant="outlined" startIcon={<Google />}>
            Continue with Google
          </Button>
        </Stack>
      </Box>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
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

                <Button onClick={verifyOtp}>
                  {forgotLoading ? <CircularProgress size={20} /> : "Verify OTP"}
                </Button>

                <Typography textAlign="center">
                  {timer > 0 ? `Resend in ${timer}s` : (
                    <MuiLink component="button" onClick={sendOtp}>
                      Resend OTP
                    </MuiLink>
                  )}
                </Typography>
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

                <Button onClick={resetPassword}>
                  {forgotLoading ? <CircularProgress size={20} /> : "Reset Password"}
                </Button>
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