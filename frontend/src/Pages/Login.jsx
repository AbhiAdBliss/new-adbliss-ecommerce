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

  /* ================= AUTO LOGIN ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (
      token &&
      user &&
      token !== "undefined" &&
      token !== "null" &&
      user !== "undefined"
    ) {
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
      console.error("LOGIN ERROR:", err);
      setApiError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://13.233.120.37:5000/api/google-login",
        { token: credentialResponse.credential }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate("/apple");
    } catch (error) {
      console.error(error);
      setApiError("Google login failed ❌");
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

          {/* 🔥 FORGOT PASSWORD */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MuiLink
              component="button"
              onClick={() => navigate("/forgot-password")}
              sx={{
                fontSize: "16px",
                color: "#1976d2",
                "&:hover": { textDecoration: "underline" }
              }}
            >
              Forgot Password?
            </MuiLink>
          </Box>

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

            <MuiLink component="button" onClick={() => navigate("/register")}>
              Sign Up
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

          <Divider>or</Divider>

          <Box display="flex" justifyContent="center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setApiError("Google login failed")}
            />
          </Box>

        </Stack>
      </Paper>
    </Box>
  );
}