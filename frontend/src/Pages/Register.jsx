import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Refresh } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/apple");
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // CAPTCHA
  const generateCaptchaCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const [captcha, setCaptcha] = useState(generateCaptchaCode);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    captchaInput: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  // PASSWORD STRENGTH
  const getPasswordStrength = (password) => {
    if (password.length < 6) return { label: "Weak", color: "red" };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/))
      return { label: "Strong", color: "green" };
    return { label: "Medium", color: "orange" };
  };

  const strength = getPasswordStrength(values.password);

  // VALIDATION
  const validate = () => {
    let temp = {};

    temp.name = values.name ? "" : "Full Name is required";
    temp.email = values.email
      ? /\S+@\S+\.\S+/.test(values.email)
        ? ""
        : "Invalid Email"
      : "Email is required";

    temp.phone = /^[0-9]{10}$/.test(values.phone)
      ? ""
      : "Phone must be 10 digits";

    temp.password =
      values.password.length >= 6 ? "" : "Minimum 6 characters required";

    temp.confirmPassword =
      values.password === values.confirmPassword
        ? ""
        : "Passwords do not match";

    temp.captchaInput =
      values.captchaInput === captcha ? "" : "Captcha does not match";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  // SEND OTP
  const sendOtp = async () => {
    setServerError("");
    setServerMessage("");

    if (!values.email) {
      setServerError("Please enter email first ❌");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/send-otp", {
        email: values.email,
      });

      setOtpSent(true);
      setServerMessage("OTP sent to your email ✅");
    } catch {
      setServerError("Failed to send OTP ❌");
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:5000/api/verify-otp", {
        email: values.email,
        otp,
      });

      setOtpVerified(true);
      setServerMessage("Email verified successfully ✅");
    } catch {
      setServerError("Invalid OTP ❌");
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setServerError("");

    if (!validate()) return;

    if (!otpVerified) {
      setServerError("Please verify your email first ❌");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        isVerified: true,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userUpdated"));

      setServerMessage("🎉 Registration Successful!");

      setTimeout(() => navigate("/apple"), 1200);
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Server not responding"
      );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", pt: 2, background: "#121212" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h4" textAlign="center" fontWeight="bold">
            Register
          </Typography>

          {serverMessage && <Alert severity="success">{serverMessage}</Alert>}
          {serverError && <Alert severity="error">{serverError}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" margin="normal"
              value={values.name}
              onChange={handleChange("name")}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField fullWidth label="Email" margin="normal"
              value={values.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
            />

            <Button variant="outlined" onClick={sendOtp}>
              Send OTP
            </Button>

            {otpSent && (
              <>
                <TextField fullWidth label="Enter OTP" margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button variant="contained" onClick={verifyOtp}>
                  Verify OTP
                </Button>
              </>
            )}

            <TextField fullWidth label="Phone" margin="normal"
              value={values.phone}
              onChange={handleChange("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
            />

            <TextField fullWidth label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={values.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {values.password && (
              <Typography sx={{ fontSize: 12, color: strength.color }}>
                Strength: {strength.label}
              </Typography>
            )}

           <TextField
  fullWidth
  label="Confirm Password"
  type={showConfirmPassword ? "text" : "password"}
  margin="normal"
  value={values.confirmPassword}
  onChange={handleChange("confirmPassword")}
  error={!!errors.confirmPassword}
  helperText={errors.confirmPassword}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>


            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Typography sx={{ bgcolor: "#eee", px: 2, py: 1 }}>
                {captcha}
              </Typography>
              <IconButton onClick={() => setCaptcha(generateCaptchaCode())}>
                <Refresh />
              </IconButton>
            </Box>

            <TextField fullWidth label="Enter Captcha" margin="normal"
              value={values.captchaInput}
              onChange={handleChange("captchaInput")}
              error={!!errors.captchaInput}
              helperText={errors.captchaInput}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
              Register
            </Button>
          </Box>

          <Typography mt={2}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
