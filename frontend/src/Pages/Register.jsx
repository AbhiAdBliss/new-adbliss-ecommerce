import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google"; ❌ commented

export default function Register({ isEmbedded = false }) { // ✅ ADDED PROP
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    // confirmPassword: "", ❌ commented
  });

  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  // ❌ GOOGLE LOGIN COMMENTED
  /*
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
<<<<<<< HEAD
      const res = await axios.post("/api/google-register", {
        credential: credentialResponse.credential,
=======
      const res = await axios.post(
        "/api/send-otp",
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

      await axios.post("/api/send-otp", {
        email: values.email,
>>>>>>> 6d221e8 (updated backend and frontend)
      });

      setServerMessage("Google Signup Successful 🎉");

      setTimeout(() => {
        navigate("/apple", { state: { user: res.data.user } });
      }, 1000);
    } catch {
      setServerError("Google signup failed");
    }
  };
  */

<<<<<<< HEAD
  // ✅ VALIDATION
  const validate = () => {
    if (!values.name) return "Full Name is required";
    if (!/\S+@\S+\.\S+/.test(values.email)) return "Invalid Email";
    if (!/^[0-9]{10}$/.test(values.phone)) return "Phone must be 10 digits";
    if (values.password.length < 6)
      return "Password must be at least 6 characters";
    return "";
=======
  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "/api/verify-otp",
        { email: values.email, otp }
      );

      if (res.data.success) {
        setOtpVerified(true);
        setServerMessage("Email verified successfully");
      }
    } catch {
      setServerError("Invalid OTP");
    }
>>>>>>> 6d221e8 (updated backend and frontend)
  };

  // ❌ OTP FUNCTIONS COMMENTED
  /*
  const sendOtp = async () => {};
  const verifyOtp = async () => {};
  */

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setServerMessage("");

    const error = validate();
    if (error) {
      setServerError(error);
      return;
    }

    try {
<<<<<<< HEAD
      const res = await axios.post("/api/register", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        isVerified: true, // bypass OTP
      });
=======
     const res = await axios.post("/api/register", {
  name: values.name,
  email: values.email,
  phone: values.phone,
  password: values.password,
  isVerified: true,
});
>>>>>>> 6d221e8 (updated backend and frontend)

      setServerMessage("🎉 Registration Successful!");

      setTimeout(() => {
        navigate("/apple", { state: { user: res.data.user } });
      }, 1200);
    } catch {
      setServerError("Server error");
    }
  };

  return (
    <Box
      sx={{
        pt: 4,
        background: "#f4f4f4",
        pb: 10,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        minHeight: isEmbedded ? "auto" : "100vh", // ✅ UPDATED
       
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h4" textAlign="center">
            Register
          </Typography>

          {serverMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {serverMessage}
            </Alert>
          )}
          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            
            {/* ❌ GOOGLE LOGIN COMMENTED */}
            {/*
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setServerError("Google login failed")}
              />
            </Box>
            */}

            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={values.name}
              onChange={handleChange("name")}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={values.email}
              onChange={handleChange("email")}
            />

            {/* ❌ OTP BUTTON COMMENTED */}
            {/*
            <Button onClick={sendOtp}>
              Send OTP
            </Button>
            */}

            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={values.phone}
              onChange={handleChange("phone")}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={values.password}
              onChange={handleChange("password")}
            />

            {/* ❌ CONFIRM PASSWORD COMMENTED */}
            {/*
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
            />
            */}

            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 3 }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "150px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  bgcolor: "#100e0eff",
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
