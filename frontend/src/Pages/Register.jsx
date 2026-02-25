import React, { useState, useEffect, useRef } from "react";
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
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Refresh } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

// ✅ GOOGLE IMPORT
import { GoogleLogin } from "@react-oauth/google";

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
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

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

  // 🔥 GOOGLE SUCCESS HANDLER
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://13.233.120.37:5000/api/google-register",
        {
          credential: credentialResponse.credential,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setServerMessage("Google Signup Successful 🎉");

      setTimeout(() => navigate("/apple"), 1000);
    } catch (error) {
  console.error(error); 
  setServerError("Google signup failed");
}
  };

  // PASSWORD STRENGTH
  const getPasswordStrength = (password) => {
    if (password.length < 6)
      return { label: "Weak", color: "red", value: 30 };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/))
      return { label: "Strong", color: "green", value: 100 };
    return { label: "Medium", color: "orange", value: 60 };
  };

  const strength = getPasswordStrength(values.password);

  // VALIDATION
  const validate = () => {
    let temp = {};

    temp.name = values.name ? "" : "Full Name is required";
    temp.email = /\S+@\S+\.\S+/.test(values.email)
      ? ""
      : "Invalid Email";
    temp.phone = /^[0-9]{10}$/.test(values.phone)
      ? ""
      : "Phone must be 10 digits";
    temp.password =
      values.password.length >= 6 ? "" : "Minimum 6 characters required";
    temp.confirmPassword =
      values.password === values.confirmPassword
        ? ""
        : "Passwords do not match";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  // OTP INPUT
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);
    setOtp(newOtp.join(""));

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // TIMER
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // SEND OTP
  const sendOtp = async () => {
    setServerError("");
    setServerMessage("");

    if (!values.email) {
      setServerError("Please enter your email id first");
      return;
    }

    try {
      setSendingOtp(true);

      await axios.post("http://13.233.120.37:5000/api/send-otp", {
        email: values.email,
      });

      setOtpSent(true);
      setTimer(60);
      setServerMessage("OTP sent to your email");
    } catch {
      setServerError("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://13.233.120.37:5000/api/verify-otp",
        { email: values.email, otp }
      );

      if (res.data.success) {
        setOtpVerified(true);
        setServerMessage("Email verified successfully");
      }
    } catch {
      setServerError("Invalid OTP");
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setServerMessage("");

    if (!validate()) return;

    if (!otpVerified) {
      setServerError("Please verify your email first");
      return;
    }

    try {
      const res = await axios.post(
        "http://13.233.120.37:5000/api/register",
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          isVerified: true,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setServerMessage("🎉 Registration Successful!");
      setTimeout(() => navigate("/apple"), 1200);
    } catch {
      setServerError("Server error");
    }
  };

  return (
    <Box sx={{ height: "auto", pt: 2, background: "#2f2f2fff",pb:10 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h4" textAlign="center">
            Register
          </Typography>

          {serverMessage && <Alert severity="success">{serverMessage}</Alert>}
          {serverError && <Alert severity="error">{serverError}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            
            {/* 🔥 GOOGLE BUTTON */}
            <Box sx={{ mt: 2, textAlign: "center" }}>
            <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => setServerError("Google login failed")}
  theme="outline"        
  size="large"          
shape="circle"        
  text="signin_with"     
/>
            </Box>

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

            <Button
              variant="outlined"
              onClick={sendOtp}
              disabled={sendingOtp || timer > 0}
            >
              {sendingOtp ? <CircularProgress size={20} /> :
                timer > 0 ? `Resend in ${timer}s` : "Send OTP"}
            </Button>

            {otpSent && (
              <>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  {otpArray.map((d, i) => (
                    <TextField
                      key={i}
                      value={d}
                      inputRef={(el) => (inputRefs.current[i] = el)}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      sx={{ width: 45 }}
                    />
                  ))}
                </Box>

                <Button sx={{ mt: 2 }} onClick={verifyOtp}>
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
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            {values.password && (
              <>
                <Typography sx={{ fontSize: 12, color: strength.color }}>
                  Strength: {strength.label}
                </Typography>
                <LinearProgress variant="determinate" value={strength.value} sx={{ mt: 1 }} />
              </>
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={!otpVerified}
                sx={{
                  bgcolor: "black",
                  fontWeight: "bold",
                  px: 6,
                  py: 1.2,
                  "&:hover": { bgcolor: "#9B6DFF" },
                  "&.Mui-disabled": {
                    bgcolor: "#d4d4d4ff",
                    color: "#aaa"
                  }
                }}
              >
                Register
              </Button>
            </Box>

          </Box>

          <Typography mt={2} textAlign="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}